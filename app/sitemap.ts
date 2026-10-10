import type { MetadataRoute } from "next";
import { getGuides, getCategories, getPosts, getTags, postsInCategory, postsWithTag, PAGE_SIZE } from "@/lib/blog";
import { SERVICES } from "@/content/services";
import { CASE_STUDIES } from "@/content/case-studies";
import { casePath } from "@/lib/case-study";
import { canonical } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const newest = (ps: { updated: string }[]) => ps.map((p) => p.updated).sort().pop();
  const lm = (d?: string) => (d ? new Date(d) : undefined);

  // lastmod is only emitted where it is derived from real content dates.
  const entries: MetadataRoute.Sitemap = [
    { url: canonical("/"), lastModified: lm(newest(posts)), changeFrequency: "weekly", priority: 1 },
    { url: canonical("/about/") },
    { url: canonical("/services/"), priority: 0.9 },
    { url: canonical("/hyderabad-growth-marketing-consultant/"), priority: 0.9 },
    ...(getGuides().length ? [{ url: canonical("/guides/"), lastModified: lm(newest(getGuides())) }] : []),
    ...getGuides().map((g) => ({ url: canonical(`/guides/${g.slug}/`), lastModified: lm(g.updated), priority: 0.8 })),
    { url: canonical("/case-studies/") },
    ...CASE_STUDIES.filter((c) => c.confirmed).map((c) => ({ url: canonical(casePath(c)) })),
    { url: canonical("/resources/") },
    { url: canonical("/resources/lead-cost-calculator/") },
    { url: canonical("/contact/") },
    { url: canonical("/blog/"), lastModified: lm(newest(posts)), changeFrequency: "weekly", priority: 0.8 },
    ...SERVICES.map((s) => ({ url: canonical(`/services/${s.slug}/`), priority: 0.9 })),
    ...posts.map((p) => ({ url: canonical(`/blog/${p.slug}/`), lastModified: lm(p.updated), priority: 0.7 })),
    ...getCategories().filter((c) => c.count >= 3).map((c) => ({ url: canonical(`/blog/category/${c.slug}/`), lastModified: lm(newest(postsInCategory(c.slug))) })),
  ];
  const pages = Math.ceil(posts.length / PAGE_SIZE);
  for (let n = 2; n <= pages; n++) entries.push({ url: canonical(`/blog/page/${n}/`) });
  return entries;
}
