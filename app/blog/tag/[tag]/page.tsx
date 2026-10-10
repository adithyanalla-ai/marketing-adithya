import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getTags, postsWithTag } from "@/lib/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PostCard } from "@/components/PostCard";

export const dynamicParams = false;
export const generateStaticParams = () => getTags().map((t) => ({ tag: t.slug }));
const find = (slug: string) => getTags().find((t) => t.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const slug = (await params).tag;
  const t = find(slug);
  if (!t) return {};
  return buildMetadata({
    title: `Articles tagged ${t.name} | Adithya Reddy`,
    description: `Articles tagged “${t.name}” on growth marketing, lead generation and AI automation.`,
    path: `/blog/tag/${slug}/`,
    ogLabel: "Tag",
  });
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const slug = (await params).tag;
  const t = find(slug);
  if (!t) notFound();
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <Breadcrumbs items={[{ name: "Blog", path: "/blog/" }, { name: `Tag: ${t.name}`, path: `/blog/tag/${slug}/` }]} />
      <h1 className="mt-6 text-4xl font-semibold">Tagged: {t.name}</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{postsWithTag(slug).map((p) => <PostCard key={p.slug} post={p} />)}</div>
    </div>
  );
}
