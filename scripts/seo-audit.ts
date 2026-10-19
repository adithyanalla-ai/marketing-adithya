/**
 * SEO audit against the last build. Usage: npm run build && npm run seo:audit
 * Fails when: a primary keyword is duplicated, a page/post lacks a keyword-map entry, a title is over 60 chars,
 * a description is over 155, or a page has no H1 or more than one.
 */
import { KEYWORD_MAP, normKeyword } from "../content/seo/keyword-map";
import { getAllGuidesIncludingDrafts, getAllPostsIncludingDrafts } from "../lib/blog";
import { builtPages, description, h1Count, isListing, read, robotsNoindex, title } from "./seo-lib";

const errors: string[] = [];
const warnings: string[] = [];

// 1. Map integrity
const seenKw = new Map<string, string>();
const seenUrl = new Set<string>();
for (const e of KEYWORD_MAP) {
  const k = normKeyword(e.primaryKeyword);
  if (seenKw.has(k)) errors.push(`Duplicate primary keyword "${e.primaryKeyword}": ${seenKw.get(k)} and ${e.url}`);
  seenKw.set(k, e.url);
  if (seenUrl.has(e.url)) errors.push(`Duplicate map entry for ${e.url}`);
  seenUrl.add(e.url);
  if (e.title && e.title.length > 60) errors.push(`Map title over 60 chars (${e.title.length}) for ${e.url}`);
  if (e.description && e.description.length > 155) errors.push(`Map description over 155 chars (${e.description.length}) for ${e.url}`);
  const clash = e.secondaryKeywords.find((s) => seenKw.get(normKeyword(s)) && seenKw.get(normKeyword(s)) !== e.url);
  if (clash) warnings.push(`${e.url}: secondary keyword "${clash}" is the primary keyword of ${seenKw.get(normKeyword(clash))}`);
}

// 2. Every post and guide file has a matching entry
const check = (kind: "blog" | "guides", files: ReturnType<typeof getAllPostsIncludingDrafts>) => {
  for (const p of files) {
    const url = `/${kind}/${p.slug}/`;
    const m = KEYWORD_MAP.find((x) => x.url === url);
    if (!m) { errors.push(`${kind} file "${p.slug}" has no keyword-map entry (${url})`); continue; }
    if (normKeyword(m.primaryKeyword) !== normKeyword(p.primaryKeyword)) errors.push(`${url}: frontmatter primaryKeyword "${p.primaryKeyword}" differs from map "${m.primaryKeyword}"`);
    if (p.draft && m.status === "live") errors.push(`${url}: map says live but file is draft`);
    if (!p.draft && m.status !== "live") errors.push(`${url}: file is published but map status is "${m.status}"`);
    if (p.title.length > 60) warnings.push(`${url}: title is ${p.title.length} chars (will be shortened in <title>)`);
    if (p.description.length > 155) errors.push(`${url}: description is ${p.description.length} chars`);
  }
};
check("blog", getAllPostsIncludingDrafts());
check("guides", getAllGuidesIncludingDrafts());

// 3. Built pages
const pages = builtPages();
for (const [url, file] of pages) {
  const html = read(file);
  const entry = KEYWORD_MAP.find((x) => x.url === url);
  if (entry && (entry.status === "planned" || entry.status === "draft")) continue; // not published: build emits a 404 shell
  if (!entry && !isListing(url)) errors.push(`Built page ${url} has no keyword-map entry`);
  const t = title(html), d = description(html), n = h1Count(html);
  if (!t) errors.push(`${url}: no <title>`);
  else if (t.length > 60) errors.push(`${url}: title is ${t.length} chars: "${t}"`);
  if (!d) errors.push(`${url}: no meta description`);
  else if (d.length > 155) errors.push(`${url}: description is ${d.length} chars`);
  if (n !== 1) errors.push(`${url}: ${n} H1 elements (expected 1)`);
  if (entry && entry.status === "live" && robotsNoindex(html)) errors.push(`${url}: map says live but page is noindex`);
  if (entry && entry.status === "noindex" && !robotsNoindex(html)) errors.push(`${url}: map says noindex but page is indexable`);
  if (entry && t) {
    const words = entry.primaryKeyword.toLowerCase().split(" ").filter((w) => w.length > 3);
    const hay = `${t} ${html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ""}`.toLowerCase();
    if (words.length && !words.some((w) => hay.includes(w))) warnings.push(`${url}: neither title nor H1 contains any word of "${entry.primaryKeyword}"`);
  }
}
// 3b. Cross-page and structure checks: duplicate titles/descriptions, canonical, images without alt, JSON-LD validity, OG image
const titles = new Map<string, string>(), descs = new Map<string, string>();
for (const [url, file] of pages) {
  const entry = KEYWORD_MAP.find((x) => x.url === url);
  if (entry && (entry.status === "planned" || entry.status === "draft")) continue;
  const html = read(file);
  const t = title(html), d = description(html);
  if (t) { if (titles.has(t)) errors.push(`Duplicate title "${t}": ${titles.get(t)} and ${url}`); titles.set(t, url); }
  if (d) { if (descs.has(d)) errors.push(`Duplicate description on ${descs.get(d)} and ${url}`); descs.set(d, url); }
  const canon = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  if (!canon) errors.push(`${url}: no canonical`);
  else if (canon !== `https://marketing.adithyareddy.online${url}` && !canon.endsWith(url)) errors.push(`${url}: canonical points elsewhere (${canon})`);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) errors.push(`${url}: <img> without alt: ${m[0].slice(0, 80)}`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { errors.push(`${url}: invalid JSON-LD`); }
  }
  if (!/property="og:image"/.test(html)) errors.push(`${url}: no og:image`);
  if (!/<html lang="en-IN"/.test(html)) errors.push(`${url}: html lang is not en-IN`);
}
for (const e of KEYWORD_MAP) if ((e.status === "live" || e.status === "noindex") && !pages.has(e.url)) errors.push(`Map entry ${e.url} is "${e.status}" but no built page exists`);

