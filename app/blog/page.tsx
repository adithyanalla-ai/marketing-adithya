import type { Metadata } from "next";
import { metaFromMap } from "@/lib/seo-map";
import { getPosts } from "@/lib/blog";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { BlogListing } from "@/components/BlogListing";

export const metadata: Metadata = metaFromMap("/blog/", "Blog");

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
