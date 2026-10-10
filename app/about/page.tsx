import Image from "next/image";
import type { Metadata } from "next";
import { metaFromMap } from "@/lib/seo-map";
import { ABOUT, MORE_STATS, STATS } from "@/content/site";
import { CASE_STUDIES } from "@/content/case-studies";
import { view } from "@/lib/case-study";
import { JsonLd } from "@/components/JsonLd";
import { personLd } from "@/lib/jsonld";
import { PageHero } from "@/components/ui/PageHero";
import { StatCard } from "@/components/ui/StatCard";
import { Annotation } from "@/components/ui/Annotation";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { CompactCard } from "@/components/ui/CompactCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconChip } from "@/components/ui/IconChip";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = metaFromMap("/about/", "About");

function HeroMedia() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
      <div aria-hidden="true" className="absolute -left-6 top-6 h-[85%] w-[70%] rounded-[48px] bg-gradient-to-br from-[#CFE0FF] to-[#E6EFFF] blur-[2px]" />
      <Annotation lines={["Growth", "Marketing", "×", "AI Automation"]} className="absolute -left-2 top-0 z-10 hidden w-36 lg:block xl:-left-10" />
      <div className="relative ml-auto flex flex-col gap-5 sm:block sm:h-[400px] lg:h-[380px]">
        <div className="relative aspect-[1/1] w-full overflow-hidden rounded-[32px] border-4 border-white shadow-[0_24px_60px_rgba(29,92,255,0.18)] sm:absolute sm:left-[4%] sm:top-0 sm:aspect-auto sm:h-full sm:w-[58%] lg:left-[10%]">
          <Image
            src="/adithya.jpg" alt="Adithya Reddy, a growth marketer from Hyderabad, smiling in a tan hoodie with green hills behind him"
            fill priority sizes="(min-width: 1024px) 300px, (min-width: 640px) 300px, 90vw" className="object-cover object-[48%_20%]"
          />
        </div>
        <StatCard
          className="sm:absolute sm:right-0 sm:top-6 sm:w-[50%] lg:w-[46%]"
          rows={[
            { icon: "users", title: "Lead Generation", label: "Scalable growth systems" },
            { icon: "barchart", value: `${STATS.lowerCostPerLead.value}%`, label: "Lower cost per lead with Meta A/B testing" },
            { icon: "bolt", value: MORE_STATS.reportDelivery.value, label: MORE_STATS.reportDelivery.label },
          ]}
        />
      </div>
    </div>
  );
}

export default function About() {
  const { education, credentials, research, languages } = ABOUT;
  const experience = CASE_STUDIES.filter((c) => c.kind === "employer").map(view).sort((a, b) => (a.period < b.period ? 1 : -1));
  return (
    <>
      <JsonLd data={personLd()} />
      <PageHero
        crumbs={[{ name: "About", path: "/about/" }]}
        eyebrow={ABOUT.eyebrow}
        title="About Adithya Reddy"
        intro={ABOUT.bio}
        media={<HeroMedia />}
      />

      <section aria-labelledby="areas-h" className="container-x py-12">
        <SectionHeader eyebrow="What I focus on" title="Key Areas of Work" id="areas-h" description="I help businesses generate more leads, make better marketing decisions, and automate repetitive work using AI and data." />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {ABOUT.areas.map((a) => <FeatureCard key={a.title} layout="row" icon={a.icon as never} title={a.title} description={a.text} />)}
        </div>
      </section>

      <section aria-labelledby="how-h" className="container-x py-12">
        <SectionHeader eyebrow="How I work" title="From Strategy to Automation" id="how-h" description="I combine marketing strategy, data analytics and AI automation to help businesses grow more efficiently." />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {ABOUT.approach.map((a) => <CompactCard key={a.title} icon={a.icon as never} title={a.title} text={a.text} />)}
        </div>
      </section>

      <StatsStrip />

      <section aria-labelledby="bg-h" className="container-x py-12">
        <SectionHeader eyebrow="Background" title="Experience, education and research" id="bg-h" />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="card p-6">
            <div className="flex items-center gap-3"><IconChip name="briefcase" size="sm" /><h3 className="text-lg">Experience</h3></div>
            <ol className="mt-5 space-y-5 border-l-2 border-[#D6E3FF] pl-6">
              {experience.map((e) => (
                <li key={e.slug} className="relative">
                  <span aria-hidden="true" className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-brand bg-white" />
                  <p className="font-display text-base font-extrabold">{e.role}</p>
                  <p className="text-sm text-slate"><span className="capitalize-first inline-block">{e.name}</span>{e.period ? ` · ${e.period}` : ""}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3"><IconChip name="graduation" size="sm" /><h3 className="text-lg">Education</h3></div>
            <p className="mt-5 font-display text-base font-extrabold">{education.degree}</p>
            <p className="text-slate">{education.school}</p>
            <p className="mt-2 inline-block rounded-lg bg-[#EAF2FF] px-3 py-1 text-sm font-bold text-brand">{education.grade}</p>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3"><IconChip name="award" size="sm" /><h3 className="text-lg">Certifications</h3></div>
            <ul className="mt-5 space-y-3">
              {credentials.map((c) => (
                <li key={c.title}><p className="font-display text-base font-extrabold">{c.title}</p><p className="text-sm text-slate">{c.issuer} · {c.note}</p></li>
              ))}
            </ul>
          </div>
          <div id="research" className="card scroll-mt-24 p-6">
            <div className="flex items-center gap-3"><IconChip name="book" size="sm" /><h3 className="text-lg">Published research</h3></div>
            <ul className="mt-5 space-y-3">
              {research.map((r) => (
                <li key={r.title}><p className="font-display text-base font-extrabold">{r.title}</p><p className="text-sm text-slate">{r.venue}</p></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card mt-5 flex flex-wrap items-center gap-4 p-6">
          <div className="flex items-center gap-3"><IconChip name="language" size="sm" /><h3 className="text-lg">Languages</h3></div>
          <ul className="flex flex-wrap gap-2">
            {languages.map((l) => <li key={l} className="rounded-full border border-card-line bg-white px-4 py-1.5 text-sm font-semibold">{l}</li>)}
          </ul>
        </div>
      </section>

      <CTABand eyebrow="Let's work together" headline="Ready to grow your business with data and AI?" text="Let's discuss your goals and see how I can help." portfolio />
    </>
  );
}
