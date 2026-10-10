import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CASE_STUDIES } from "@/content/case-studies";
import { PageHero } from "@/components/ui/PageHero";
import { IconChip } from "@/components/ui/IconChip";
import { CTABand } from "@/components/sections/CTABand";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies | Adithya Reddy Marketing",
  description: "Results from admissions marketing, an election campaign and growth marketing work by Adithya Reddy, a marketer based in Hyderabad.",
  path: "/case-studies/",
  ogLabel: "Case studies",
});

export default function CaseStudies() {
  return (
    <>
      <PageHero crumbs={[{ name: "Case Studies", path: "/case-studies/" }]} eyebrow="Work" title="Case studies"
        intro="Selected projects across admissions, election campaigns and growth marketing, with the results they produced." />
      <section aria-label="Case studies" className="container-x pb-12">
        <ul className="grid gap-5 md:grid-cols-2">
          {CASE_STUDIES.map((c) => (
            <li key={c.slug}>
              <article className="card card-lift flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <IconChip name={c.icon} />
                  <span className="rounded-lg bg-[#E3F6EA] px-2.5 py-1 text-xs font-bold text-[#166534]">{c.badge}</span>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-brand">{c.sector}</p>
                <h2 className="mt-1 text-xl leading-snug">{c.name}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate">{c.summary}</p>
                <Link href={`/case-studies/${c.slug}/`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
                  Read the case study <ArrowRightIcon width={16} height={16} />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <CTABand />
    </>
  );
}
