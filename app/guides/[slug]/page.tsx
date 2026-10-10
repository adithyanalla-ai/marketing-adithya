import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { extractFaq, extractToc, getGuide, getGuides, getPosts } from "@/lib/blog";
import { clustersOf } from "@/content/seo/keyword-map";
import { getService } from "@/content/services";
import { buildMetadata, canonical } from "@/lib/seo";
import { blogPostingLd, faqLd } from "@/lib/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Toc } from "@/components/Toc";
import { AuthorBox } from "@/components/AuthorBox";
import { ShareLinks } from "@/components/ShareLinks";
import { CTABand } from "@/components/sections/CTABand";
import { PostCard, formatDate } from "@/components/PostCard";
import { mdxComponents } from "@/components/mdx";
import { ArrowRightIcon } from "@/components/icons";

export const dynamicParams = false;
export const generateStaticParams = () => getGuides().map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return buildMetadata({ title: g.title, description: g.description, path: `/guides/${g.slug}/`, type: "article", publishedTime: g.date, modifiedTime: g.updated, tags: g.tags, ogLabel: "Guide" });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const toc = extractToc(g.content);
  const faq = extractFaq(g.content);
  const service = g.service ? getService(g.service) : undefined;
  const clusterSlugs = new Set(clustersOf(g.slug).map((c) => c.url));
  const clusters = getPosts().filter((p) => clusterSlugs.has(`/blog/${p.slug}/`));
  return (
    <>
      <div className="container-x py-10">
        <JsonLd data={[blogPostingLd({ ...g, slug: g.slug }, "guides"), ...(faq.length ? [faqLd(faq)] : [])]} />
        <Breadcrumbs items={[{ name: "Guides", path: "/guides/" }, { name: g.title, path: `/guides/${g.slug}/` }]} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_280px]">
          <article>
            <header>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Guide</p>
              <h1 className="mt-2 text-4xl leading-tight">{g.title}</h1>
              <p className="mt-3 text-lg text-slate">{g.description}</p>
              <p className="mt-4 text-sm text-slate">By {g.author} · {g.readingMinutes} min read · Last updated <time dateTime={g.updated}>{formatDate(g.updated)}</time></p>
            </header>
            <div className="mt-6 lg:hidden"><Toc items={toc} /></div>
            <div className="prose prose-slate mt-8 prose-headings:scroll-mt-24">
              <MDXRemote source={g.content} components={mdxComponents} options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }} />
            </div>
            {service && (
              <section aria-labelledby="svc-h" className="card mt-10 p-6">
                <h2 id="svc-h" className="text-xl">Want this done for your business?</h2>
                <p className="mt-2 text-slate">{service.cardText}</p>
                <Link href={`/services/${service.slug}/`} className="mt-3 inline-flex items-center gap-2 font-semibold text-brand hover:underline">{service.name} <ArrowRightIcon width={16} height={16} /></Link>
              </section>
            )}
            {clusters.length > 0 && (
              <section aria-labelledby="cl-h" className="mt-12">
                <h2 id="cl-h" className="text-2xl">Go deeper</h2>
                <div className="mt-4 grid gap-5 md:grid-cols-2">{clusters.map((p) => <PostCard key={p.slug} post={p} />)}</div>
              </section>
            )}
            <div className="mt-8"><ShareLinks url={canonical(`/guides/${g.slug}/`)} title={g.title} /></div>
            <div className="mt-10"><AuthorBox /></div>
          </article>
          <aside className="hidden lg:block"><div className="sticky top-24"><Toc items={toc} /></div></aside>
        </div>
      </div>
      <CTABand />
    </>
  );
}
