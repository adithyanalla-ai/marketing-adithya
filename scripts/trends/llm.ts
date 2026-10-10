import Anthropic from "@anthropic-ai/sdk";
import { MODEL, SERVICE_MAP } from "./config";
import type { Brief, ScoredTopic, Source } from "./types";
import { getAllPostsIncludingDrafts } from "../../lib/blog";

const SYSTEM = `You are an editorial assistant for Adithya Reddy, a growth and performance marketer in Hyderabad, India (lead generation, Meta ads, Power BI analytics, LLM automation with LangChain and the Claude API).
Hard rules:
- You produce DRAFTS for a human to edit. Never present anything as final.
- Never invent statistics, quotes, case studies, client names, results or personal experience. Only state a number if it comes from a source you were given, and cite that source inline as a markdown link.
- Never claim Adithya did something unless it is in this list of verified facts: (1) he builds segmented and scored lead pipelines; (2) Meta ads A/B testing reduced cost per lead by 20%; (3) LLM automation cut client report delivery from 3 days to 4 hours. Everything else about his experience must be left for him to fill in.
- Add original value: a framework, template, checklist or worked example, not a rewrite of what already ranks.
- Tone: clear, human, practical; write for marketers and business owners in India. Mention Hyderabad, Telangana or India only where natural.`;

function client() {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is not set. Set it, or use --dry-run / --skip-draft.");
  return new Anthropic();
}

const textOf = (content: Anthropic.ContentBlock[]) =>
  content.filter((b): b is Anthropic.TextBlock => b.type === "text").map((b) => b.text).join("\n");

function extractJson<T>(text: string): T {
  const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(text)?.[1];
  const raw = fenced ?? text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
  return JSON.parse(raw) as T;
}

/** Brief step: web search for real sources, then a structured outline. */
export async function makeBrief(topic: ScoredTopic): Promise<{ brief: Brief; sources: Source[] }> {
  const c = client();
  const posts = getAllPostsIncludingDrafts();
  const existing = posts.map((p) => `- /blog/${p.slug}/ — ${p.title}`).join("\n") || "(none)";
  const services = SERVICE_MAP.map((s) => `- /services/${s.slug}/ — ${s.name}`).join("\n");
  const pillar = topic.score >= 70;

  const messages: Anthropic.MessageParam[] = [{
    role: "user",
    content: `Trending topic: "${topic.query}" (search intent: ${topic.searchIntent}). Suggested angle: ${topic.angle}

Use web search (max 6 searches) to find authoritative, real pages on this topic: official docs, platform help pages, reputable publications or studies. Prefer primary sources.

Then output ONLY one JSON object (no prose) with this shape:
{"title": "<under 60 chars>", "description": "<under 155 chars>", "slug": "kebab-case", "primaryKeyword": "", "secondaryKeywords": [""], "tags": ["lowercase", "..."], "searchIntent": "", "angle": "<what original value this post adds>", "outline": [{"heading": "", "points": [""]}], "faqs": [{"q": "", "a_hint": ""}], "internalLinks": [{"text": "", "path": "/services/... or /blog/.../"}], "originalValue": "<the framework/template/worked example to include>", "targetWords": ${pillar ? "1500" : "850"}}

Internal links must come from these existing pages only:
Services:
${services}
Posts:
${existing}
Include 2-3 service links. Outline must include a "From my experience" section and a "FAQ" section.`,
  }];

  const tools = [{ type: "web_search_20260209", name: "web_search", max_uses: 6 }] as unknown as Anthropic.Tool[];
  const sources = new Map<string, Source>();
  let text = "";
  for (let turn = 0; turn < 4; turn++) {
    const res = await c.messages.create({
      model: MODEL, max_tokens: 16000, system: SYSTEM, tools, messages,
      output_config: { effort: "medium" },
    } as Anthropic.MessageCreateParamsNonStreaming);
    collectSources(res.content, sources);
    text = textOf(res.content);
    if (res.stop_reason === "pause_turn") {
      messages.push({ role: "assistant", content: res.content });
      continue;
    }
    if (res.stop_reason === "refusal") throw new Error(`Model refused brief for "${topic.query}"`);
    break;
  }
  const brief = extractJson<Brief>(text);
  if (sources.size === 0) throw new Error(`No sources were found by web search for "${topic.query}"; refusing to draft without citations.`);
  return { brief, sources: [...sources.values()] };
}

function collectSources(content: unknown[], into: Map<string, Source>) {
  for (const b of content as { type: string; content?: unknown; citations?: { url?: string; title?: string }[] }[]) {
    if (b.type === "web_search_tool_result" && Array.isArray(b.content)) {
      for (const r of b.content as { type: string; url?: string; title?: string }[]) {
        if (r.type === "web_search_result" && r.url) into.set(r.url, { title: r.title ?? r.url, url: r.url });
      }
    }
    for (const cit of b.citations ?? []) if (cit.url) into.set(cit.url, { title: cit.title ?? cit.url, url: cit.url });
  }
}

/** Draft step: MDX body only. Links are validated against `sources` afterwards. */
export async function makeDraftBody(topic: ScoredTopic, brief: Brief, sources: Source[]): Promise<string> {
  const c = client();
  const stream = c.messages.stream({
    model: MODEL, max_tokens: 32000, system: SYSTEM,
    output_config: { effort: "medium" },
    messages: [{
      role: "user",
      content: `Write the first draft of this blog post as MDX body text (no frontmatter, no H1: the page template renders the title).

BRIEF:
${JSON.stringify(brief, null, 2)}

SOURCES you may cite (use ONLY these URLs, as inline markdown links, where a fact or number comes from them):
${sources.map((s, i) => `${i + 1}. ${s.title} — ${s.url}`).join("\n")}

Requirements:
- Target about ${brief.targetWords} words.
- Start with a <KeyTakeaways> block containing a markdown bullet list (3-4 bullets), with blank lines inside the tags.
- Use ## and ### headings, answering the search intent in the first section.
- Include the original value from the brief (${brief.originalValue}) as a concrete template, checklist or worked example. If you use illustrative numbers, label them clearly as illustrations.
- Do not state any statistic you cannot cite from the sources above.
- Include a section exactly titled "## From my experience" containing ONE short placeholder paragraph telling Adithya what first-hand detail to add, and the comment {/* TODO(Adithya): ... */}. Do not write his experience for him; you may only restate the verified facts if directly relevant.
- Link 2-3 relevant service pages and any relevant existing posts using the paths in the brief's internalLinks (markdown links with relative paths).
- End with a "## FAQ" section: each question as a "### question" heading followed by a short plain-text answer.
- Output only the MDX body.`,
    }],
  } as Anthropic.MessageStreamParams);
  const final = await stream.finalMessage();
  if (final.stop_reason === "refusal") throw new Error(`Model refused draft for "${topic.query}"`);
  return textOf(final.content).trim();
}
