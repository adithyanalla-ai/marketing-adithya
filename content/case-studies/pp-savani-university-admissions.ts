import type { CaseStudy } from "./types";

export const ppSavani: CaseStudy = {
  slug: "pp-savani-university-admissions",
  anonymizedSlug: "private-university-admissions",
  clientName: "P P Savani University",
  anonymizedLabel: "a private university",
  kind: "project",
  headline: "Admissions marketing for {client}",
  role: "Marketing and admissions outreach lead",
  period: "2024-2025 (TODO_CONFIRM months)",
  challenge: "Fill university seats by turning online and offline enquiries into enrolled students.",
  actions: [
    "Ran targeted admissions outreach across online and offline campaigns",
    "Planned and executed the full marketing campaign",
    "Built a lead pipeline that segmented and scored prospective students",
    "Coordinated with the admissions team across the funnel from enquiry to enrollment",
  ],
  results: [
    { value: "Top", label: "admission rate", scope: "2024-2025", qualitative: "Top admission rate for the cycle" },
    { value: "350+", label: "students admitted", scope: "2024-2025", qualitative: "Students admitted across the admissions cycle" },
  ],
  tools: ["TODO_CONFIRM"],
  permission: { clientNamePublic: false, figuresPublic: false },
  confirmed: false,
  updated: "2026-10-10",
  serviceSlugs: ["admissions-marketing"],
  postSlug: "admissions-marketing-funnel-enquiry-to-enrollment",
  icon: "graduation",
};
