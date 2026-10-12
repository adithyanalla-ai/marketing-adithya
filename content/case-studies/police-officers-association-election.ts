import type { CaseStudy } from "./types";

/** Political client: wording stays neutral, factual and non-partisan. */
export const policeElection: CaseStudy = {
  slug: "police-officers-association-election",
  anonymizedSlug: "city-association-election",
  clientName: "Police Officers Association, Hyderabad City",
  anonymizedLabel: "a city association election panel",
  kind: "project",
  headline: "Election campaign and manifesto for {client}",
  role: "Marketing and manifesto lead",
  period: "2026",
  challenge: "Win an association election with a coordinated online and offline campaign and a clear manifesto.",
  actions: [
    "Led online and offline marketing",
    "Wrote the manifesto and messaging",
    "(further actions TODO_CONFIRM)",
  ],
  results: [
    { value: "29/29", label: "seats won", scope: "2026", qualitative: "The panel won the election" },
    { value: "Presidency", label: "won", scope: "2026", qualitative: "The panel also won the presidency" },
  ],
  tools: ["TODO_CONFIRM"],
  permission: { clientNamePublic: false, figuresPublic: false },
  confirmed: false,
  updated: "2026-10-10",
  serviceSlugs: ["election-campaign-marketing"],
  postSlug: "campaign-manifesto-strategy-association-elections",
  icon: "bank",
};
