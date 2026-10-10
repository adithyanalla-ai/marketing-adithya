import { getPosts } from "@/lib/blog";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { canonical } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${SITE.name}: Growth & Performance Marketing`,
    "",
    `> ${SITE.description}`,
    "",
    "Based in Hyderabad, Telangana, India. Serves businesses across India.",
    "",
    "## Services",
    ...SERVICES.map((s) => `- [${s.name}](${canonical(`/services/${s.slug}/`)}): ${s.metaDescription}`),
    "",
    "## Key pages",
    `- [About](${canonical("/about/")})`,
    `- [Work and results](${canonical("/work/")})`,
    `- [Contact](${canonical("/contact/")})`,
    "",
    "## Blog",
    ...getPosts().map((p) => `- [${p.title}](${canonical(`/blog/${p.slug}/`)}): ${p.description}`),
    "",
    `RSS: ${SITE.url}/rss.xml`,
  ];
  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
