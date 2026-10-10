import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASE_STUDIES, getCase } from "@/content/case-studies";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { StatCard } from "@/components/ui/StatCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolsStrip } from "@/components/sections/ToolsStrip";
import { CTABand } from "@/components/sections/CTABand";
import { ArrowRightIcon } from "@/components/icons";

export const dynamicParams = false;
export const generateStaticParams = () => CASE_STUDIES.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCase((await params).slug);
  if (!c) return {};
  const m = buildMetadata({
    title: `${c.name} Case Study`.slice(0, 60),
    description: `${c.summary} ${c.badge}.`.slice(0, 154),
    path: `/case-studies/${c.slug}/`,
    ogLabel: "Case study",
  });
  // Thin pages stay out of search until the write-up is complete.
  return c.ready ? m : { ...m, robots: { index: false, follow: true } };
}

const Pending = () => <p className="text-[15px] text-slate">Full write-up in progress.</p>;

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  const service = getService(c.serviceSlug);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Case Studies", path: "/case-studies/" }, { name: c.name, path: `/case-studies/${c.slug}/` }]}
        eyebrow={c.sector}
        title={c.name}
        intro={c.summary}
        pills={null}
        media={c.metrics.length ? <StatCard rows={c.metrics} className="mx-auto max-w-sm lg:ml-auto" /> : undefined}
      />
      <section aria-label="Case study details" className="container-x grid gap-5 py-8 lg:grid-cols-3">
        <div className="card p-6">
          <h2 className="text-xl">Challenge</h2>
          <div className="mt-3">{c.challenge ? <p className="text-[15px] leading-relaxed text-slate">{c.challenge}</p> : <Pending />}</div>
        </div>
        <div className="card p-6">
          <h2 className="text-xl">Approach</h2>
          <div className="mt-3">
            {c.approach?.length ? <ul className="list-disc space-y-2 pl-5 text-[15px] text-slate">{c.approach.map((a) => <li key={a}>{a}</li>)}</ul> : <Pending />}
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-xl">Result</h2>
          <div className="mt-3">
            {c.result?.length ? <ul className="list-disc space-y-2 pl-5 text-[15px] text-slate">{c.result.map((a) => <li key={a}>{a}</li>)}</ul>
              : c.metrics.length ? <p className="text-[15px] leading-relaxed text-slate">{c.metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`).join("; ")}.</p> : <Pending />}
          </div>
        </div>
      </section>
      {c.tools.length > 0 && <ToolsStrip names={c.tools} id="case-tools" heading="Tools used" />}
      {service && (
        <section aria-labelledby="svc-h" className="container-x py-8">
          <SectionHeader eyebrow="Related service" title={service.name} id="svc-h" description={service.cardText} />
          <p className="mt-6">
            <Link href={`/services/${service.slug}/`} className="inline-flex items-center gap-2 font-semibold text-brand hover:underline">
              Learn more about {service.label} <ArrowRightIcon width={16} height={16} />
            </Link>
          </p>
        </section>
      )}
      <CTABand />
    </>
  );
}
