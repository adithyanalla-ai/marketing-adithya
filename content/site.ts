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

export const MORE_STATS = {
  hoursSaved: { value: "20+", label: "hours saved per week" },
  kpis: { value: "15+", label: "KPIs tracked" },
  abTests: { value: "15+", label: "A/B tests across 10+ clients" },
  reportDelivery: { value: "3 days → 4 hours", label: "Client report delivery with LLM automation" },
} as const;

export const ABOUT = {
  eyebrow: "Growth marketer & AI automation consultant",
  bio:
    "I am a growth and performance marketer based in Hyderabad, Telangana. I work across lead generation, Meta ads, marketing analytics in Power BI, and LLM automation with LangChain and the Claude API.",
  areas: [
    { icon: "users", title: "Segmented and scored lead pipelines", text: "I build segmented and scored lead pipelines that help route the right enquiries to sales faster and improve conversion rates." },
    { icon: "barchart", title: "Meta ads A/B testing", text: "I run and optimise Meta ads with structured A/B testing, which has reduced cost per lead by 20% for clients." },
    { icon: "doc", title: "LLM-based reporting automation", text: "I automate client marketing reports using LLMs, which has cut report delivery time from 3 days to 4 hours." },
  ],
  approach: [
    { icon: "target", title: "Strategy First", text: "Understand your goals, audience and growth opportunities." },
    { icon: "barchart", title: "Data-Driven Execution", text: "Use analytics and A/B testing to make better marketing decisions." },
    { icon: "gear", title: "Automation for Scale", text: "Leverage AI and automation to save time and improve results." },
  ],
  education: { degree: "B.Tech, Data Science", school: "KL University", grade: "8.1 CGPA" },
  credentials: [{ title: "Python for Data Science", issuer: "HackerRank", note: "Verified certificate" }],
  /** Titles and links to be added by Adithya. */
  research: [
    { title: "Peer-reviewed machine learning paper", venue: "Peer-reviewed" },
    { title: "Two SSRN papers", venue: "SSRN" },
  ],
  languages: ["English", "Telugu", "Hindi"],
};
export * from "./services";
export * from "./case-studies";
