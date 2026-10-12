/**
 * Writes content/seo/lastmod.json: the last git commit date of the files behind each static page.
 * Runs before every build (`prebuild`). The sitemap reads the JSON, so builds on hosts without full git history
 * (shallow or no .git) fall back to the committed copy instead of guessing.
 * Usage: npm run lastmod
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { SERVICES } from "../content/services";

const OUT = path.join(process.cwd(), "content", "seo", "lastmod.json");

const BLOG_LISTING = ["app/blog/page.tsx", "components/BlogListing.tsx", "components/PostCard.tsx"];
const CASES = ["content/case-studies", "lib/case-study.ts"];

/** URL -> source files and folders whose last commit decides the page's lastmod. */
const PAGES: Record<string, string[]> = {
  "/": ["app/page.tsx", "components/hero", "components/sections/StatsStrip.tsx", "components/sections/ServicesGrid.tsx", "content/site.ts", "content/services.ts"],
  "/about/": ["app/about/page.tsx", "content/site.ts", "content/case-studies"],
  "/services/": ["app/services/page.tsx", "components/sections/ServicesGrid.tsx", "components/sections/ProcessSteps.tsx", "content/services.ts"],
  "/hyderabad-growth-marketing-consultant/": ["app/hyderabad-growth-marketing-consultant/page.tsx", "content/services.ts"],
  "/case-studies/": ["app/case-studies/page.tsx", ...CASES],
  "/resources/": ["app/resources/page.tsx", "content/site.ts"],
  "/resources/lead-cost-calculator/": ["app/resources/lead-cost-calculator/page.tsx", "components/LeadCostCalculator.tsx"],
  "/contact/": ["app/contact/page.tsx", "components/ContactForm.tsx", "content/contact.ts", "lib/contact-submit.ts"],
  "/privacy/": ["app/privacy/page.tsx"],
  "/blog/": BLOG_LISTING,
  "/guides/": ["app/guides/page.tsx"],
  ...Object.fromEntries(SERVICES.map((s) => [`/services/${s.slug}/`, ["app/services/[slug]/page.tsx", "content/services.ts"]])),
};

const git = (...args: string[]) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

function historyIsComplete(): boolean {
  try {
    if (git("rev-parse", "--is-inside-work-tree") !== "true") return false;
    if (git("rev-parse", "--is-shallow-repository") === "true") {
      try { git("fetch", "--unshallow", "--quiet"); } catch { /* no network or no remote */ }
      return git("rev-parse", "--is-shallow-repository") !== "true";
    }
    return true;
  } catch {
    return false;
  }
}

function main() {
  if (!historyIsComplete()) {
    if (!fs.existsSync(OUT)) { console.error("lastmod: no full git history and no committed content/seo/lastmod.json. Run `npm run lastmod` in a full clone."); process.exit(1); }
    console.log("lastmod: full git history not available here; using the committed content/seo/lastmod.json.");
    return;
  }
  const result: Record<string, string> = {};
  const dirty: string[] = [];
  for (const [url, files] of Object.entries(PAGES)) {
    const existing = files.filter((f) => fs.existsSync(f));
    if (existing.length === 0) { console.error(`lastmod: no source files found for ${url}`); process.exit(1); }
    const date = git("log", "-1", "--format=%cs", "--", ...existing);
    if (!date) { console.error(`lastmod: ${url} has no commits yet; commit its files first.`); process.exit(1); }
    result[url] = date;
    if (git("status", "--porcelain", "--", ...existing)) dirty.push(url);
  }
  const sorted = Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
  const next = JSON.stringify(sorted, null, 2) + "\n";
  const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (next !== prev) { fs.writeFileSync(OUT, next); console.log(`lastmod: updated content/seo/lastmod.json (${Object.keys(sorted).length} pages). Commit it.`); }
  else console.log(`lastmod: content/seo/lastmod.json is up to date (${Object.keys(sorted).length} pages).`);
  if (dirty.length) console.warn(`lastmod: uncommitted changes behind ${dirty.length} page(s); their lastmod reflects the last commit:\n  ${dirty.join("\n  ")}`);
}
main();
