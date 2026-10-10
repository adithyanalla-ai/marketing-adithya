import type { StatRow } from "@/components/ui/StatCard";
import type { IconName } from "@/components/ui/iconMap";

/**
 * Case studies. Only resume facts belong here.
 * `ready: false` pages are noindex and left out of the sitemap until the write-up is complete.
 * Fields left undefined render a visible "write-up in progress" note rather than invented detail.
 */
export type CaseStudy = {
  slug: string;
  name: string;
  sector: string;
  icon: IconName;
  serviceSlug: string;
  badge: string;
  summary: string;
  ready: boolean;
  challenge?: string;
  approach?: string[];
  result?: string[];
  metrics: StatRow[];
  tools: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "pp-savani-university-admissions",
    name: "P P Savani University Admissions",
    sector: "Education · Admissions marketing",
    icon: "graduation",
    serviceSlug: "admissions-marketing",
    badge: "350+ students admitted",
    summary: "Admissions marketing for a university, taking enquiries through to enrolled students.",
    ready: false,
    challenge: "Turn admission enquiries into enrolled students.",
    metrics: [{ icon: "graduation", value: "350+", label: "Students admitted" }],
    tools: ["Meta Ads", "Excel", "Power BI"],
  },
  {
    slug: "police-officers-association-election-campaign",
    name: "Police Officers Association Election Campaign",
    sector: "Election campaign marketing",
    icon: "bank",
    serviceSlug: "election-campaign-marketing",
    badge: "29/29 seats won",
    summary: "Digital outreach and reporting for an association election.",
    ready: false,
    challenge: "Reach and mobilise voters for an association election.",
    metrics: [{ icon: "bank", value: "29/29", label: "Seats won" }],
    tools: ["Meta Ads", "Excel", "Power BI"],
  },
  {
    slug: "eject-solutions",
    name: "Eject Solutions",
    sector: "Experience · Growth marketing",
    icon: "briefcase",
    serviceSlug: "ai-lead-generation",
    badge: "Write-up in progress",
    summary: "Marketing work at Eject Solutions. Details are being added.",
    ready: false,
    metrics: [],
    tools: [],
  },
  {
    slug: "int360-design-studio",
    name: "INT360 Design Studio",
    sector: "Experience · Growth marketing",
    icon: "briefcase",
    serviceSlug: "meta-ads-performance-marketing",
    badge: "Write-up in progress",
    summary: "Marketing work at INT360 Design Studio. Details are being added.",
    ready: false,
    metrics: [],
    tools: [],
  },
];

export const getCase = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
