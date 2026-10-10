import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { metaFromMap } from "@/lib/seo-map";
import { getGuides } from "@/lib/blog";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = metaFromMap("/guides/", "Guides");

export default function GuidesIndex() {
  const guides = getGuides();
  if (guides.length === 0) notFound(); // no empty index page until a guide is published
  return (
    <>
      <PageHero crumbs={[{ name: "Guides", path: "/guides/" }]} eyebrow="Guides" title="Marketing and AI guides" pills={null}
        intro="In-depth guides with frameworks, templates and worked examples on AI marketing automation, lead generation, Meta ads, analytics and business automation." />
      <section aria-label="Guides" className="container-x pb-12">
        <ul className="grid gap-5 md:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug}>
              <article className="card card-lift flex h-full flex-col p-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">{g.readingMinutes} min read</p>
                <h2 className="mt-2 text-xl leading-snug">{g.title}</h2>
                <p className="mt-2 flex-1 text-[15px] text-slate">{g.description}</p>
                <Link href={`/guides/${g.slug}/`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">Read the guide <ArrowRightIcon width={16} height={16} /></Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <CTABand />
    </>
  );
}
