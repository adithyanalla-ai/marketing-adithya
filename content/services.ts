import type { IconName } from "@/components/ui/iconMap";
import type { Badge } from "@/components/ui/FeatureCard";
import type { StatRow } from "@/components/ui/StatCard";

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  icon: IconName;
  badge?: Badge;
  /** Used in "Learn more about {label}". */
  label: string;
  cardText: string;
  h1: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  whatItIs: string[];
  audience: string[];
  deliverables: string[];
  how: { icon: IconName; title: string; text: string }[];
  /** Real figures only (from content/site.ts STATS). */
  stats: StatRow[];
  postSlug?: string;
  tools: string[];
  faqs: Faq[];
  relatedTags: string[];
  relatedServices: string[];
};

const base = "Based in Hyderabad, Telangana, I work with teams across India.";

export const SERVICES: Service[] = [
  {
    slug: "ai-lead-generation",
    name: "AI Lead Generation",
    icon: "users",
    badge: "Popular",
    label: "AI lead generation",
    cardText: "Segmented, scored lead pipelines that route the right enquiries to sales faster. Lead generation consulting from Hyderabad, serving India.",
    h1: "AI-Assisted Lead Generation in Hyderabad and across India",
    eyebrow: "Service · Lead generation",
    metaTitle: "AI Lead Generation Services | Adithya Reddy",
    metaDescription: "Segmented, scored lead pipelines that route the right enquiries to sales faster. Lead generation consulting from Hyderabad, serving India.",
    intro: `I build lead pipelines where every enquiry is segmented, scored and routed, so sales spends time on the people most likely to convert. ${base}`,
    whatItIs: [
      "A lead pipeline that does more than collect form fills. Each enquiry is grouped by who they are (segment), ranked by how ready they are to buy (score), and sent to the right person with the right follow-up.",
      "Automation and AI handle the repetitive parts, such as enrichment, routing and reminders, while your sales team keeps the conversations.",
    ],
    audience: ["Businesses getting enquiries but slow or uneven follow-up", "Sales teams that cannot tell which leads to call first", "Education, services and B2B teams running paid campaigns in India"],
    deliverables: ["Lead segments built from your own customer data", "A transparent scoring model agreed with sales", "Routing and follow-up workflow into your CRM or sheet", "A weekly pipeline report by source, score and stage"],
    how: [
      { icon: "target", title: "Audit and segment", text: "Map your sources, forms and CRM stages, then define the segments that matter." },
      { icon: "layers", title: "Score and route", text: "Build a fit-and-intent score and route each band to the right follow-up." },
      { icon: "gear", title: "Automate and review", text: "Automate the repeatable steps and check scores against real outcomes." },
    ],
    stats: [
      { icon: "users", value: "3,000+", label: "Qualified leads" },
      { icon: "trend", value: "30%", label: "Conversion lift" },
    ],
    postSlug: "segmented-scored-lead-pipeline",
    tools: ["Meta Ads", "Excel", "SQL", "Python"],
    faqs: [
      { q: "What is lead scoring?", a: "Lead scoring assigns points to each enquiry based on how well it fits your ideal customer and how strongly it shows intent, so the team can prioritise follow-up." },
      { q: "How is segmentation different from scoring?", a: "Segmentation groups leads by what they are, such as sector, size or location. Scoring ranks them by how likely they are to buy soon. Segments choose the message; scores choose the speed." },
      { q: "Do I need a CRM first?", a: "A CRM or even a well-structured spreadsheet is enough to start. The scoring logic matters more than the tool." },
      { q: "How long before I see results?", a: "It depends on your starting point, lead volume and sales process. We agree what to measure on the first call and review it regularly." },
      { q: "Do you work with businesses outside Hyderabad?", a: "Yes. I am based in Hyderabad, Telangana and work with teams across India and remotely." },
    ],
    relatedTags: ["lead generation", "lead scoring", "ai marketing"],
    relatedServices: ["meta-ads-performance-marketing", "marketing-analytics-power-bi", "llm-reporting-automation"],
  },
  {
    slug: "meta-ads-performance-marketing",
    name: "Meta Ads & Performance Marketing",
    icon: "megaphone",
    label: "Meta ads & performance",
    cardText: "Structured Meta ads A/B testing and performance marketing to lower cost per lead. Hyderabad-based, working with businesses across India.",
    h1: "Meta Ads and Performance Marketing That Lowers Cost per Lead",
    eyebrow: "Service · Paid media",
    metaTitle: "Meta Ads & Performance Marketing | Adithya Reddy",
    metaDescription: "Structured Meta ads A/B testing and performance marketing to lower cost per lead. Hyderabad-based, working with businesses across India.",
    intro: `Disciplined creative and audience testing on Meta, measured on cost per lead and lead quality rather than clicks. ${base}`,
    whatItIs: [
      "Performance marketing where every change is a test with a hypothesis, a single variable and a success metric decided in advance.",
      "The goal is steady, explainable improvement in cost per lead, with a written test log so each test builds on the last.",
    ],
    audience: ["Businesses spending on Meta ads without a clear testing process", "Teams whose cost per lead has stopped improving", "Education and local-services advertisers across India"],
    deliverables: ["Account and campaign structure built for clean testing", "A/B test plan: one variable per test, clear success metric", "Creative and audience iteration cadence", "Reporting on cost per lead and downstream lead quality"],
    how: [
      { icon: "barchart", title: "Baseline", text: "Record current cost per lead, volume and lead quality before changing anything." },
      { icon: "target", title: "Test one variable", text: "Run controlled A/B tests on offer, creative, audience or form." },
      { icon: "trend", title: "Scale winners", text: "Move budget to variants that win on cost per lead and quality, then test again." },
    ],
    stats: [
      { icon: "tag", value: "20%", label: "Lower cost per lead" },
      { icon: "barchart", value: "15+", label: "A/B tests across 10+ clients" },
    ],
    postSlug: "meta-ads-ab-testing-cost-per-lead",
    tools: ["Meta Ads", "Excel", "Power BI"],
    faqs: [
      { q: "How do you run an A/B test on Meta ads?", a: "Change one variable at a time, split budget evenly, run until each variant has enough results, and judge on cost per lead and lead quality." },
      { q: "Which metric matters most?", a: "Cost per qualified lead. Cheap leads that never convert are not a win." },
      { q: "What should we test first?", a: "Usually the offer and the opening line of the ad, then creative format, audience and the lead form." },
      { q: "Can you test on a small budget?", a: "Yes, with fewer tests, larger differences between variants and enough time for each to collect results." },
      { q: "Do you run ads for Indian businesses?", a: "Yes, I work with businesses in Hyderabad, Telangana and across India." },
    ],
    relatedTags: ["meta ads", "performance marketing", "a/b testing"],
    relatedServices: ["ai-lead-generation", "marketing-analytics-power-bi", "admissions-marketing"],
  },
  {
    slug: "admissions-marketing",
    name: "Admissions Marketing",
    icon: "graduation",
    label: "admissions marketing",
    cardText: "Enquiry-to-admission marketing for education institutions: campaigns, lead tracking and follow-up. Based in Hyderabad, Telangana.",
    h1: "Admissions Marketing for Colleges and Schools in India",
    eyebrow: "Service · Education marketing",
    metaTitle: "Admissions Marketing Services | Adithya Reddy",
    metaDescription: "Enquiry-to-admission marketing for education institutions: campaigns, lead tracking and follow-up. Based in Hyderabad, Telangana.",
    intro: `Campaigns and follow-up systems that turn admission enquiries into applications, tracked from first click to enrolment. ${base}`,
    whatItIs: [
      "Marketing built around the admissions calendar: campaigns that bring in enquiries, tracking that shows where each one came from, and a follow-up routine that helps counsellors reach the right students first.",
      "Reporting is by programme and channel, so you can see what is working before the next intake.",
    ],
    audience: ["Universities, colleges and schools running seasonal admission drives", "Admissions teams with many enquiries and limited counsellor time", "Institutions that cannot see which channels produce enrolments"],
    deliverables: ["Seasonal admission campaign plan across paid and organic channels", "Enquiry tracking from ad to application", "Counsellor follow-up workflow", "Dashboard of enquiries, applications and cost per application"],
    how: [
      { icon: "calendar", title: "Plan the intake", text: "Align programmes, deadlines and target student segments." },
      { icon: "megaphone", title: "Run and track", text: "Launch campaigns with landing pages and tracked enquiry forms." },
      { icon: "users", title: "Follow up", text: "Route enquiries to counsellors with timely reminders, then report by programme." },
    ],
    stats: [{ icon: "graduation", value: "350+", label: "Students admitted" }],
    tools: ["Meta Ads", "Excel", "Power BI"],
    faqs: [
      { q: "When should admission campaigns start?", a: "Well before application deadlines, so there is time to test and improve. Exact timing depends on your intake calendar." },
      { q: "Can you track enquiries through to enrolment?", a: "Yes, if enquiries and outcomes are recorded in a shared sheet or CRM, we can report on the full path." },
      { q: "Do you work with schools as well as colleges?", a: "Yes. The approach is the same: plan around the calendar, track every enquiry and follow up quickly." },
      { q: "Which channels do you use?", a: "That depends on the institution and audience. Paid social such as Meta, search and organic channels are all common starting points." },
    ],
    relatedTags: ["admissions marketing", "lead generation"],
    relatedServices: ["ai-lead-generation", "meta-ads-performance-marketing", "marketing-analytics-power-bi"],
  },
  {
    slug: "election-campaign-marketing",
    name: "Election Campaign Marketing",
    icon: "bank",
    label: "election marketing",
    cardText: "Digital outreach, message testing and reporting for election campaigns. Data-driven strategies to increase voter engagement and support.",
    h1: "Election Campaign Marketing and Voter Outreach in India",
    eyebrow: "Service · Campaign marketing",
    metaTitle: "Election Campaign Marketing | Adithya Reddy",
    metaDescription: "Digital outreach, message testing and reporting for election campaigns in Telangana and across India, with a data-led approach.",
    intro: `Digital outreach, message testing and ground-level reporting for campaigns, planned to follow election commission and platform rules. ${base}`,
    whatItIs: [
      "Campaign marketing that treats outreach as something to measure: which messages land, which areas respond, and where follow-up is needed.",
      "All work is planned around Election Commission of India guidelines and platform political-ad policies.",
    ],
    audience: ["Candidates and associations running elections in India", "Campaign teams that need clear reporting for daily decisions", "Organisations that want supporter and volunteer lead capture"],
    deliverables: ["Digital outreach plan by area", "Message and creative testing", "Supporter and volunteer lead capture, with consent", "Daily and weekly reporting for the campaign team"],
    how: [
      { icon: "target", title: "Understand the electorate", text: "Map areas, issues and the channels available to you." },
      { icon: "megaphone", title: "Reach and test", text: "Run compliant outreach and test which messages get a response." },
      { icon: "barchart", title: "Capture and report", text: "Collect supporter details with consent and report what is working." },
    ],
    stats: [{ icon: "bank", value: "29/29", label: "Seats won" }],
    tools: ["Meta Ads", "Excel", "Power BI"],
    faqs: [
      { q: "Do you follow election rules?", a: "Campaign work must comply with Election Commission of India guidelines and platform political-ad policies. Compliance is part of planning." },
      { q: "Do you work in Telangana?", a: "I am based in Hyderabad, Telangana, and can work with campaigns across India." },
      { q: "What does reporting look like?", a: "Short daily and weekly summaries of reach, response and follow-up status, so the team can decide quickly." },
      { q: "Is supporter data collected with consent?", a: "Yes. Capture forms state clearly how details will be used." },
    ],
    relatedTags: ["election campaign marketing", "marketing analytics"],
    relatedServices: ["marketing-analytics-power-bi", "meta-ads-performance-marketing", "ai-lead-generation"],
  },
  {
    slug: "marketing-analytics-power-bi",
    name: "Marketing Analytics & Power BI",
    icon: "barchart",
    badge: "High Impact",
    label: "marketing analytics",
    cardText: "Power BI dashboards that connect ad spend, leads and revenue. Clear insights to make better marketing decisions.",
    h1: "Marketing Analytics and Power BI Dashboards",
    eyebrow: "Service · Analytics",
    metaTitle: "Marketing Analytics & Power BI | Adithya Reddy",
    metaDescription: "Power BI dashboards that connect ad spend, leads and revenue so marketing decisions rest on one view. Hyderabad-based, serving India.",
    intro: `One reliable view of spend, leads and outcomes, so the team stops arguing about whose spreadsheet is right. ${base}`,
    whatItIs: [
      "A data model and set of dashboards that join ad platforms, forms and your CRM, with each metric defined in plain language.",
      "The aim is decisions: which campaigns to scale, which to stop, and where leads are getting stuck.",
    ],
    audience: ["Teams reporting from several disconnected spreadsheets", "Founders who want one view of spend, leads and revenue", "Agencies that need consistent client dashboards"],
    deliverables: ["Data model joining ad platforms, forms and CRM", "Power BI dashboards for spend, leads, cost per lead and conversion", "Metric definitions documented in plain language", "Scheduled refresh and a handover walkthrough"],
    how: [
      { icon: "target", title: "Define the questions", text: "Agree what the dashboard must answer and how each metric is calculated." },
      { icon: "layers", title: "Connect the data", text: "Bring ad platforms, forms and CRM into one model." },
      { icon: "barchart", title: "Build and hand over", text: "Create clear dashboards, document them and train your team." },
    ],
    stats: [{ icon: "barchart", value: "15+", label: "KPIs tracked" }],
    tools: ["Power BI", "SQL", "Excel", "Python", "Pandas"],
    faqs: [
      { q: "Why Power BI?", a: "It connects to many marketing data sources, models data well and is widely used in Indian organisations." },
      { q: "Can dashboards update automatically?", a: "Yes, with scheduled refresh once data sources are connected." },
      { q: "Which KPIs should we track?", a: "Start with spend, leads, cost per lead and conversion by source, then add what your team actually acts on." },
      { q: "Can you work with data in spreadsheets?", a: "Yes. Spreadsheets, databases and ad platform exports can all feed the model." },
    ],
    relatedTags: ["power bi", "marketing analytics"],
    relatedServices: ["llm-reporting-automation", "ai-lead-generation", "meta-ads-performance-marketing"],
  },
  {
    slug: "llm-reporting-automation",
    name: "LLM Reporting Automation",
    icon: "doc",
    label: "LLM automation",
    cardText: "Automate client marketing reports with LLMs: faster insights, summaries and recommendations to save time and improve decision-making.",
    h1: "LLM Reporting Automation for Marketing Teams",
    eyebrow: "Service · AI automation",
    metaTitle: "LLM Reporting Automation | Adithya Reddy",
    metaDescription: "Automate client marketing reports with LLMs: from three days to four hours. Built with LangChain and the Claude API by a Hyderabad marketer.",
    intro: `Automated, reviewed reporting where LLMs draft the narrative from your numbers and a person approves it. ${base}`,
    whatItIs: [
      "A reporting workflow that pulls your data, builds the tables and drafts the commentary with an LLM, then checks the figures before a person reviews and sends it.",
      "The model only ever sees data you supply, and every number in the text is verified against the source.",
    ],
    audience: ["Agencies and in-house teams spending days on monthly reports", "Teams that want consistent commentary across clients", "Anyone who wants to try LLMs in marketing without losing control of accuracy"],
    deliverables: ["Automated data pull and report template", "LLM-drafted commentary grounded in the numbers", "A human review step before delivery", "Documented workflow your team can maintain"],
    how: [
      { icon: "layers", title: "Map the report", text: "List every section the client reads and the numbers behind each." },
      { icon: "sparkle", title: "Automate the draft", text: "Pull data and draft commentary with LangChain or the Claude API." },
      { icon: "check", title: "Verify and deliver", text: "Check figures against the source, review, then send on schedule." },
    ],
    stats: [
      { icon: "clock", value: "3 days → 4 hours", label: "Client report delivery" },
      { icon: "bolt", value: "20+ hours", label: "Saved per week" },
    ],
    postSlug: "llm-automation-client-reports",
    tools: ["LangChain", "Claude API", "Python", "Pandas", "Power BI"],
    faqs: [
      { q: "Can an LLM write accurate marketing reports?", a: "It can draft commentary from supplied data, but figures must be checked against the source. A review step is built into the workflow." },
      { q: "Which tools do you use?", a: "LangChain and the Claude API, combined with your existing data sources and Power BI where useful." },
      { q: "Do clients need to know reports are automated?", a: "Being open about it builds trust. What matters is that a person reviews and stands behind the final report." },
      { q: "Is my data sent to an AI provider?", a: "Only the figures needed for the commentary are sent. We agree what is shared before anything is built." },
    ],
    relatedTags: ["llm automation", "langchain", "claude api", "reporting"],
    relatedServices: ["marketing-analytics-power-bi", "ai-lead-generation", "meta-ads-performance-marketing"],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
