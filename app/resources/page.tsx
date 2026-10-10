import type { Metadata } from "next";
import { metaFromMap } from "@/lib/seo-map";
import { TOOLS } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = metaFromMap("/resources/", "Resources");

const USE: Record<string, string> = {
  "Meta Ads": "Running and testing paid campaigns",
  "Power BI": "Dashboards for spend, leads and revenue",
  Python: "Data work and automation",
  SQL: "Querying and joining marketing data",
  LangChain: "Building LLM workflows",
  "Claude API": "Drafting commentary and summaries",
  Excel: "Quick analysis and reporting",
  Pandas: "Cleaning and analysing data in Python",
};

export default function Resources() {
  return (
    <>
      <PageHero crumbs={[{ name: "Resources", path: "/resources/" }]} eyebrow="Resources" title="Resources" pills={null}
        intro="Free tools and reading to help you understand your numbers and plan your marketing." />
      <section aria-label="Resources" className="container-x grid gap-5 pb-12 md:grid-cols-3">
        <FeatureCard icon="calculator" title="Lead Cost Calculator" description="Work out cost per lead and cost per customer from your own numbers." href="/resources/lead-cost-calculator/" linkText="Open the calculator" />
        <FeatureCard icon="wrench" title="Tools I Use" description="The software behind my analytics, ads and automation work." href="#tools-list" linkText="See the tools" />
        <FeatureCard icon="book" title="Blog" description="Frameworks, templates and worked examples from my work." href="/blog/" linkText="Read the blog" />
      </section>
      <section id="tools" aria-labelledby="tools-h" className="container-x py-12">
        <SectionHeader eyebrow="Tools I use" title="What I work with" id="tools-h" description="The tools I use day to day, and what I use them for." />
        <ul id="tools-list" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((t) => (
            <li key={t.name} className="card p-5">
              <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg text-xs font-extrabold text-white" style={{ background: t.color }}>{t.mark}</span>
              <h3 className="mt-3 text-base">{t.name}</h3>
              <p className="mt-1 text-sm text-slate">{USE[t.name]}</p>
            </li>
          ))}
        </ul>
      </section>
      <CTABand />
    </>
  );
}
