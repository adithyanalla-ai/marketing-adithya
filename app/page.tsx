import Link from "next/link";
import type { Metadata } from "next";
import { metaFromMap } from "@/lib/seo-map";
import { getPosts } from "@/lib/blog";
import { CASE_STUDIES } from "@/content/case-studies";
import { casePath, view } from "@/lib/case-study";
import { Hero } from "@/components/hero/Hero";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, personLd, professionalServiceLd, websiteLd } from "@/lib/jsonld";
import { ToolsStrip } from "@/components/sections/ToolsStrip";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { CTABand } from "@/components/sections/CTABand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CompactCard } from "@/components/ui/CompactCard";
import { PostCard } from "@/components/PostCard";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { IndustryInsights } from "@/components/sections/IndustryInsights";
import { FaqSection } from "@/components/sections/FaqSection";
import type { Faq } from "@/content/services";

export const metadata: Metadata = metaFromMap("/");

const HOME_FAQS: Faq[] = [
  {
    q: "How do you prove the return on AI marketing?",
    a: "I record a baseline first: cost per lead, lead volume and how many leads become real conversations. Then I change one thing at a time, keep a written test log and report cost per lead alongside lead quality, so every improvement can be traced to a change.",
  },
  {
    q: "What is generative engine optimization (GEO)?",
    a: "GEO means making your business easy for AI assistants to understand and recommend: a plain description of what you do, consistent details across the web, structured data and clear answers to buyer questions. It builds on good SEO rather than replacing it.",
  },
  {
    q: "Do you only work with businesses in Hyderabad?",
    a: "I am based in Hyderabad and work with clients across India. Calls and reporting run online, so location is rarely a limit.",
  },
  {
    q: "Will AI-written content hurt my brand?",
    a: "Not if a person stays in charge. I use AI to draft and to speed up reporting, then check facts, figures and tone before anything goes out. Unchecked, generic AI output is the real risk.",
  },
];

export default function Home() {
  const posts = getPosts().slice(0, 3);
  return (
    <>
      <JsonLd data={[personLd(), organizationLd(), professionalServiceLd(), websiteLd()]} />
      <Hero />
      <ToolsStrip />
      <ServicesGrid />
      <ProcessSteps />
      <StatsStrip />
      <IndustryInsights />

      <section aria-labelledby="cases-h" className="container-x py-12">
        <SectionHeader eyebrow="Case studies" title="Work behind the numbers" id="cases-h" description="Selected projects across admissions, election campaigns and growth marketing." />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {CASE_STUDIES.map((c) => {
            const v = view(c);
            return <CompactCard key={v.slug} icon={c.icon} title={v.title} text={v.badge} href={casePath(c)} />;
          })}
        </div>
        <p className="mt-6"><Link href="/case-studies/" className="font-semibold text-brand underline">View all case studies</Link></p>
      </section>

      <InstagramSection />

      {posts.length > 0 && (
        <section aria-labelledby="blog-h" className="container-x py-12">
          <SectionHeader eyebrow="From the blog" title="Latest articles" id="blog-h" description="Frameworks, templates and worked examples on lead generation, Meta ads and automation." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </section>
      )}
      <FaqSection items={HOME_FAQS} description="Straight answers on measuring AI marketing, AI search and working together." />
      <CTABand />
    </>
  );
}
