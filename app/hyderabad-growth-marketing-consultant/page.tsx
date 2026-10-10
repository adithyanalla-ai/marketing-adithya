import Link from "next/link";
import type { Metadata } from "next";
import { metaFromMap } from "@/lib/seo-map";
import { SERVICES } from "@/content/services";
import { JsonLd } from "@/components/JsonLd";
import { professionalServiceLd } from "@/lib/jsonld";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { CompactCard } from "@/components/ui/CompactCard";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = metaFromMap("/hyderabad-growth-marketing-consultant/", "Hyderabad");

const FAQS = [
  { q: "Are you based in Hyderabad?", a: "Yes. I work from Hyderabad, Telangana, and can meet in person in the city or work remotely with teams anywhere in India." },
  { q: "Which languages do you work in?", a: "English, Telugu and Hindi." },
  { q: "What kinds of businesses do you work with?", a: "Education institutions, service businesses, technology teams and campaigns or associations that want clearer numbers from their marketing. The common thread is wanting measurable results, not a particular industry." },
  { q: "Do you only work with Hyderabad businesses?", a: "No. Hyderabad and Telangana are home, but I work with teams across India, mostly remotely." },
  { q: "Can you share past clients?", a: "Case studies are on the case studies page. Client names and figures are shared only where I have permission to publish them." },
  { q: "How do we start?", a: "Book a call. We will talk through your goals, your current numbers and what to fix first, then decide whether working together makes sense." },
];

const STEPS = [
  { icon: "target" as const, title: "Discovery call", text: "Your goals, your current numbers and where enquiries go cold." },
  { icon: "layers" as const, title: "Audit and plan", text: "A short audit of campaigns, tracking and follow-up, and a prioritised plan." },
  { icon: "rocket" as const, title: "Build and test", text: "Campaigns, lead pipeline and dashboards, improved through structured tests." },
  { icon: "gear" as const, title: "Automate and review", text: "Reporting and follow-up automated, with a regular review of results." },
];

export default function HyderabadPage() {
  return (
    <>
      <JsonLd data={professionalServiceLd()} />
      <PageHero
        crumbs={[{ name: "Hyderabad growth marketing consultant", path: "/hyderabad-growth-marketing-consultant/" }]}
        eyebrow="Hyderabad · Telangana · India"
        title="Growth Marketing Consultant in Hyderabad"
        intro="I help businesses and institutions in Hyderabad and across Telangana generate better leads, lower their cost per lead and automate reporting with AI. I work in English, Telugu and Hindi, in person in Hyderabad or remotely."
      />

      <section aria-labelledby="how-h" className="container-x py-10">
        <SectionHeader eyebrow="Working together" title="How I work with Hyderabad and Telangana businesses" id="how-h" />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/90">
            <p>Growth marketing here means making the whole path from enquiry to customer work: the campaigns that bring people in, the follow-up that keeps them, and the reporting that shows what is working.</p>
            <p>Local context matters. Education institutions plan around admission cycles; associations and campaigns plan around election dates; service businesses plan around their own busy and quiet seasons. I start by learning your calendar and your customers, then plan the work around it.</p>
            <p>Meetings can happen in person in Hyderabad, and I am comfortable switching between English, Telugu and Hindi when talking with your team or reviewing materials for your audience.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg">Who I usually work with</h3>
            <ul className="mt-4 space-y-3 text-[15px] text-slate">
              <li>Colleges, universities and schools that want to turn enquiries into enrolments</li>
              <li>Service businesses and design or technology teams that want more qualified leads</li>
              <li>Associations and campaigns that need clear, compliant outreach and reporting</li>
              <li>Teams spending days on reports that could be automated</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="svc-h" className="container-x py-10">
        <SectionHeader eyebrow="Services" title="What I can help with" id="svc-h" description="Each service has its own page with how it works, the questions people ask and related reading." />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s.slug}><FeatureCard icon={s.icon} title={s.name} description={s.cardText} href={`/services/${s.slug}/`} linkText={`Learn more about ${s.label}`} /></li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="eng-h" className="container-x py-10">
        <SectionHeader eyebrow="A typical engagement" title="From first call to results" id="eng-h" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">{STEPS.map((s) => <CompactCard key={s.title} icon={s.icon} title={s.title} text={s.text} />)}</div>
        <p className="mt-6 text-[15px] text-slate">See the <Link className="font-semibold text-brand underline" href="/case-studies/">case studies</Link> for the kind of work this involves, and the <Link className="font-semibold text-brand underline" href="/about/">about page</Link> for my background.</p>
      </section>

      <FaqSection items={FAQS} />
      <CTABand headline="Talk to a Hyderabad growth marketing consultant" />
    </>
  );
}
