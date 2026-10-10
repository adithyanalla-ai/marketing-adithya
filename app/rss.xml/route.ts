import { getPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";
import { canonical } from "@/lib/seo";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const posts = getPosts();
  const items = posts
    .map((p) => {
      const link = canonical(`/blog/${p.slug}/`);
      return `<item><title>${esc(p.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.description)}</description><category>${esc(p.category)}</category></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(SITE.name)} Marketing Blog</title><link>${SITE.url}/blog/</link><description>${esc(SITE.description)}</description><language>en-IN</language>${posts[0] ? `<lastBuildDate>${new Date(posts[0].updated).toUTCString()}</lastBuildDate>` : ""}<atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
