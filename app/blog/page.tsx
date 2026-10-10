import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/blog";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { BlogListing } from "@/components/BlogListing";

export const metadata: Metadata = buildMetadata({
  title: "Marketing Blog: Lead Gen, Meta Ads, AI | Adithya",
  description: "Practical articles on lead generation, Meta ads, marketing analytics and LLM automation, from a Hyderabad-based marketer.",
  path: "/blog/",
  ogLabel: "Blog",
});

export default function BlogIndex() {
  return (
    <>
      <PageHero crumbs={[{ name: "Blog", path: "/blog/" }]} eyebrow="Insights" title="Marketing blog" pills={null}
        intro="Frameworks, templates and worked examples on lead generation, Meta ads, analytics and LLM automation." />
      <div className="container-x pb-12"><BlogListing posts={getPosts()} page={1} base="/blog" showFeatured /></div>
      <CTABand />
    </>
  );
}
