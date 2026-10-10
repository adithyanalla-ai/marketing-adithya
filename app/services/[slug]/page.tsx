import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, getService } from "@/content/services";
import { casePath, casesForService, view } from "@/lib/case-study";
import { buildMetadata } from "@/lib/seo";
import { postsForTags } from "@/lib/blog";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { StatCard } from "@/components/ui/StatCard";
import { CompactCard } from "@/components/ui/CompactCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconChip } from "@/components/ui/IconChip";
import { ToolsStrip } from "@/components/sections/ToolsStrip";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTABand } from "@/components/sections/CTABand";
import { PostCard } from "@/components/PostCard";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";
import { abs } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}/`, ogLabel: "Service" });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const posts = postsForTags(s.relatedTags, 3);
  const related = s.relatedServices.map((r) => getService(r)!).filter(Boolean);
  const caseStudy = casesForService(s.slug)[0];
  const cv = caseStudy ? view(caseStudy) : undefined;
  const post = s.postSlug ? posts.find((p) => p.slug === s.postSlug) : undefined;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.metaDescription,
    url: abs(`/services/${s.slug}/`),
    serviceType: s.name,
    provider: { "@type": "ProfessionalService", name: "Adithya Reddy Marketing", url: abs("/") },
    areaServed: [{ "@type": "City", name: "Hyderabad" }, { "@type": "AdministrativeArea", name: "Telangana" }, { "@type": "Country", name: "India" }],
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <PageHero
        crumbs={[{ name: "Services", path: "/services/" }, { name: s.name, path: `/services/${s.slug}/` }]}
        eyebrow={s.eyebrow}
        title={s.h1}
        intro={s.intro}
        media={<StatCard rows={s.stats} className="mx-auto max-w-sm lg:ml-auto" />}
      />

      <section aria-labelledby="what-h" className="container-x py-12">
        <SectionHeader eyebrow="The service" title="What it is and who it is for" id="what-h" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/90">
            {s.whatItIs.map((p) => <p key={p}>{p}</p>)}
            <h3 className="pt-3 text-lg">Who it is for</h3>
            <ul className="space-y-2.5">
              {s.audience.map((a) => (
                <li key={a} className="flex gap-3 text-[16px]"><CheckIcon width={20} height={20} className="mt-0.5 shrink-0 text-success" strokeWidth={3} />{a}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-lg">What you get</h3>
            <ul className="mt-4 space-y-3">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-[15px] text-slate"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-h" className="container-x py-12">
        <SectionHeader eyebrow="How I do it" title="From plan to measurable results" id="how-h" description="A short, repeatable process, reviewed against your numbers as results come in." />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {s.how.map((h) => <CompactCard key={h.title} icon={h.icon} title={h.title} text={h.text} />)}
        </div>
      </section>

      <section aria-labelledby="proof-h" className="container-x py-12">
        <SectionHeader eyebrow="Proof" title="Results from my work" id="proof-h" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.stats.map((st) => (
            <div key={st.label} className="card p-6">
              <IconChip name={st.icon} />
              <p className="mt-4 font-display text-3xl font-extrabold tracking-tight text-brand">{st.value}</p>
              <p className="mt-1 text-[15px] text-slate">{st.label}</p>
            </div>
          ))}
          {(caseStudy || post) && (
            <div className="card flex flex-col justify-between p-6">
              <p className="text-[15px] text-slate">{caseStudy ? "Read the case study behind this result." : "Read how this works in practice."}</p>
              <Link href={caseStudy ? casePath(caseStudy) : `/blog/${post!.slug}/`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
                {cv ? cv.title : post!.title} <ArrowRightIcon width={16} height={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <ToolsStrip names={s.tools} id="service-tools" heading="Tools used" />
      <FaqSection items={s.faqs} />

      {posts.length > 0 && (
        <section aria-labelledby="posts-h" className="container-x py-12">
          <SectionHeader eyebrow="From the blog" title="Related articles" id="posts-h" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </section>
      )}

      <section aria-labelledby="rel-h" className="container-x py-12">
        <SectionHeader eyebrow="Keep exploring" title="Related services" id="rel-h" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {related.map((r) => <CompactCard key={r.slug} icon={r.icon} title={r.name} text={r.cardText.split(".")[0] + "."} href={`/services/${r.slug}/`} />)}
        </div>
      </section>

      <CTABand headline={`Talk about ${s.label}`} />
    </>
  );
}
