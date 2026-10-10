import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getPosts, PAGE_SIZE } from "@/lib/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <Breadcrumbs items={[{ name: "Blog", path: "/blog/" }, { name: `Page ${n}`, path: `/blog/page/${n}/` }]} />
      <h1 className="mt-6 text-4xl font-semibold">Marketing blog, page {n}</h1>
      <div className="mt-8"><BlogListing posts={posts} page={n} base="/blog" /></div>
    </div>
  );
}
