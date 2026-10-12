import type { MetadataRoute } from "next";
import { getGuides, getCategories, getPosts, postsInCategory, PAGE_SIZE } from "@/lib/blog";
import { SERVICES } from "@/content/services";
import { CASE_STUDIES } from "@/content/case-studies";
import { casePath } from "@/lib/case-study";
import { canonical } from "@/lib/seo";
import { latest, staticLastmod } from "@/lib/lastmod";

/**
 * Every URL carries a real lastmod:
 *  - posts, guides and case studies: the `updated` date in their content file
 *  - static pages: the last git commit date of the files behind them (content/seo/lastmod.json)
 *  - listing pages: the newer of that and the newest post they list
 * Drafts, unconfirmed case studies, tag archives and thin categories are excluded.
 * changefreq and priority are omitted because Google ignores them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const guides = getGuides();
  const url = (path: string, lastModified: string) => ({ url: canonical(path), lastModified });
  const stat = (path: string) => url(path, staticLastmod(path));

  const entries: MetadataRoute.Sitemap = [
    url("/", latest(staticLastmod("/"), ...posts.slice(0, 3).map((p) => p.updated))),
    stat("/about/"),
    stat("/services/"),
    stat("/hyderabad-growth-marketing-consultant/"),
    ...SERVICES.map((s) => stat(`/services/${s.slug}/`)),
    stat("/case-studies/"),
    ...CASE_STUDIES.filter((c) => c.confirmed).map((c) => url(casePath(c), c.updated)),
    stat("/resources/"),
    stat("/resources/lead-cost-calculator/"),
    stat("/contact/"),
    stat("/privacy/"),
    url("/blog/", latest(staticLastmod("/blog/"), ...posts.slice(0, 9).map((p) => p.updated))),
    ...posts.map((p) => url(`/blog/${p.slug}/`, p.updated)),
    ...getCategories().filter((c) => c.count >= 3).map((c) => url(`/blog/category/${c.slug}/`, latest(...postsInCategory(c.slug).map((p) => p.updated)))),
    ...(guides.length ? [url("/guides/", latest(staticLastmod("/guides/"), ...guides.map((g) => g.updated)))] : []),
    ...guides.map((g) => url(`/guides/${g.slug}/`, g.updated)),
  ];
  const pages = Math.ceil(posts.length / PAGE_SIZE);
  for (let n = 2; n <= pages; n++) entries.push(url(`/blog/page/${n}/`, latest(...posts.slice((n - 1) * PAGE_SIZE, n * PAGE_SIZE).map((p) => p.updated))));
  return entries;
}
