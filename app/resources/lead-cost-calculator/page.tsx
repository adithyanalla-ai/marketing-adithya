import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { LeadCostCalculator } from "@/components/LeadCostCalculator";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = buildMetadata({
  title: "Lead Cost Calculator | Adithya Reddy",
  description: "Work out your cost per lead and cost per customer from ad spend, leads and conversions. A free calculator by a Hyderabad marketer.",
  path: "/resources/lead-cost-calculator/",
  ogLabel: "Resources",
});

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: "Resources", path: "/resources/" }, { name: "Lead Cost Calculator", path: "/resources/lead-cost-calculator/" }]}
        eyebrow="Free tool" title="Lead Cost Calculator" pills={null}
        intro="Enter your ad spend, leads and conversion rate to see what each lead and each customer costs. Everything is calculated in your browser." />
      <div className="container-x pb-12"><LeadCostCalculator /></div>
      <CTABand />
    </>
  );
}
