import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { extractFaq, extractToc, getPost, getPosts, relatedPosts } from "@/lib/blog";
import { buildMetadata, canonical } from "@/lib/seo";
import { blogPostingLd, faqLd } from "@/lib/jsonld";
import { SERVICES } from "@/lib/services";
import { slugify } from "@/lib/slug";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Toc } from "@/components/Toc";
import { ShareLinks } from "@/components/ShareLinks";
import { AuthorBox } from "@/components/AuthorBox";
import { CTABand } from "@/components/sections/CTABand";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PostCard, formatDate } from "@/components/PostCard";
import { mdxComponents } from "@/components/mdx";
import { entryFor } from "@/content/seo/keyword-map";
import { getGuide } from "@/lib/blog";

export const dynamicParams = false;
export const generateStaticParams = () => getPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return buildMetadata({
    title: p.title.length > 60 ? `${p.title.slice(0, 57)}...` : p.title,
    description: p.description,
    path: `/blog/${p.slug}/`,
    type: "article",
    publishedTime: p.date,
    modifiedTime: p.updated,
    tags: p.tags,
    ogLabel: p.category,
  });
}

function relatedServices(tags: string[], category: string) {
  const hay = [...tags, category].map((t) => t.toLowerCase());
  const scored = SERVICES.map((s) => ({ s, n: s.relatedTags.filter((t) => hay.includes(t)).length }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .map((x) => x.s);
  return (scored.length >= 2 ? scored : [...scored, ...SERVICES.filter((s) => !scored.includes(s))]).slice(0, 3);
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const toc = extractToc(post.content);
  const faq = extractFaq(post.content);
  const related = relatedPosts(post, 3);
  const services = relatedServices(post.tags, post.category);
  const url = canonical(`/blog/${post.slug}/`);
  const pillarSlug = entryFor(`/blog/${post.slug}/`)?.pillar;
  const pillar = pillarSlug ? getGuide(pillarSlug) : undefined;

  return (
    <>
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <JsonLd data={[blogPostingLd(post), ...(faq.length ? [faqLd(faq)] : [])]} />
      <Breadcrumbs items={[{ name: "Blog", path: "/blog/" }, { name: post.category, path: `/blog/category/${slugify(post.category)}/` }, { name: post.title, path: `/blog/${post.slug}/` }]} />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_280px]">
        <article>
          <header>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              <Link href={`/blog/category/${slugify(post.category)}/`}>{post.category}</Link>
            </p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight">{post.title}</h1>
            <p className="mt-3 text-lg text-muted">{post.description}</p>
            <p className="mt-4 text-sm text-muted">
              By {post.author} · {post.readingMinutes} min read · Published <time dateTime={post.date}>{formatDate(post.date)}</time>
              {" "}· Last updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
            </p>
          </header>
          <div className="mt-6 lg:hidden"><Toc items={toc} /></div>
          <div className="prose prose-slate mt-8 prose-headings:scroll-mt-24">
            <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }} />
          </div>

          {post.sources.length > 0 && (
            <section aria-labelledby="src-h" className="mt-10">
              <h2 id="src-h" className="text-xl font-semibold">Sources</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                {post.sources.map((s) => <li key={s.url}><a className="underline" href={s.url} rel="noopener noreferrer">{s.title}</a></li>)}
              </ul>
            </section>
          )}

          {pillar && (
            <section aria-labelledby="pillar-h" className="card mt-10 p-6">
              <h2 id="pillar-h" className="text-xl">Part of the guide</h2>
              <p className="mt-2"><Link className="font-semibold text-brand underline" href={`/guides/${pillar.slug}/`}>{pillar.title}</Link></p>
              <p className="mt-1 text-sm text-slate">{pillar.description}</p>
            </section>
          )}

          <section aria-labelledby="svc-h" className="mt-10">
            <h2 id="svc-h" className="text-xl font-semibold">Services related to this article</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {services.map((s) => <li key={s.slug}><Link className="underline" href={`/services/${s.slug}/`}>{s.name}</Link></li>)}
            </ul>
          </section>

          <div className="mt-8"><ShareLinks url={url} title={post.title} /></div>
          <div className="mt-10"><AuthorBox /></div>

          <section aria-labelledby="nl-h" className="mt-10 card p-6">
            <h2 id="nl-h" className="text-xl font-semibold">Get new articles by email</h2>
            <p className="mt-1 text-sm text-muted">One email when a new article is published. No spam.</p>
            <div className="mt-4"><NewsletterForm /></div>
          </section>

          {related.length > 0 && (
            <section aria-labelledby="rel-h" className="mt-12">
              <h2 id="rel-h" className="text-2xl font-semibold">Related posts</h2>
              <div className="mt-4 grid gap-5 md:grid-cols-2">{related.map((r) => <PostCard key={r.slug} post={r} />)}</div>
            </section>
          )}
          </article>
        <aside className="hidden lg:block"><div className="sticky top-24"><Toc items={toc} /></div></aside>
      </div>
      </div>
      <CTABand />
    </>
  );
}
