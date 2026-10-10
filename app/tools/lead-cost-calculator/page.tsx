import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadCostCalculator } from "@/components/LeadCostCalculator";

export const metadata: Metadata = buildMetadata({
  title: "Lead Cost Calculator | Adithya Reddy",
  description: "Work out your cost per lead and cost per customer from ad spend, leads and conversions. A free calculator by a Hyderabad marketer.",
  path: "/tools/lead-cost-calculator/",
});

export default function Page() {
  return (
    <div className="container-x max-w-3xl py-12">
      <Breadcrumbs items={[{ name: "Lead Cost Calculator", path: "/tools/lead-cost-calculator/" }]} />
      <h1 className="mt-6 text-4xl">Lead Cost Calculator</h1>
      <p className="mt-3 text-slate">Enter your numbers to see what each lead and each customer actually costs. Everything is calculated in your browser.</p>
      <div className="mt-8"><LeadCostCalculator /></div>
    </div>
  );
}
