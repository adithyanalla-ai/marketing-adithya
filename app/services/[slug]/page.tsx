import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, getService } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";
import { postsForTags } from "@/lib/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { CtaBanner } from "@/components/CtaBanner";
import { faqLd, professionalServiceLd } from "@/lib/jsonld";
import { PostCard } from "@/components/PostCard";
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
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.metaDescription,
    url: abs(`/services/${s.slug}/`),
    provider: { "@id": professionalServiceLd()["@id"] },
    areaServed: ["Hyderabad", "Telangana", "India"],
  };
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <JsonLd data={[service, faqLd(s.faqs)]} />
      <Breadcrumbs items={[{ name: "Services", path: "/#services" }, { name: s.name, path: `/services/${s.slug}/` }]} />
      <article>
        <h1 className="mt-6 text-4xl font-semibold leading-tight">{s.h1}</h1>
        <p className="mt-4 text-lg text-muted">{s.intro}</p>

        <section aria-labelledby="d-h" className="mt-12">
          <h2 id="d-h" className="text-2xl font-semibold">What you get</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">{s.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
        </section>

        <section aria-labelledby="p-h" className="mt-12">
          <h2 id="p-h" className="text-2xl font-semibold">How it works</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2">
            {s.process.map((p, i) => (
              <li key={p.step} className="rounded-2xl border border-line bg-white p-5">
                <h3 className="font-semibold">{i + 1}. {p.step}</h3>
                <p className="mt-1 text-sm text-muted">{p.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="proof-h" className="mt-12">
          <h2 id="proof-h" className="text-2xl font-semibold">Proof</h2>
          {s.proof.length ? (
            <ul className="mt-4 space-y-4">
              {s.proof.map((p) => (
                <li key={p.title} className="rounded-2xl border border-line bg-white p-5">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-lg">{p.result}</p>
                  {p.postSlug && <Link className="mt-2 inline-block text-sm font-semibold text-accent underline" href={`/blog/${p.postSlug}/`}>Read the case write-up</Link>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-muted">
              Case-study details for this service are shared on a call. See other <Link className="underline" href="/work/">results and case studies</Link>.
            </p>
          )}
        </section>

        <section aria-labelledby="faq-h" className="mt-12">
          <h2 id="faq-h" className="text-2xl font-semibold">Frequently asked questions</h2>
          <dl className="mt-4 space-y-5">
            {s.faqs.map((f) => (
              <div key={f.q}><dt className="font-semibold">{f.q}</dt><dd className="mt-1 text-muted">{f.a}</dd></div>
            ))}
          </dl>
        </section>

        {posts.length > 0 && (
          <section aria-labelledby="rel-h" className="mt-12">
            <h2 id="rel-h" className="text-2xl font-semibold">Related articles</h2>
            <div className="mt-4 grid gap-5 md:grid-cols-2">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
          </section>
        )}
      </article>

      <div className="mt-12"><CtaBanner heading={`Talk about ${s.name.toLowerCase()}`} /></div>
      <nav aria-label="Other services" className="mt-10 text-sm">
        <h2 className="font-semibold">Other services</h2>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
          {others.map((o) => <li key={o.slug}><Link className="underline" href={`/services/${o.slug}/`}>{o.name}</Link></li>)}
        </ul>
      </nav>
    </div>
  );
}
