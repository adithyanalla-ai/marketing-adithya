import type { CaseStudy } from "./types";

/** Never name the 10+ end clients. */
export const int360: CaseStudy = {
  slug: "int360-design-studio",
  anonymizedSlug: "design-studio",
  clientName: "INT360 Design Studio",
  anonymizedLabel: "a design studio",
  kind: "employer",
  headline: "Meta A/B testing and analytics at {client}",
  role: "Marketing Analytics Analyst",
  period: "Mar 2023 to Mar 2024",
  challenge: "Lower client cost per lead and replace manual weekly reporting.",
  actions: [
    "Ran 15+ statistically significant Meta A/B tests across 10+ clients (INR 50L+ ad spend)",
    "Used cohort analysis and customer segmentation in Python (Pandas)",
    "Built weekly Power BI dashboards (DAX, SQL) tracking CPL, CTR and ROAS",
    "Automated reporting and outreach work",
  ],
  actionsPublic: [
    "Ran statistically significant Meta A/B tests across multiple clients",
    "Used cohort analysis and customer segmentation in Python (Pandas)",
    "Built weekly Power BI dashboards (DAX, SQL) tracking CPL, CTR and ROAS",
    "Automated reporting and outreach work",
  ],
  results: [
    { value: "20%", label: "lower cost per lead", scope: "", qualitative: "Lower cost per lead" },
    { value: "INR 8 lakh", label: "saved per year (approx.)", scope: "", qualitative: "Annual ad-cost savings" },
    { value: "30%", label: "conversion lift", scope: "", qualitative: "Higher conversion rate" },
    { value: "12 hours", label: "per week of reporting and outreach automated", scope: "for a team of 8", qualitative: "Weekly reporting and outreach hours automated" },
  ],
  tools: ["Meta Ads", "Power BI", "DAX", "SQL", "Python", "Pandas"],
  permission: { clientNamePublic: false, figuresPublic: false },
  confirmed: false,
  updated: "2026-10-10",
  serviceSlugs: ["meta-ads-performance-marketing", "marketing-analytics-power-bi"],
  postSlug: "structured-meta-ab-testing-cut-cost-per-lead",
  icon: "barchart",
};
