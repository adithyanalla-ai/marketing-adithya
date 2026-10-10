/**
 * Pings IndexNow (Bing, Yandex and others) for published blog posts that changed.
 * Usage: tsx scripts/indexnow.ts [--all] [--base=<git ref>]
 * Needs INDEXNOW_KEY (also served at /indexnow-key.txt) and NEXT_PUBLIC_SITE_URL.
 */
import { execSync } from "node:child_process";
import { getPosts } from "../lib/blog";
import { SITE } from "../lib/site";
import { canonical } from "../lib/seo";

const key = process.env.INDEXNOW_KEY;
if (!key) {
  console.log("INDEXNOW_KEY not set; skipping IndexNow ping.");
  process.exit(0);
}

async function main() {
const all = process.argv.includes("--all");
const base = process.argv.find((a) => a.startsWith("--base="))?.split("=")[1] ?? "HEAD~1";

let changed: Set<string> | null = null;
if (!all) {
  try {
    const out = execSync(`git diff --name-only ${base} HEAD -- content/blog`, { encoding: "utf8" });
    changed = new Set(out.split("\n").filter(Boolean).map((f) => f.replace(/^content\/blog\//, "").replace(/\.mdx?$/, "")));
  } catch {
    console.log("Could not diff git history; use --all to ping every published post.");
    process.exit(0);
  }
}

// getPosts() only returns draft: false posts, so drafts are never submitted.
const posts = getPosts().filter((p) => !changed || changed.has(p.slug));
if (posts.length === 0) {
  console.log("No published posts changed; nothing to ping.");
  process.exit(0);
}

const urlList = [...posts.map((p) => canonical(`/blog/${p.slug}/`)), canonical("/blog/")];
const host = new URL(SITE.url).host;

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${SITE.url}/indexnow-key.txt`, urlList }),
});
console.log(`IndexNow ${res.status} for ${urlList.length} URL(s):\n${urlList.join("\n")}`);
if (res.status >= 400) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
