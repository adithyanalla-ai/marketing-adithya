import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { getPosts } from "@/lib/blog";
import { Hero3D } from "@/components/Hero3D";
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
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Hyderabad, Telangana · India</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">
            Growth marketing that turns enquiries into customers
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            I help businesses across India generate better leads, run Meta ads that cost less per lead,
            and automate reporting with LLMs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={SITE.bookingUrl} className="btn btn-primary">Book a call</Link>
            <Link href="/work/" className="btn btn-ghost">See results</Link>
          </div>
        </div>
        <Hero3D />
      </section>

      <section id="services" aria-labelledby="services-h" className="mx-auto max-w-6xl px-4 py-12">
        <h2 id="services-h" className="text-3xl font-semibold">Services</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s.slug} className="rounded-2xl border border-line bg-white p-6">
              <h3 className="text-xl font-semibold"><Link href={`/services/${s.slug}/`}>{s.name}</Link></h3>
              <p className="mt-2 text-sm text-muted">{s.metaDescription}</p>
              <Link href={`/services/${s.slug}/`} className="mt-4 inline-block text-sm font-semibold text-accent underline">
                Learn about {s.name.toLowerCase()}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="results-h" className="mx-auto max-w-6xl px-4 py-12">
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
        <p className="mt-4"><Link href="/work/" className="font-semibold text-accent underline">Read how these were achieved</Link></p>
      </section>

      {posts.length > 0 && (
        <section aria-labelledby="blog-h" className="mx-auto max-w-6xl px-4 py-12">
          <h2 id="blog-h" className="text-3xl font-semibold">Latest from the blog</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {posts.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-4 py-12"><CtaBanner /></div>
    </>
  );
}
