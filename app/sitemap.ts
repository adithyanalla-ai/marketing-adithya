import type { MetadataRoute } from "next";
import { getCategories, getPosts, getTags, postsInCategory, postsWithTag, PAGE_SIZE } from "@/lib/blog";
import { SERVICES } from "@/lib/services";
import { canonical } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const newest = (ps: { updated: string }[]) => ps.map((p) => p.updated).sort().pop();
  const lm = (d?: string) => (d ? new Date(d) : undefined);

  // lastmod is only emitted where it is derived from real content dates.
  const entries: MetadataRoute.Sitemap = [
    { url: canonical("/"), lastModified: lm(newest(posts)), changeFrequency: "weekly", priority: 1 },
    { url: canonical("/about/") },
    { url: canonical("/work/") },
    { url: canonical("/contact/") },
    { url: canonical("/blog/"), lastModified: lm(newest(posts)), changeFrequency: "weekly", priority: 0.8 },
    ...SERVICES.map((s) => ({ url: canonical(`/services/${s.slug}/`), priority: 0.9 })),
    ...posts.map((p) => ({ url: canonical(`/blog/${p.slug}/`), lastModified: lm(p.updated), priority: 0.7 })),
    ...getCategories().map((c) => ({ url: canonical(`/blog/category/${c.slug}/`), lastModified: lm(newest(postsInCategory(c.slug))) })),
    ...getTags().map((t) => ({ url: canonical(`/blog/tag/${t.slug}/`), lastModified: lm(newest(postsWithTag(t.slug))) })),
  ];
  const pages = Math.ceil(posts.length / PAGE_SIZE);
  for (let n = 2; n <= pages; n++) entries.push({ url: canonical(`/blog/page/${n}/`) });
  return entries;
}
