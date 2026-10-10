import fs from "node:fs";
import path from "node:path";

export const APP_DIR = path.join(process.cwd(), ".next", "server", "app");

/** URL -> html file for every statically generated page in the last `next build`. */
export function builtPages(): Map<string, string> {
  if (!fs.existsSync(APP_DIR)) {
    console.error("No build output found. Run `npm run build` first.");
    process.exit(1);
  }
  const pages = new Map<string, string>();
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) { if (!e.name.endsWith(".segments")) walk(f); continue; }
      if (!e.name.endsWith(".html")) continue;
      let url = "/" + path.relative(APP_DIR, f).replace(/\.html$/, "").replace(/\\/g, "/");
      if (url === "/index") url = "/";
      else url += "/";
      if (/^\/(_global-error|_not-found)\/$/.test(url)) continue;
      pages.set(url, f);
    }
  };
  walk(APP_DIR);
  return pages;
}

export const read = (f: string) => fs.readFileSync(f, "utf8");

/** Taxonomy and pagination listings are exempt from the keyword map (they carry no keyword of their own). */
export const isListing = (url: string) => /^\/blog\/(category|tag|page)\//.test(url);

export const attr = (html: string, re: RegExp) => re.exec(html)?.[1] ?? "";
export const title = (html: string) => attr(html, /<title>([^<]*)<\/title>/).replace(/&amp;/g, "&").replace(/&#x27;/g, "'");
export const description = (html: string) => attr(html, /<meta name="description" content="([^"]*)"/).replace(/&amp;/g, "&").replace(/&#x27;/g, "'");
export const h1Count = (html: string) => (html.match(/<h1[\s>]/g) ?? []).length;
export const robotsNoindex = (html: string) => /<meta name="robots" content="[^"]*noindex/.test(html);
