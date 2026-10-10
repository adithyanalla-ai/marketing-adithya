import fs from "node:fs";
import path from "node:path";
import { DRAFTS_PER_RUN, GEOS, REQUEST_DELAY_MS, SEEDS, TOP_N, WINDOWS } from "./config";
import { resolveProvider } from "./providers";
import { scoreTopics } from "./score";
import { makeBrief, makeDraftBody } from "./llm";
import { mockBrief, mockDraftBody } from "./mock-llm";
import { applyGuardrails } from "./guardrails";
import type { Brief, RelatedQuery, ScoredTopic, Source } from "./types";
import { POSTS_DIR } from "../../lib/blog";

const args = process.argv.slice(2);
const flag = (n: string) => args.includes(`--${n}`);
const opt = (n: string) => args.find((a) => a.startsWith(`--${n}=`))?.split("=")[1];

const dryRun = flag("dry-run");
const skipDraft = flag("skip-draft");
const nDrafts = Number(opt("drafts") ?? DRAFTS_PER_RUN);
const outDir = path.join(process.cwd(), "scripts", "trends", "output", dryRun ? "dry-run" : "");
const draftDir = dryRun ? path.join(outDir, "drafts") : POSTS_DIR;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const today = new Date().toISOString().slice(0, 10);

async function main() {
  const provider = resolveProvider({ dryRun, override: opt("provider") });
  console.log(`Provider: ${provider.name}${dryRun ? " (dry run: mock data, mock LLM)" : ""}`);
  fs.mkdirSync(outDir, { recursive: true });

  const rows: RelatedQuery[] = [];
  let calls = 0, failures = 0;
  for (const seed of SEEDS) for (const geo of GEOS) for (const window of WINDOWS) {
    calls++;
    try {
      rows.push(...(await provider.fetchRelated(seed, geo, window)));
    } catch (e) {
      failures++;
      console.warn(`  ! ${seed} / ${geo} / ${window}: ${(e as Error).message}`);
    }
    if (!dryRun) await sleep(REQUEST_DELAY_MS);
  }
  if (failures === calls) throw new Error("Every Google Trends request failed; see warnings above.");
  console.log(`Fetched ${rows.length} related-query rows (${failures}/${calls} requests failed).`);

  const ranked = scoreTopics(rows, TOP_N);
  const rankedPath = path.join(outDir, "ranked-topics.json");
  fs.writeFileSync(rankedPath, JSON.stringify({ generatedAt: new Date().toISOString(), provider: provider.name, dryRun, topics: ranked }, null, 2));
  console.log(`Wrote ${rankedPath}`);
  for (const t of ranked) console.log(`  #${t.rank} ${t.score.toFixed(1)}  ${t.query}  [${t.searchIntent}]`);

  if (skipDraft || nDrafts <= 0) return;
  fs.mkdirSync(draftDir, { recursive: true });
  const summary: string[] = [];
  let made = 0;
  for (const topic of ranked) {
    if (made >= nDrafts) break;
    try {
      const { brief, sources } = dryRun ? mockBrief(topic) : await makeBrief(topic);
      const file = path.join(draftDir, `${brief.slug}.mdx`);
      if (fs.existsSync(file)) { console.log(`  skip ${brief.slug} (file exists)`); continue; }
      const raw = dryRun ? mockDraftBody(topic, brief) : await makeDraftBody(topic, brief, sources);
      const { body, used, report } = applyGuardrails(raw, sources);
      fs.writeFileSync(file, frontmatter(brief, topic, provider.name, used) + body + "\n");
      fs.writeFileSync(path.join(outDir, `brief-${brief.slug}.json`), JSON.stringify({ brief, sources, report }, null, 2));
      made++;
      summary.push(reviewLine(brief.slug, topic, report, used.length));
      console.log(`  drafted ${brief.slug}.mdx (${report.words} words, ${used.length} cited sources)`);
    } catch (e) {
      console.warn(`  ! draft failed for "${topic.query}": ${(e as Error).message}`);
    }
  }
  fs.writeFileSync(path.join(outDir, "REVIEW.md"), reviewDoc(summary));
}

const q = (s: string) => JSON.stringify(s);
function frontmatter(b: Brief, t: ScoredTopic, provider: string, sources: Source[]): string {
  const best = t.evidence.find((e) => e.kind === "rising") ?? t.evidence[0];
  return [
    "---",
    `title: ${q(b.title)}`,
    `description: ${q(b.description)}`,
    `slug: ${q(b.slug)}`,
    `date: ${q(today)}`,
    `updated: ${q(today)}`,
    `category: ${q(t.category)}`,
    `tags: ${JSON.stringify(b.tags)}`,
    `primaryKeyword: ${q(b.primaryKeyword)}`,
    `secondaryKeywords: ${JSON.stringify(b.secondaryKeywords)}`,
    `sources: ${JSON.stringify(sources)}`,
    `author: "Adithya Reddy"`,
    `draft: true`,
    `trendSource: ${q(`google-trends/${provider}/${best.geo}/${best.window}`)}`,
    `trendScore: ${t.score}`,
    "---",
    "",
    "",
  ].join("\n");
}

function reviewLine(slug: string, t: ScoredTopic, r: ReturnType<typeof applyGuardrails>["report"], cited: number) {
  const flags = [
    r.strippedLinks.length && `${r.strippedLinks.length} uncited link(s) removed`,
    r.unsourcedStatParagraphs && `${r.unsourcedStatParagraphs} unsourced stat paragraph(s) flagged`,
    ...r.addedSections.map((s) => `added "${s}" placeholder`),
    ...r.warnings,
  ].filter(Boolean);
  return `- **${slug}** (score ${t.score}, ${r.words} words, ${cited} cited sources)${flags.length ? `\n  - ${flags.join("\n  - ")}` : ""}`;
}

function reviewDoc(lines: string[]) {
  return `# Draft review checklist\n\nFor each draft: fill "From my experience" with real detail, verify every claim against its source, check word count (700-1,000 trend posts, 1,200-2,000 pillar), then set \`draft: false\`.\n\n${lines.join("\n") || "(no drafts created)"}\n`;
}

main().catch((e) => {
  console.error(`\nError: ${e.message}`);
  process.exit(1);
});
