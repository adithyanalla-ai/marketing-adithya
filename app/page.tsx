import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { getPosts } from "@/lib/blog";
import { Hero } from "@/components/hero/Hero";
import { ToolsStrip } from "@/components/ToolsStrip";
import { PostCard } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { CtaBanner } from "@/components/CtaBanner";
import { personLd, professionalServiceLd, websiteLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Adithya Reddy | Growth & Performance Marketer",
  description: "Lead generation, Meta ads, marketing analytics and LLM automation from Hyderabad, India. See services, case results and the blog.",
  path: "/",
});

export default function Home() {
  const posts = getPosts().slice(0, 3);
  return (
    <>
      <JsonLd data={[personLd(), professionalServiceLd(), websiteLd()]} />
      <Hero />
      <ToolsStrip />

      <section id="services" aria-labelledby="services-h" className="mx-auto max-w-[1200px] px-6 py-12">
        <h2 id="services-h" className="text-3xl font-semibold">Services</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s.slug} className="rounded-2xl border border-line bg-white p-6">
              <h3 className="text-xl font-semibold"><Link href={`/services/${s.slug}/`}>{s.name}</Link></h3>
              <p className="mt-2 text-sm text-muted">{s.metaDescription}</p>
              <Link href={`/services/${s.slug}/`} className="mt-4 inline-block text-sm font-semibold text-brand underline">
                Learn about {s.name.toLowerCase()}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="results-h" className="mx-auto max-w-[1200px] px-6 py-12">
        <h2 id="results-h" className="text-3xl font-semibold">Results so far</h2>
        <dl className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6">
            <dt className="text-sm text-muted">Meta ads A/B testing</dt>
            <dd className="mt-1 font-display text-4xl font-semibold">20% lower cost per lead</dd>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <dt className="text-sm text-muted">LLM client reporting</dt>
            <dd className="mt-1 font-display text-4xl font-semibold">3 days → 4 hours</dd>
          </div>
        </dl>
        <p className="mt-4"><Link href="/work/" className="font-semibold text-brand underline">Read how these were achieved</Link></p>
      </section>

      {posts.length > 0 && (
        <section aria-labelledby="blog-h" className="mx-auto max-w-[1200px] px-6 py-12">
          <h2 id="blog-h" className="text-3xl font-semibold">Latest from the blog</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {posts.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-[1200px] px-6 py-12"><CtaBanner /></div>
    </>
  );
}
