import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getPosts, PAGE_SIZE } from "@/lib/blog";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { BlogListing } from "@/components/BlogListing";

export const dynamicParams = false;
export function generateStaticParams() {
  const pages = Math.ceil(getPosts().length / PAGE_SIZE);
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const n = (await params).page;
  return buildMetadata({
    title: `Marketing Blog, Page ${n} | Adithya Reddy`,
    description: `Page ${n} of articles on lead generation, Meta ads, marketing analytics and LLM automation.`,
    path: `/blog/page/${n}/`,
    ogLabel: "Blog",
  });
}

export default async function BlogPage({ params }: { params: Promise<{ page: string }> }) {
  const n = Number((await params).page);
  const posts = getPosts();
  if (!Number.isInteger(n) || n < 2 || n > Math.ceil(posts.length / PAGE_SIZE)) notFound();
  return (
    <>
      <PageHero crumbs={[{ name: "Blog", path: "/blog/" }, { name: `Page ${n}`, path: `/blog/page/${n}/` }]} eyebrow="Insights" title={`Marketing blog, page ${n}`} pills={null} intro="More articles on lead generation, Meta ads, analytics and LLM automation." />
      <div className="container-x pb-12"><BlogListing posts={posts} page={n} base="/blog" /></div>
      <CTABand />
    </>
  );
}
