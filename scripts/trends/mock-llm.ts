import type { Brief, ScoredTopic, Source } from "./types";
import { slugify } from "../../lib/slug";
import { SERVICE_MAP } from "./config";

/** Dry-run stand-in for the Claude steps. Produces a structurally valid but obviously-mock draft with NO invented sources. */
export function mockBrief(topic: ScoredTopic): { brief: Brief; sources: Source[] } {
  const svc = SERVICE_MAP.find((s) => s.slug === topic.service?.slug) ?? SERVICE_MAP[0];
  const title = topic.suggestedTitle.length > 60 ? topic.suggestedTitle.slice(0, 57) + "..." : topic.suggestedTitle;
  return {
    sources: [],
    brief: {
      title,
      description: `[MOCK] A practical look at ${topic.query} for marketers in India, with a template and worked example.`.slice(0, 154),
      slug: slugify(topic.query),
      primaryKeyword: topic.primaryKeyword,
      secondaryKeywords: [],
      tags: [topic.query.split(" ").slice(0, 2).join(" ")],
      searchIntent: topic.searchIntent,
      angle: topic.angle,
      outline: [
        { heading: `What ${topic.query} means`, points: ["Define the term", "Who needs it"] },
        { heading: "A step-by-step framework", points: ["Steps", "Template"] },
        { heading: "From my experience", points: ["Placeholder"] },
        { heading: "FAQ", points: ["3 questions"] },
      ],
      faqs: [{ q: `What is ${topic.query}?`, a_hint: "Short definition" }],
      internalLinks: [{ text: svc.name, path: `/services/${svc.slug}/` }],
      originalValue: "A reusable checklist plus a worked example",
      targetWords: 850,
    },
  };
}

export function mockDraftBody(topic: ScoredTopic, brief: Brief): string {
  const svc = SERVICE_MAP.find((s) => s.slug === topic.service?.slug) ?? SERVICE_MAP[0];
  return `{/* MOCK DRAFT generated in --dry-run mode. No LLM was called and no sources were gathered. */}

<KeyTakeaways>

- [MOCK] Start from the search intent behind "${topic.query}": ${topic.searchIntent}.
- [MOCK] Give readers a template they can use today.
- [MOCK] Back every number with a cited source.

</KeyTakeaways>

## What is ${topic.query}?

[MOCK] One-paragraph answer to the search intent goes here. Sources would be linked inline once gathered by web search. [SOURCE NEEDED]

## A step-by-step framework

1. [MOCK] Define the goal and the metric.
2. [MOCK] Collect the right data.
3. [MOCK] Test, review and iterate.

Related service: [${svc.name}](/services/${svc.slug}/).

## From my experience

{/* TODO(Adithya): add first-hand detail only you can supply — what you did, what happened, what you would change. Do not add numbers you cannot stand behind. */}

## FAQ

### What is ${topic.query}?

[MOCK] A short, plain-text answer.

### Who is ${topic.query} for?

[MOCK] A short, plain-text answer.
`;
}
