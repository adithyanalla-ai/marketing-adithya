import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getTags, postsWithTag } from "@/lib/blog";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { PostCard } from "@/components/PostCard";

export const dynamicParams = false;
export const generateStaticParams = () => getTags().map((t) => ({ tag: t.slug }));
const find = (slug: string) => getTags().find((t) => t.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const slug = (await params).tag;
  const t = find(slug);
  if (!t) return {};
  // Tag archives are thin: keep them crawlable for discovery but out of the index.
  return { ...buildMetadata({
    title: `Articles tagged ${t.name} | Adithya Reddy`,
    description: `Articles tagged “${t.name}” on growth marketing, lead generation and AI automation.`,
    path: `/blog/tag/${slug}/`,
    ogLabel: "Tag",
  }), robots: { index: false, follow: true } };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const slug = (await params).tag;
  const t = find(slug);
  if (!t) notFound();
  return (
    <>
      <PageHero crumbs={[{ name: "Blog", path: "/blog/" }, { name: `Tag: ${t.name}`, path: `/blog/tag/${slug}/` }]} eyebrow="Tag" title={`Tagged: ${t.name}`} pills={null} intro={`Articles tagged “${t.name}”.`} />
      <div className="container-x grid gap-5 pb-12 md:grid-cols-2 lg:grid-cols-3">{postsWithTag(slug).map((p) => <PostCard key={p.slug} post={p} />)}</div>
      <CTABand />
    </>
  );
}
