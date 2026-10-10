import Link from "next/link";
import type { Metadata } from "next";
import { metaFromMap } from "@/lib/seo-map";
import { CASE_STUDIES } from "@/content/case-studies";
import { casePath, view } from "@/lib/case-study";
import { PageHero } from "@/components/ui/PageHero";
import { IconChip } from "@/components/ui/IconChip";
import { CTABand } from "@/components/sections/CTABand";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = metaFromMap("/case-studies/", "Case studies");

export default function CaseStudies() {
  return (
    <>
      <PageHero crumbs={[{ name: "Case Studies", path: "/case-studies/" }]} eyebrow="Work" title="Case studies"
        intro="Selected projects across admissions, election campaigns, lead generation and marketing analytics, with the results they produced." />
      <section aria-label="Case studies" className="container-x pb-12">
        <ul className="grid gap-5 md:grid-cols-2">
          {CASE_STUDIES.map((c) => {
            const v = view(c);
            return (
              <li key={v.slug}>
                <article className="card card-lift flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <IconChip name={c.icon} />
                    <span className="rounded-lg bg-[#E3F6EA] px-2.5 py-1 text-xs font-bold text-[#166534]">{v.badge}</span>
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-brand">{v.role}</p>
                  <h2 className="mt-1 text-xl leading-snug">{v.title}</h2>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate">{v.challenge}</p>
                  <Link href={casePath(c)} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
                    Read the case study <ArrowRightIcon width={16} height={16} />
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </section>
      <CTABand />
    </>
  );
}
