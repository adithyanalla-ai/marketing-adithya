import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getCategories, postsInCategory } from "@/lib/blog";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { BlogListing } from "@/components/BlogListing";

export const dynamicParams = false;
export const generateStaticParams = () => getCategories().map((c) => ({ category: c.slug }));

const find = (slug: string) => getCategories().find((c) => c.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const slug = (await params).category;
  const c = find(slug);
  if (!c) return {};
  return buildMetadata({
    title: `${c.name} Articles | Adithya Reddy`,
    description: `Articles in the ${c.name} category on growth marketing, lead generation and AI automation.`,
    path: `/blog/category/${slug}/`,
    ogLabel: "Category",
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const slug = (await params).category;
  const c = find(slug);
  if (!c) notFound();
  return (
    <>
      <PageHero crumbs={[{ name: "Blog", path: "/blog/" }, { name: c.name, path: `/blog/category/${slug}/` }]} eyebrow="Category" title={c.name} pills={null} intro={`Articles in ${c.name} on growth marketing, lead generation and AI automation.`} />
      <div className="container-x pb-12"><BlogListing posts={postsInCategory(slug)} page={1} base={`/blog/category/${slug}`} activeCategory={slug} /></div>
      <CTABand />
    </>
  );
}
