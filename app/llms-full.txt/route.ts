import { getGuides, getPosts } from "@/lib/blog";
import { SERVICES } from "@/content/services";
import { CASE_STUDIES } from "@/content/case-studies";
import { ABOUT, MORE_STATS, STATS } from "@/content/site";
import { casePath, view } from "@/lib/case-study";
import { SITE } from "@/lib/site";
import { canonical } from "@/lib/seo";

export const dynamic = "force-static";

/** Longer machine-readable summary for AI search tools. Uses the same permission layer as the site. */
export function GET() {
  const L: string[] = [
    `# ${SITE.name}: AI growth marketing consultant, Hyderabad`,
    "",
    `> ${SITE.description}`,
    "",
    "## About",
    ABOUT.bio,
    `Languages: ${ABOUT.languages.join(", ")}. Based in Hyderabad, Telangana, India.`,
    `Education: ${ABOUT.education.degree}, ${ABOUT.education.school} (${ABOUT.education.grade}).`,
    `Public figures: ${STATS.qualifiedLeads.value.toLocaleString("en-IN")}${STATS.qualifiedLeads.suffix} qualified leads; ${STATS.conversionLift.value}% conversion lift; ${STATS.lowerCostPerLead.value}% lower cost per lead; ${STATS.revenueFacilitated.text} revenue facilitated; ${MORE_STATS.reportDelivery.value} client report delivery.`,
    "",
    "## Services",
    ...SERVICES.flatMap((s) => [
      `### ${s.name}`,
      `URL: ${canonical(`/services/${s.slug}/`)}`,
      s.intro,
      ...s.whatItIs,
      `Deliverables: ${s.deliverables.join("; ")}.`,
      "",
    ]),
    "## Case studies (client names and figures are shown only where permission was given)",
    ...CASE_STUDIES.map((c) => {
      const v = view(c);
      return `- [${v.title}](${canonical(casePath(c))}): ${v.challenge}`;
    }),
    "",
    "## Guides",
    ...(getGuides().length ? getGuides().map((g) => `- [${g.title}](${canonical(`/guides/${g.slug}/`)}): ${g.description}`) : ["(none published yet)"]),
    "",
    "## Blog",
    ...getPosts().map((p) => `- [${p.title}](${canonical(`/blog/${p.slug}/`)}): ${p.description}`),
    "",
    `Contact: ${canonical("/contact/")}`,
    `Hyderabad page: ${canonical("/hyderabad-growth-marketing-consultant/")}`,
    `RSS: ${SITE.url}/rss.xml`,
  ];
  return new Response(L.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
