import data from "../content/seo/lastmod.json";

const map = data as Record<string, string>;

/** Last git commit date (YYYY-MM-DD) of the files behind a static page. Throws if the page is missing so a sitemap is never published with a guessed date. */
export function staticLastmod(url: string): string {
  const d = map[url];
  if (!d) throw new Error(`No lastmod for ${url}. Run \`npm run lastmod\` (needs the full git history) and commit content/seo/lastmod.json.`);
  return d;
}

/** Latest of several YYYY-MM-DD dates. */
export const latest = (...dates: (string | undefined)[]): string => dates.filter((d): d is string => !!d).sort().pop() as string;
