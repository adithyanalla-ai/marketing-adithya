/**
 * Post-build SEO checks against a running server.
 * Usage: BASE_URL=http://localhost:3000 tsx scripts/validate-seo.ts
 */
import { getAllPostsIncludingDrafts } from "../lib/blog";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
let failures = 0;
const ok = (m: string) => console.log(`  ok   ${m}`);
const bad = (m: string) => { failures++; console.log(`  FAIL ${m}`); };
const get = async (p: string) => (await fetch(BASE + p)).text();

async function main() {
const drafts = getAllPostsIncludingDrafts().filter((p) => p.draft);
const published = getAllPostsIncludingDrafts().filter((p) => !p.draft);

console.log("sitemap.xml / robots.txt / rss.xml / llms.txt");
const sitemap = await get("/sitemap.xml");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
locs.length ? ok(`sitemap has ${locs.length} URLs`) : bad("sitemap empty");
for (const p of published) locs.some((l) => l.includes(`/blog/${p.slug}/`)) ? ok(`sitemap lists ${p.slug}`) : bad(`sitemap missing ${p.slug}`);
for (const d of drafts) {
  const hits = [sitemap, await get("/rss.xml"), await get("/llms.txt"), await get("/blog/")].some((t) => t.includes(d.slug));
  hits ? bad(`DRAFT LEAK: ${d.slug}`) : ok(`draft ${d.slug} excluded from sitemap, rss, llms.txt, /blog/`);
  (await fetch(`${BASE}/blog/${d.slug}/`)).status === 404 ? ok(`draft ${d.slug} page is 404`) : bad(`draft page ${d.slug} is reachable`);
}
const robots = await get("/robots.txt");
/Sitemap: .*sitemap\.xml/.test(robots) ? ok("robots.txt references sitemap") : bad("robots.txt lacks Sitemap");
const rss = await get("/rss.xml");
rss.includes("<rss") && published.every((p) => rss.includes(p.slug)) ? ok("rss.xml valid shape, lists all published posts") : bad("rss.xml problem");

console.log("per-page checks");
const pages = locs.map((l) => new URL(l).pathname).filter((p) => !/\/blog\/(tag|category|page)\//.test(p));
for (const path of pages) {
  const html = await get(path);
  const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "";
  const desc = /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? "";
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  const canon = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  const problems: string[] = [];
  if (!title || title.length > 60) problems.push(`title ${title.length} chars`);
  if (!desc || desc.length > 155) problems.push(`description ${desc.length} chars`);
  if (h1 !== 1) problems.push(`${h1} h1`);
  if (!canon || !canon.endsWith("/")) problems.push("canonical");
  if (!/property="og:image"/.test(html) || !/name="twitter:card"/.test(html)) problems.push("og/twitter");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const types: string[] = [];
  for (const b of blocks) {
    try { for (const o of [JSON.parse(b)].flat()) types.push(o["@type"]); } catch { problems.push("invalid JSON-LD"); }
  }
  if (path !== "/" && !types.includes("BreadcrumbList")) problems.push("no BreadcrumbList");
  if (path.startsWith("/blog/") && path.split("/").filter(Boolean).length === 2 && !types.includes("BlogPosting")) problems.push("no BlogPosting");
  problems.length ? bad(`${path}: ${problems.join(", ")}`) : ok(`${path}  [${types.join(", ")}]`);
}
console.log(failures ? `\n${failures} failure(s)` : "\nAll checks passed");
}

main().then(() => process.exit(failures ? 1 : 0));
