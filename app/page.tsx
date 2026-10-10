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

export const metadata: Metadata = metaFromMap("/");

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

      {posts.length > 0 && (
        <section aria-labelledby="blog-h" className="container-x py-12">
          <SectionHeader eyebrow="From the blog" title="Latest articles" id="blog-h" description="Frameworks, templates and worked examples on lead generation, Meta ads and automation." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </section>
      )}
      <CTABand />
    </>
  );
}
