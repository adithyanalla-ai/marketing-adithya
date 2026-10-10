export type Proof = { title: string; result: string; context: string; postSlug?: string };

export type Service = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Who it is for and what is delivered. No numbers unless from the resume. */
  deliverables: string[];
  process: { step: string; detail: string }[];
  /** Real, resume-backed proof only. Leave empty until Adithya adds a verified case study. */
  proof: Proof[];
  faqs: { q: string; a: string }[];
  /** Blog categories / tags used to link related posts. */
  relatedTags: string[];
};

const hyd = "Based in Hyderabad, Telangana, I work with teams across India.";

export const SERVICES: Service[] = [
  {
    slug: "ai-lead-generation",
    name: "AI Lead Generation",
    h1: "AI-Assisted Lead Generation in Hyderabad and across India",
    metaTitle: "AI Lead Generation Services | Adithya Reddy",
    metaDescription:
      "Segmented, scored lead pipelines that route the right enquiries to sales faster. Lead generation consulting from Hyderabad, serving India.",
    intro: `I build lead pipelines where every enquiry is segmented, scored and routed, so sales spends time on the people most likely to convert. ${hyd}`,
    deliverables: [
      "Lead segmentation model based on your own customer data",
      "Scoring rules (fit and intent) agreed with sales",
      "Routing and follow-up workflow into your CRM",
      "A weekly pipeline report showing source, score and stage",
    ],
    process: [
      { step: "Audit", detail: "Map current sources, forms, CRM stages and where leads go cold." },
      { step: "Segment and score", detail: "Define segments and a transparent scoring model with your sales team." },
      { step: "Automate", detail: "Route, enrich and follow up automatically; keep humans on high-score leads." },
      { step: "Review", detail: "Compare scores with actual outcomes and recalibrate." },
    ],
    proof: [
      {
        title: "Segmented and scored lead pipeline",
        result: "Leads are segmented and scored before reaching sales.",
        context: "Described from Adithya's marketing experience. Add client, period and metrics once cleared for publication.",
        postSlug: "segmented-scored-lead-pipeline",
      },
    ],
    faqs: [
      { q: "What is lead scoring?", a: "Lead scoring assigns points to each enquiry based on how well it fits your ideal customer and how strongly it shows intent, so the team can prioritise follow-up." },
      { q: "Do I need a CRM first?", a: "A CRM or even a well-structured spreadsheet is enough to start. The scoring logic matters more than the tool." },
      { q: "Do you work with businesses outside Hyderabad?", a: "Yes. I am based in Hyderabad, Telangana and work with teams across India and remotely." },
    ],
    relatedTags: ["lead generation", "lead scoring", "ai marketing"],
  },
  {
    slug: "meta-ads-performance-marketing",
    name: "Meta Ads & Performance Marketing",
    h1: "Meta Ads and Performance Marketing That Lowers Cost per Lead",
    metaTitle: "Meta Ads & Performance Marketing | Adithya Reddy",
    metaDescription:
      "Structured Meta ads A/B testing and performance marketing to lower cost per lead. Hyderabad-based, working with businesses across India.",
    intro: `Disciplined creative and audience testing on Meta, measured on cost per lead and lead quality rather than clicks. ${hyd}`,
    deliverables: [
      "Account and campaign structure built for clean testing",
      "A/B test plan with one variable per test and a clear success metric",
      "Creative and audience iteration cadence",
      "Reporting on cost per lead and downstream lead quality",
    ],
    process: [
      { step: "Baseline", detail: "Record current cost per lead, volume and lead quality." },
      { step: "Test", detail: "Run controlled A/B tests on creative, audience and offer." },
      { step: "Scale winners", detail: "Move budget to variants that win on cost per lead and quality." },
      { step: "Report", detail: "Share what was tested, what won and what to test next." },
    ],
    proof: [
      {
        title: "Meta A/B testing",
        result: "Cost per lead reduced by 20% through Meta A/B testing.",
        context: "Result from Adithya's marketing experience.",
        postSlug: "meta-ads-ab-testing-cost-per-lead",
      },
    ],
    faqs: [
      { q: "How do you run an A/B test on Meta ads?", a: "Change one variable at a time, split budget evenly, run until each variant has enough results, and judge on cost per lead and lead quality." },
      { q: "Which metric matters most?", a: "Cost per qualified lead. Cheap leads that never convert are not a win." },
      { q: "Do you run ads for Indian businesses?", a: "Yes, I work with businesses in Hyderabad, Telangana and across India." },
    ],
    relatedTags: ["meta ads", "performance marketing", "a/b testing"],
  },
  {
    slug: "admissions-marketing",
    name: "Admissions Marketing",
    h1: "Admissions Marketing for Colleges and Schools in India",
    metaTitle: "Admissions Marketing Services | Adithya Reddy",
    metaDescription:
      "Enquiry-to-admission marketing for education institutions: campaigns, lead tracking and follow-up. Based in Hyderabad, Telangana.",
    intro: `Campaigns and follow-up systems that turn admission enquiries into applications, tracked from first click to enrolment. ${hyd}`,
    deliverables: [
      "Seasonal admission campaign plan across paid and organic channels",
      "Enquiry tracking from ad to application",
      "Counsellor follow-up workflow",
      "Dashboard of enquiries, applications and cost per application",
    ],
    process: [
      { step: "Plan", detail: "Align programmes, intake dates and target student segments." },
      { step: "Launch", detail: "Run campaigns with landing pages and tracked enquiry forms." },
      { step: "Follow up", detail: "Route enquiries to counsellors with timely reminders." },
      { step: "Review", detail: "Report by programme and channel; adjust before the next intake." },
    ],
    proof: [],
    faqs: [
      { q: "When should admission campaigns start?", a: "Well before application deadlines, so you have time to test and improve. Exact timing depends on your intake calendar." },
      { q: "Can you track enquiries through to enrolment?", a: "Yes, if enquiries and outcomes are recorded in a shared sheet or CRM, we can report on the full path." },
    ],
    relatedTags: ["admissions marketing", "lead generation"],
  },
  {
    slug: "election-campaign-marketing",
    name: "Election Campaign Marketing",
    h1: "Election Campaign Marketing and Voter Outreach in India",
    metaTitle: "Election Campaign Marketing | Adithya Reddy",
    metaDescription:
      "Digital outreach, message testing and reporting for election campaigns in Telangana and across India, with a data-led approach.",
    intro: `Digital outreach, message testing and ground-level reporting for campaigns, built to follow all applicable election commission and platform rules. ${hyd}`,
    deliverables: [
      "Constituency-level digital outreach plan",
      "Message and creative testing",
      "Volunteer and supporter lead capture",
      "Daily and weekly reporting for the campaign team",
    ],
    process: [
      { step: "Understand", detail: "Map constituencies, issues and available channels." },
      { step: "Reach", detail: "Run compliant digital outreach with tested messaging." },
      { step: "Capture", detail: "Collect supporter and volunteer details with consent." },
      { step: "Report", detail: "Share reach, response and follow-up status." },
    ],
    proof: [],
    faqs: [
      { q: "Do you follow election rules?", a: "Campaign work must comply with Election Commission of India guidelines and platform political-ad policies. Compliance is part of planning." },
      { q: "Do you work in Telangana?", a: "I am based in Hyderabad, Telangana, and can work with campaigns across India." },
    ],
    relatedTags: ["election campaign marketing", "marketing analytics"],
  },
  {
    slug: "marketing-analytics-power-bi",
    name: "Marketing Analytics & Power BI",
    h1: "Marketing Analytics and Power BI Dashboards",
    metaTitle: "Marketing Analytics & Power BI | Adithya Reddy",
    metaDescription:
      "Power BI dashboards that connect ad spend, leads and revenue so marketing decisions rest on one view. Hyderabad-based, serving India.",
    intro: `One reliable view of spend, leads and outcomes, so the team stops arguing about whose spreadsheet is right. ${hyd}`,
    deliverables: [
      "Data model joining ad platforms, forms and CRM",
      "Power BI dashboards for spend, leads, cost per lead and conversion",
      "Metric definitions documented in plain language",
      "Scheduled refresh and handover walkthrough",
    ],
    process: [
      { step: "Define", detail: "Agree the questions and metrics the dashboard must answer." },
      { step: "Connect", detail: "Bring data from ad platforms, forms and CRM into one model." },
      { step: "Build", detail: "Create dashboards with clear drill-downs." },
      { step: "Hand over", detail: "Document metrics and train the team." },
    ],
    proof: [],
    faqs: [
      { q: "Why Power BI?", a: "It connects to many marketing data sources, handles modelling well and is widely used in Indian organisations." },
      { q: "Can dashboards update automatically?", a: "Yes, with scheduled refresh once data sources are connected." },
    ],
    relatedTags: ["power bi", "marketing analytics"],
  },
  {
    slug: "llm-reporting-automation",
    name: "LLM Reporting Automation",
    h1: "LLM Reporting Automation for Marketing Teams",
    metaTitle: "LLM Reporting Automation | Adithya Reddy",
    metaDescription:
      "Automate client marketing reports with LLMs: from three days to four hours. Built with LangChain and the Claude API by a Hyderabad marketer.",
    intro: `Automated, reviewed reporting where LLMs draft the narrative from your numbers and a person approves it. ${hyd}`,
    deliverables: [
      "Automated data pull and report template",
      "LLM-drafted commentary grounded in the numbers",
      "Human review step before delivery",
      "Documented workflow your team can maintain",
    ],
    process: [
      { step: "Map", detail: "List what goes into the current report and who reads it." },
      { step: "Automate", detail: "Pull data and generate first-draft commentary with LangChain or the Claude API." },
      { step: "Review", detail: "Add checks so figures in the text match the source data." },
      { step: "Deliver", detail: "Send finished reports on a schedule." },
    ],
    proof: [
      {
        title: "LLM automation for client reporting",
        result: "Client report delivery cut from 3 days to 4 hours.",
        context: "Result from Adithya's marketing experience.",
        postSlug: "llm-automation-client-reports",
      },
    ],
    faqs: [
      { q: "Can an LLM write marketing reports accurately?", a: "It can draft commentary from supplied data, but figures must be checked against the source. A review step is built into the workflow." },
      { q: "Which tools do you use?", a: "LangChain and the Claude API, combined with your existing data sources and Power BI where useful." },
    ],
    relatedTags: ["llm automation", "langchain", "claude api", "reporting"],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
