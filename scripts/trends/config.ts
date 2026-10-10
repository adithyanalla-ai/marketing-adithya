import type { Geo, Window } from "./types";

export const SEEDS = [
  "growth marketing",
  "lead generation",
  "AI marketing automation",
  "Meta ads",
  "performance marketing",
  "Power BI dashboards",
  "LLM automation",
  "LangChain",
  "Claude API",
  "admissions marketing",
  "election campaign marketing",
  "marketing analytics",
];

export const GEOS: Geo[] = ["IN", "WW"];
export const WINDOWS: Window[] = ["7d", "90d"];

/** Services Adithya offers. Used for relevance scoring and to pick the internal link / category. */
export const SERVICE_MAP = [
  { slug: "ai-lead-generation", name: "AI Lead Generation", category: "Lead Generation",
    keywords: ["lead", "leads", "scoring", "crm", "funnel", "pipeline", "qualification", "segmentation", "b2b"] },
  { slug: "meta-ads-performance-marketing", name: "Meta Ads & Performance Marketing", category: "Paid Media",
    keywords: ["meta", "facebook", "instagram", "ads", "ad", "cpl", "cpc", "roas", "creative", "a/b", "performance", "campaign"] },
  { slug: "admissions-marketing", name: "Admissions Marketing", category: "Education Marketing",
    keywords: ["admission", "admissions", "college", "school", "university", "enrollment", "student", "education"] },
  { slug: "election-campaign-marketing", name: "Election Campaign Marketing", category: "Political Marketing",
    keywords: ["election", "campaign", "voter", "political", "constituency", "outreach"] },
  { slug: "marketing-analytics-power-bi", name: "Marketing Analytics & Power BI", category: "Analytics",
    keywords: ["power", "bi", "dashboard", "dashboards", "analytics", "reporting", "kpi", "attribution", "ga4", "data"] },
  { slug: "llm-reporting-automation", name: "LLM Reporting Automation", category: "AI Automation",
    keywords: ["llm", "langchain", "claude", "ai", "automation", "agent", "agents", "gpt", "rag", "prompt", "openai"] },
];

/** Navigational / off-topic queries that should never become posts. */
export const BLOCKLIST = [
  "login", "log in", "sign in", "download", "free download", "jobs", "job", "salary", "internship", "near me",
  "meaning", "pdf", "wikipedia", "reddit", "whatsapp", "stock", "share price", "customer care", "phone number",
  "manager login", "ads library",
];

export const WEIGHTS = { velocity: 0.35, interest: 0.2, relevance: 0.3, novelty: 0.15 };
export const MAX_OVERLAP = 0.8; // drop topics that nearly duplicate an existing post
export const GEO_WEIGHT: Record<Geo, number> = { IN: 1, WW: 0.85 };
export const WINDOW_WEIGHT: Record<Window, number> = { "7d": 1, "90d": 0.6 };

export const TOP_N = 10;
export const DRAFTS_PER_RUN = 3;
export const REQUEST_DELAY_MS = 600;
export const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-5-5";