// 4. Sitemap: every URL has a real lastmod, no changefreq/priority, no drafts or unconfirmed case studies
import fs from "node:fs";
import path from "node:path";
import { CASE_STUDIES } from "../content/case-studies";
import { casePath } from "../lib/case-study";
import { getPosts } from "../lib/blog";
import { canonical } from "../lib/seo";

const smFile = path.join(process.cwd(), ".next", "server", "app", "sitemap.xml.body");
if (!fs.existsSync(smFile)) errors.push("sitemap.xml was not found in the build output");
else {
  const xml = fs.readFileSync(smFile, "utf8");
  if (/<changefreq>|<priority>/.test(xml)) errors.push("sitemap.xml still contains changefreq or priority");
  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const locs = new Map<string, string | undefined>();
  for (const u of urls) {
    const loc = /<loc>([^<]+)<\/loc>/.exec(u)?.[1] ?? "";
    const lastmod = /<lastmod>([^<]+)<\/lastmod>/.exec(u)?.[1];
    locs.set(loc, lastmod);
    if (!lastmod) errors.push(`sitemap: ${loc} has no lastmod`);
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) errors.push(`sitemap: ${loc} lastmod "${lastmod}" is not YYYY-MM-DD`);
  }
  for (const p of getPosts()) if (locs.get(canonical(`/blog/${p.slug}/`)) !== p.updated) errors.push(`sitemap: ${p.slug} lastmod differs from its updated date (${p.updated})`);
  for (const p of getAllPostsIncludingDrafts().filter((x) => x.draft)) if (locs.has(canonical(`/blog/${p.slug}/`))) errors.push(`sitemap lists draft post ${p.slug}`);
  for (const g of getAllGuidesIncludingDrafts().filter((x) => x.draft)) if (locs.has(canonical(`/guides/${g.slug}/`))) errors.push(`sitemap lists draft guide ${g.slug}`);
  for (const c of CASE_STUDIES) {
    const listed = locs.has(canonical(casePath(c)));
    if (listed && !c.confirmed) errors.push(`sitemap lists unconfirmed case study ${c.slug}`);
    if (!listed && c.confirmed) errors.push(`confirmed case study ${c.slug} is missing from the sitemap`);
    if (listed && locs.get(canonical(casePath(c))) !== c.updated) errors.push(`sitemap: case ${c.slug} lastmod differs from its updated date`);
  }
  console.log(`Sitemap: ${locs.size} URLs, all with lastmod.`);
}
const robotsFile = path.join(process.cwd(), ".next", "server", "app", "robots.txt.body");
if (fs.existsSync(robotsFile) && /^Host:/im.test(fs.readFileSync(robotsFile, "utf8"))) errors.push("robots.txt still has a Host line");

console.log(`Checked ${KEYWORD_MAP.length} map entries and ${pages.size} built pages.`);
for (const w of warnings) console.log(`  warn ${w}`);
if (errors.length) { console.error(`\nSEO audit FAILED (${errors.length}):`); for (const e of errors) console.error(`  x ${e}`); process.exit(1); }
console.log("SEO audit passed.");
