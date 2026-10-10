/**
 * Single source for which URL targets which keyword.
 * Rules (enforced by `npm run seo:audit`):
 *  - one primary keyword per URL; no primary keyword may be used by two URLs
 *  - every live/noindex page and every post/guide file needs an entry
 * Tiers: 1 = money pages (service + location intent), 2 = informational topical authority, 3 = entity.
 */
export type Intent = "informational" | "commercial" | "transactional" | "navigational";
export type Status = "live" | "noindex" | "draft" | "planned";
export type Kind = "page" | "service" | "guide" | "post" | "case";

export type KeywordEntry = {
  url: string;
  kind: Kind;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: Intent;
  tier: 1 | 2 | 3;
  status: Status;
  /** Static pages take title/description from here (title < 60, description < 155). */
  title?: string;
  description?: string;
  /** For posts: the guide slug this post is a cluster of. */
  pillar?: string;
};

const e = (x: KeywordEntry): KeywordEntry => x;

/** Cluster post helper: url is /blog/<slug>/ */
const post = (slug: string, primaryKeyword: string, pillar: string, status: Status, secondary: string[] = [], intent: Intent = "informational"): KeywordEntry =>
  e({ url: `/blog/${slug}/`, kind: "post", primaryKeyword, secondaryKeywords: secondary, searchIntent: intent, tier: 2, status, pillar });

