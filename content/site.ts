/**
 * Single source for the real figures shown on the site.
 * Supplied by Adithya. Do not add numbers here that are not his verified results.
 * Anything illustrative or sample must be labelled as such where it is displayed.
 */
export const STATS = {
  qualifiedLeads: { value: 3000, suffix: "+", label: "Qualified Leads" },
  conversionLift: { value: 30, suffix: "%", label: "Conversion Lift" },
  lowerCostPerLead: { value: 20, suffix: "%", label: "Lower Cost per Lead" },
  revenueFacilitated: { text: "INR 1.4 Cr+", label: "Revenue Facilitated" },
  studentsAdmitted: { value: 350, suffix: "+", label: "students admitted" },
  seatsWon: { text: "29/29", label: "seats won" },
} as const;

export const TOOLS = [
  { name: "Meta Ads", mark: "M", color: "#0866FF" },
  { name: "Power BI", mark: "P", color: "#E8B800" },
  { name: "Python", mark: "Py", color: "#3776AB" },
  { name: "SQL", mark: "SQL", color: "#0F766E" },
  { name: "LangChain", mark: "LC", color: "#1C7C6B" },
  { name: "Claude API", mark: "C", color: "#D97757" },
  { name: "Excel", mark: "X", color: "#217346" },
  { name: "Pandas", mark: "Pd", color: "#4C3FA0" },
] as const;

export const HERO = {
  eyebrow: "Turn enquiries into revenue",
  subtext:
    "Lead generation, performance marketing, analytics and LLM automation that drive real revenue. Based in Hyderabad, working with clients across India.",
  trust: ["Data-driven strategy", "Results-focused execution", "Transparent reporting"],
};
