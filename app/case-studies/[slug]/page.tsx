import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASE_STUDIES } from "@/content/case-studies";
import { getService } from "@/content/services";
import { getPost } from "@/lib/blog";
import { casePath, getCaseBySlug, view } from "@/lib/case-study";
import { buildMetadata } from "@/lib/seo";
import { abs } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { StatCard, type StatRow } from "@/components/ui/StatCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolsStrip } from "@/components/sections/ToolsStrip";
import { CTABand } from "@/components/sections/CTABand";
import { ArrowRightIcon } from "@/components/icons";
import { PostCard } from "@/components/PostCard";
import type { IconName } from "@/components/ui/iconMap";

export const dynamicParams = false;
export const generateStaticParams = () => CASE_STUDIES.map((c) => ({ slug: view(c).slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCaseBySlug((await params).slug);
  if (!c) return {};
  const v = view(c);
  const title = `${v.title} | Case Study`;
  const m = buildMetadata({
    title: title.length > 60 ? `${v.title}`.slice(0, 60) : title,
    description: `${v.challenge} Role: ${v.role}.`.slice(0, 154),
    path: casePath(c),
    ogLabel: "Case study",
  });
  return c.confirmed ? m : { ...m, robots: { index: false, follow: true } };
}

const ICONS: IconName[] = ["trend", "users", "barchart", "clock", "bolt", "target"];

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseBySlug((await params).slug);
  if (!c) notFound();
  const v = view(c);
  const service = getService(c.serviceSlugs[0]);
  const post = getPost(c.postSlug);

  const rows: StatRow[] = v.results.map((r, i) => ({
    icon: ICONS[i % ICONS.length],
    ...(r.value ? { value: r.value } : { title: r.label }),
    label: r.value ? `${r.label}${r.scope ? `, ${r.scope}` : ""}` : "Result",
  }));
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: v.title,
    description: v.challenge,
    mainEntityOfPage: abs(casePath(c)),
    author: { "@type": "Person", name: "Adithya Reddy", url: abs("/about/") },
    publisher: { "@type": "Person", name: "Adithya Reddy", url: abs("/") },
    about: service?.name,
    inLanguage: "en-IN",
  };

  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        crumbs={[{ name: "Case Studies", path: "/case-studies/" }, { name: v.title, path: casePath(c) }]}
        eyebrow="Case study"
        title={v.title}
        intro={v.challenge}
        pills={null}
        media={rows.length ? <StatCard rows={rows.slice(0, 4)} className="mx-auto max-w-sm lg:ml-auto" /> : undefined}
      />

      <section aria-label="Role and period" className="container-x pb-4">
        <dl className="card grid gap-4 p-6 sm:grid-cols-3">
          <div><dt className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Client</dt><dd className="mt-1 font-display font-extrabold capitalize-first">{v.name}</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-[0.14em] text-brand">My role</dt><dd className="mt-1 font-display font-extrabold">{v.role}</dd></div>
          {v.period && <div><dt className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Period</dt><dd className="mt-1 font-display font-extrabold">{v.period}</dd></div>}
        </dl>
      </section>

      <section aria-labelledby="ch-h" className="container-x grid gap-5 py-10 lg:grid-cols-2">
        <div className="card p-6">
          <h2 id="ch-h" className="text-xl">Challenge</h2>
          <p className="mt-3 text-[16px] leading-relaxed text-slate">{v.challenge}</p>
        </div>
        <div className="card p-6">
          <h2 className="text-xl">What I did</h2>
          <ol className="mt-4 space-y-3">
            {v.actions.map((a, i) => (
              <li key={a} className="flex gap-3 text-[15px] text-slate">
                <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-[#EAF2FF] text-xs font-extrabold text-brand">{i + 1}</span>{a}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {rows.length > 0 && (
        <section aria-labelledby="res-h" className="container-x py-6">
          <SectionHeader eyebrow="Results" title="What changed" id="res-h" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {v.results.map((r) => (
              <li key={r.label + (r.value ?? "")} className="card p-6">
                {r.value ? (
                  <>
                    <p className="font-display text-3xl font-extrabold tracking-tight text-brand">{r.value}</p>
                    <p className="mt-1 text-[15px] text-slate">{r.label}</p>
                    {r.scope && <p className="mt-2 inline-block rounded-md bg-[#EAF2FF] px-2 py-0.5 text-xs font-bold text-brand-dark">{r.scope}</p>}
                  </>
                ) : (
                  <p className="font-display text-lg font-extrabold">{r.label}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {v.tools.length > 0 && <ToolsStrip names={v.tools} id="case-tools" heading="Tools used" />}

      <section aria-labelledby="rel-h" className="container-x py-8">
        <SectionHeader eyebrow="Related" title="Keep reading" id="rel-h" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {post && <PostCard post={post} />}
          {service && (
            <article className="card card-lift flex flex-col p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Related service</p>
              <h3 className="mt-2 text-xl">{service.name}</h3>
              <p className="mt-2 flex-1 text-[15px] text-slate">{service.cardText}</p>
              <Link href={`/services/${service.slug}/`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
                Learn more about {service.label} <ArrowRightIcon width={16} height={16} />
              </Link>
            </article>
          )}
        </div>
      </section>
      <CTABand />
    </>
  );
}