export const KEYWORD_MAP: KeywordEntry[] = [
  // ---- Core pages
  e({ url: "/", kind: "page", primaryKeyword: "ai marketing consultant india", secondaryKeywords: ["adithya reddy growth marketing", "adithya reddy ai", "ai growth marketing consultant"], searchIntent: "commercial", tier: 1, status: "live",
    title: "AI Marketing Consultant India | Adithya Reddy",
    description: "Adithya Reddy is an AI growth marketing consultant in Hyderabad. Lead generation, Meta ads, analytics and LLM automation for Indian businesses." }),
  e({ url: "/about/", kind: "page", primaryKeyword: "adithya reddy", secondaryKeywords: ["adithya reddy hyderabad", "adithya reddy marketing", "growth marketer and ai automation consultant"], searchIntent: "navigational", tier: 3, status: "live",
    title: "About Adithya Reddy | AI Growth Marketing, Hyderabad",
    description: "Adithya Reddy is a growth and performance marketer in Hyderabad, India, combining paid media, analytics and LLM automation." }),
  e({ url: "/services/", kind: "page", primaryKeyword: "marketing automation consultant india", secondaryKeywords: ["performance marketing consultant india", "ai marketing services india"], searchIntent: "commercial", tier: 1, status: "live",
    title: "Marketing Automation Consultant India | Adithya",
    description: "Lead generation, Meta ads, analytics and LLM automation services from a Hyderabad-based consultant. Explore all six services." }),
  e({ url: "/hyderabad-growth-marketing-consultant/", kind: "page", primaryKeyword: "growth marketing consultant hyderabad", secondaryKeywords: ["marketing consultant hyderabad", "digital marketing consultant telangana"], searchIntent: "commercial", tier: 1, status: "live",
    title: "Growth Marketing Consultant in Hyderabad | Adithya",
    description: "Work with a Hyderabad-based growth marketing consultant: lead generation, Meta ads, analytics and AI automation for Telangana and India." }),
  e({ url: "/case-studies/", kind: "page", primaryKeyword: "marketing case studies india", secondaryKeywords: ["admissions marketing case study", "meta ads case study"], searchIntent: "informational", tier: 2, status: "live",
    title: "Marketing Case Studies India | Adithya Reddy",
    description: "Admissions, election, lead generation and analytics work by Adithya Reddy, a growth marketer and AI automation consultant in Hyderabad." }),
  e({ url: "/resources/", kind: "page", primaryKeyword: "marketing tools and resources", secondaryKeywords: ["free marketing tools india"], searchIntent: "informational", tier: 2, status: "live",
    title: "Marketing Resources and Tools | Adithya Reddy",
    description: "A free lead cost calculator, the tools I use for marketing analytics and automation, and articles on lead generation and Meta ads." }),
  e({ url: "/resources/lead-cost-calculator/", kind: "page", primaryKeyword: "lead cost calculator", secondaryKeywords: ["cost per lead calculator", "cost per customer calculator"], searchIntent: "transactional", tier: 2, status: "live",
    title: "Lead Cost Calculator | Cost per Lead and Customer",
    description: "Work out your cost per lead and cost per customer from ad spend, leads and conversions. A free calculator by a Hyderabad marketer." }),
  e({ url: "/contact/", kind: "page", primaryKeyword: "book marketing consultation hyderabad", secondaryKeywords: ["contact adithya reddy"], searchIntent: "transactional", tier: 1, status: "live",
    title: "Book a Marketing Consultation | Adithya Reddy",
    description: "Book a call with Adithya Reddy, a growth marketer in Hyderabad, India, to discuss lead generation, Meta ads or LLM automation." }),
  e({ url: "/blog/", kind: "page", primaryKeyword: "marketing automation blog", secondaryKeywords: ["ai marketing blog india"], searchIntent: "informational", tier: 2, status: "live",
    title: "Marketing Blog: Lead Gen, Meta Ads, AI | Adithya",
    description: "Practical articles on lead generation, Meta ads, marketing analytics and LLM automation, from a Hyderabad-based marketer." }),
  e({ url: "/guides/", kind: "page", primaryKeyword: "ai marketing guides", secondaryKeywords: ["marketing automation guides"], searchIntent: "informational", tier: 2, status: "planned",
    title: "Marketing and AI Guides | Adithya Reddy",
    description: "In-depth guides on AI marketing automation, lead generation, Meta ads, analytics and business automation, with frameworks and templates." }),

  // ---- Service landing pages (Tier 1)
  e({ url: "/services/ai-lead-generation/", kind: "service", primaryKeyword: "ai lead generation consultant", secondaryKeywords: ["lead generation consultant india", "lead scoring consultant"], searchIntent: "commercial", tier: 1, status: "live" }),
  e({ url: "/services/meta-ads-performance-marketing/", kind: "service", primaryKeyword: "meta ads expert hyderabad", secondaryKeywords: ["performance marketing consultant india", "meta ads consultant india"], searchIntent: "commercial", tier: 1, status: "live" }),
  e({ url: "/services/admissions-marketing/", kind: "service", primaryKeyword: "admissions marketing consultant", secondaryKeywords: ["college admissions marketing india", "education marketing consultant"], searchIntent: "commercial", tier: 1, status: "live" }),
  e({ url: "/services/election-campaign-marketing/", kind: "service", primaryKeyword: "election campaign marketing consultant india", secondaryKeywords: ["election campaign digital marketing", "voter outreach consultant"], searchIntent: "commercial", tier: 1, status: "live" }),
  e({ url: "/services/marketing-analytics-power-bi/", kind: "service", primaryKeyword: "power bi marketing dashboard consultant", secondaryKeywords: ["marketing analytics consultant india", "power bi dashboard for marketing"], searchIntent: "commercial", tier: 1, status: "live" }),
  e({ url: "/services/llm-reporting-automation/", kind: "service", primaryKeyword: "llm reporting automation", secondaryKeywords: ["automate marketing reports", "business automation with ai"], searchIntent: "commercial", tier: 1, status: "live" }),

  // ---- Case studies (noindex until confirmed)
  e({ url: "/case-studies/private-university-admissions/", kind: "case", primaryKeyword: "university admissions marketing case study", secondaryKeywords: [], searchIntent: "informational", tier: 2, status: "noindex" }),
  e({ url: "/case-studies/city-association-election/", kind: "case", primaryKeyword: "association election campaign case study", secondaryKeywords: [], searchIntent: "informational", tier: 2, status: "noindex" }),
  e({ url: "/case-studies/ai-services-company/", kind: "case", primaryKeyword: "lead generation and reporting automation case study", secondaryKeywords: [], searchIntent: "informational", tier: 2, status: "noindex" }),
  e({ url: "/case-studies/design-studio/", kind: "case", primaryKeyword: "meta ads ab testing case study", secondaryKeywords: [], searchIntent: "informational", tier: 2, status: "noindex" }),

  // ---- Pillar guides (Tier 2, with Tier 1 overlap for business automation)
  e({ url: "/guides/ai-marketing-automation/", kind: "guide", primaryKeyword: "ai marketing automation", secondaryKeywords: ["marketing automation with ai", "llm marketing automation"], searchIntent: "informational", tier: 2, status: "draft" }),
  e({ url: "/guides/lead-generation-with-ai/", kind: "guide", primaryKeyword: "lead generation with ai", secondaryKeywords: ["ai lead generation", "automated lead generation"], searchIntent: "informational", tier: 2, status: "draft" }),
  e({ url: "/guides/meta-ads-performance-marketing/", kind: "guide", primaryKeyword: "meta ads performance marketing", secondaryKeywords: ["meta ads strategy", "facebook ads for lead generation"], searchIntent: "informational", tier: 2, status: "draft" }),
  e({ url: "/guides/marketing-analytics-power-bi/", kind: "guide", primaryKeyword: "marketing analytics power bi", secondaryKeywords: ["power bi for marketing", "marketing dashboard"], searchIntent: "informational", tier: 2, status: "draft" }),
  e({ url: "/guides/business-automation-with-ai/", kind: "guide", primaryKeyword: "business automation with ai", secondaryKeywords: ["ai automation for business", "automate business processes"], searchIntent: "informational", tier: 1, status: "draft" }),
  e({ url: "/guides/admissions-marketing/", kind: "guide", primaryKeyword: "admissions marketing strategy", secondaryKeywords: ["college admissions marketing", "enrollment marketing"], searchIntent: "informational", tier: 2, status: "draft" }),
  e({ url: "/guides/election-campaign-marketing/", kind: "guide", primaryKeyword: "election campaign marketing strategy", secondaryKeywords: ["election campaign planning", "voter outreach strategy"], searchIntent: "informational", tier: 2, status: "draft" }),

  // ---- Posts: live
  post("segmented-scored-lead-pipeline", "lead scoring pipeline", "lead-generation-with-ai", "live", ["lead segmentation", "lead qualification"]),
  post("meta-ads-ab-testing-cost-per-lead", "meta ads a/b testing", "meta-ads-performance-marketing", "live", ["reduce cost per lead"]),
  post("llm-automation-client-reports", "automate marketing reports with llm", "ai-marketing-automation", "live", ["langchain marketing", "claude api reporting"]),
  // ---- Posts: drafts written from case studies
  post("building-a-segmented-scored-lead-pipeline", "build a lead scoring pipeline", "lead-generation-with-ai", "draft", ["deduplicate leads", "lead data cleaning"]),
  post("structured-meta-ab-testing-cut-cost-per-lead", "meta ads ab testing method", "meta-ads-performance-marketing", "draft", ["statistical significance ads"]),
  post("automating-client-reports-with-llms", "automate client reports with llm", "ai-marketing-automation", "draft", ["llm report automation"]),
  post("admissions-marketing-funnel-enquiry-to-enrollment", "admissions marketing funnel", "admissions-marketing", "draft", ["enquiry to enrollment"]),
  post("campaign-manifesto-strategy-association-elections", "association election campaign strategy", "election-campaign-marketing", "draft", ["manifesto writing"]),

  // ---- Posts: planned clusters (to be written from real experience; not mass-produced)
  post("automate-content-creation-with-llms", "automate content creation with llms", "ai-marketing-automation", "planned"),
  post("langchain-for-marketing-teams", "langchain for marketing teams", "ai-marketing-automation", "planned"),
  post("claude-api-for-marketing-automation", "claude api for marketing automation", "ai-marketing-automation", "planned"),
  post("ai-agents-for-lead-follow-up", "ai agents for lead follow up", "ai-marketing-automation", "planned"),
  post("prompt-templates-for-marketing-reports", "prompt templates for marketing reports", "ai-marketing-automation", "planned"),
  post("human-review-for-llm-marketing-output", "human review for llm marketing output", "ai-marketing-automation", "planned"),

  post("lead-segmentation-examples", "lead segmentation examples", "lead-generation-with-ai", "planned"),
  post("deduplicate-leads-in-python", "deduplicate leads in python", "lead-generation-with-ai", "planned"),
  post("cost-per-lead-benchmarks-india", "cost per lead benchmarks india", "lead-generation-with-ai", "planned"),
  post("enquiry-to-customer-funnel", "enquiry to customer funnel", "lead-generation-with-ai", "planned"),
  post("lead-qualification-questions", "lead qualification questions", "lead-generation-with-ai", "planned"),

  post("statistical-significance-for-ad-tests", "statistical significance for ad tests", "meta-ads-performance-marketing", "planned"),
  post("meta-ads-creative-testing-framework", "meta ads creative testing framework", "meta-ads-performance-marketing", "planned"),
  post("meta-ads-attribution-basics", "meta ads attribution basics", "meta-ads-performance-marketing", "planned"),
  post("meta-lead-form-optimization", "meta lead form optimization", "meta-ads-performance-marketing", "planned"),
  post("meta-ads-test-log-template", "meta ads test log template", "meta-ads-performance-marketing", "planned"),

  post("marketing-kpi-framework", "marketing kpi framework", "marketing-analytics-power-bi", "planned"),
  post("cpl-ctr-roas-dashboard", "cpl ctr roas dashboard", "marketing-analytics-power-bi", "planned"),
  post("dax-measures-for-marketers", "dax measures for marketers", "marketing-analytics-power-bi", "planned"),
  post("power-bi-data-model-for-marketing", "power bi data model for marketing", "marketing-analytics-power-bi", "planned"),
  post("weekly-marketing-report-template", "weekly marketing report template", "marketing-analytics-power-bi", "planned"),

  post("ai-automation-for-small-businesses", "ai automation for small businesses", "business-automation-with-ai", "planned"),
  post("reporting-automation-for-small-teams", "reporting automation for small teams", "business-automation-with-ai", "planned"),
  post("workflow-audit-for-automation", "workflow audit for automation", "business-automation-with-ai", "planned"),
  post("build-vs-buy-ai-automation", "build vs buy ai automation", "business-automation-with-ai", "planned"),
  post("automation-mistakes-to-avoid", "automation mistakes to avoid", "business-automation-with-ai", "planned"),

  post("college-enquiry-follow-up", "college enquiry follow up", "admissions-marketing", "planned"),
  post("admissions-lead-scoring", "admissions lead scoring", "admissions-marketing", "planned"),
  post("education-digital-marketing-india", "education digital marketing india", "admissions-marketing", "planned"),
  post("online-and-offline-admissions-outreach", "online and offline admissions outreach", "admissions-marketing", "planned"),
  post("counsellor-follow-up-process", "counsellor follow up process", "admissions-marketing", "planned"),

  post("manifesto-writing-guide", "manifesto writing guide", "election-campaign-marketing", "planned"),
  post("election-campaign-data-tracking", "election campaign data tracking", "election-campaign-marketing", "planned"),
  post("election-campaign-compliance-checklist-india", "election campaign compliance checklist india", "election-campaign-marketing", "planned"),
  post("campaign-daily-review-process", "campaign daily review process", "election-campaign-marketing", "planned"),
];

export const normKeyword = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
export const entryFor = (url: string) => KEYWORD_MAP.find((x) => x.url === url);
export const clustersOf = (pillar: string) => KEYWORD_MAP.filter((x) => x.kind === "post" && x.pillar === pillar);
export const PILLARS = KEYWORD_MAP.filter((x) => x.kind === "guide");
