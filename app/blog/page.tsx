import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogListing } from "@/components/BlogListing";

export const metadata: Metadata = buildMetadata({
  title: "Marketing Blog: Lead Gen, Meta Ads, AI | Adithya",
  description: "Practical articles on lead generation, Meta ads, marketing analytics and LLM automation, from a Hyderabad-based marketer.",
  path: "/blog/",
  ogLabel: "Blog",
});

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Breadcrumbs items={[{ name: "Blog", path: "/blog/" }]} />
      <h1 className="mt-6 text-4xl font-semibold">Marketing blog</h1>
      <p className="mt-3 max-w-2xl text-muted">Frameworks, templates and worked examples on lead generation, Meta ads, analytics and LLM automation.</p>
      <div className="mt-8"><BlogListing posts={getPosts()} page={1} base="/blog" showFeatured /></div>
    </div>
  );
}
