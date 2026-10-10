/**
 * Internal link audit against the last build. Usage: npm run build && npm run seo:links
 * Fails on: broken internal links, orphan pages (unreachable from "/"), published posts that do not link up to
 * their pillar guide, a service page, or two related posts, and guides that do not link down to every published cluster.
 */
import { KEYWORD_MAP } from "../content/seo/keyword-map";
import { builtPages, isListing, read } from "./seo-lib";

const errors: string[] = [];
const warnings: string[] = [];
const pages = builtPages();
const NON_PAGE = /^\/(_next|api|og|rss\.xml|sitemap\.xml|robots\.txt|llms\.txt|llms-full\.txt|indexnow-key\.txt|brand|adithya\.jpg|icon|apple-icon|favicon)/;

const norm = (h: string) => {
  const p = h.split("#")[0].split("?")[0];
  return p.endsWith("/") ? p : p + "/";
};
const linksOf = (html: string) => [...new Set([...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]).filter((h) => !NON_PAGE.test(h)).map(norm))];

const graph = new Map<string, string[]>();
for (const [url, file] of pages) graph.set(url, linksOf(read(file)));

// Broken links
for (const [url, out] of graph) for (const t of out) if (!pages.has(t)) errors.push(`${url} links to missing page ${t}`);

// Orphans: BFS from home
const seen = new Set<string>(["/"]);
const q = ["/"];
while (q.length) for (const t of graph.get(q.shift()!) ?? []) if (pages.has(t) && !seen.has(t)) { seen.add(t); q.push(t); }
for (const url of pages.keys()) {
  if (seen.has(url)) continue;
  const e = KEYWORD_MAP.find((x) => x.url === url);
  if (e && (e.status === "planned" || e.status === "draft")) continue; // unpublished: build emits a 404 shell
  (e?.status === "noindex" || isListing(url) ? warnings : errors).push(`Orphan page (no internal link path from /): ${url}`);
}

// Pillar / cluster rules
const published = (url: string) => pages.has(url);
for (const e of KEYWORD_MAP.filter((x) => x.kind === "post" && published(x.url))) {
  const out = graph.get(e.url) ?? [];
  const pillarUrl = `/guides/${e.pillar}/`;
  if (e.pillar && published(pillarUrl) && !out.includes(pillarUrl)) errors.push(`${e.url} does not link up to its pillar ${pillarUrl}`);
  if (e.pillar && !published(pillarUrl)) warnings.push(`${e.url}: pillar ${pillarUrl} is not published yet`);
  if (!out.some((l) => l.startsWith("/services/") && l !== "/services/")) errors.push(`${e.url} links to no service page`);
  const sideways = out.filter((l) => /^\/blog\/[^/]+\/$/.test(l) && l !== e.url && !isListing(l));
  const otherPosts = KEYWORD_MAP.filter((x) => x.kind === "post" && published(x.url) && x.url !== e.url).length;
  if (sideways.length < Math.min(2, otherPosts)) errors.push(`${e.url} links to ${sideways.length} related posts (needs ${Math.min(2, otherPosts)})`);
}
for (const g of KEYWORD_MAP.filter((x) => x.kind === "guide" && published(x.url))) {
  const out = graph.get(g.url) ?? [];
  const slug = g.url.split("/")[2];
  for (const c of KEYWORD_MAP.filter((x) => x.kind === "post" && x.pillar === slug && published(x.url))) {
    if (!out.includes(c.url)) errors.push(`Guide ${g.url} does not link down to cluster ${c.url}`);
  }
  if (!out.some((l) => l.startsWith("/services/") && l !== "/services/")) errors.push(`Guide ${g.url} links to no service page`);
}

console.log(`Checked ${pages.size} pages, ${[...graph.values()].reduce((a, b) => a + b.length, 0)} internal links.`);
for (const w of warnings) console.log(`  warn ${w}`);
if (errors.length) { console.error(`\nLink audit FAILED (${errors.length}):`); for (const e of errors) console.error(`  x ${e}`); process.exit(1); }
console.log("Link audit passed.");
