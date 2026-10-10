import { getAllPostsIncludingDrafts } from "../../lib/blog";
import { BLOCKLIST, GEO_WEIGHT, MAX_OVERLAP, SERVICE_MAP, WEIGHTS, WINDOW_WEIGHT } from "./config";
import type { Intent, RelatedQuery, ScoredTopic } from "./types";

const STOP = new Set(["a", "an", "the", "for", "of", "to", "in", "and", "or", "with", "on", "vs", "how", "what", "is", "best", "top", "india"]);

export const tokens = (s: string): string[] =>
  s.toLowerCase().replace(/[^a-z0-9/\s]/g, " ").split(/\s+/).filter((t) => t && !STOP.has(t));

function jaccard(a: string[], b: string[]): number {
  const A = new Set(a), B = new Set(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / (A.size + B.size - inter);
}

export function detectIntent(q: string): Intent {
  const s = q.toLowerCase();
  if (/\b(login|log in|official|website)\b/.test(s)) return "navigational";
  if (/\b(price|pricing|cost|agency|hire|services|consultant|company|companies|near me)\b/.test(s)) return "transactional";
  if (/\b(best|top|vs|versus|tools?|software|compare|alternatives?|review)\b/.test(s)) return "commercial";
  return "informational";
}

const titleCase = (s: string) => s.replace(/\b([a-z])/g, (m) => m.toUpperCase()).replace(/\bAi\b/g, "AI").replace(/\bLlm\b/g, "LLM").replace(/\bMeta\b/g, "Meta");

function suggestTitle(q: string, intent: Intent): string {
  const t = titleCase(q);
  if (intent === "commercial") return `${t}: What to Choose and Why`;
  if (intent === "transactional") return `${t}: What to Look For`;
  if (/^(how|what|why)\b/i.test(q)) return t;
  return `${t}: A Practical Guide for Indian Teams`;
}

function matchService(q: string, seed: string) {
  const toks = new Set([...tokens(q), ...tokens(seed)]);
  let best: { svc: (typeof SERVICE_MAP)[number]; hits: number } | null = null;
  for (const svc of SERVICE_MAP) {
    const hits = svc.keywords.filter((k) => toks.has(k)).length;
    if (!best || hits > best.hits) best = { svc, hits };
  }
  return best && best.hits > 0 ? best : null;
}

export function scoreTopics(rows: RelatedQuery[], topN: number): ScoredTopic[] {
  const existing = getAllPostsIncludingDrafts().map((p) => tokens(`${p.primaryKeyword} ${p.title} ${p.tags.join(" ")}`));
  const groups = new Map<string, RelatedQuery[]>();
  for (const r of rows) {
    const key = r.query.toLowerCase().trim();
    if (!key || BLOCKLIST.some((b) => key.includes(b))) continue;
    groups.set(key, [...(groups.get(key) ?? []), r]);
  }

  const scored: ScoredTopic[] = [];
  for (const [query, rs] of groups) {
    // Rising velocity: log-scaled growth, weighted by geography and window. Breakout = 1.
    let velocity = 0, interest = 0;
    for (const r of rs) {
      const w = GEO_WEIGHT[r.geo] * WINDOW_WEIGHT[r.window];
      if (r.kind === "rising") velocity = Math.max(velocity, w * Math.min(1, Math.log10(1 + r.value) / Math.log10(1 + 5000)));
      else interest = Math.max(interest, w * Math.min(1, r.value / 100));
    }
    if (interest === 0) interest = 0.2; // rising-only queries still have some demand

    const seed = rs[0].seed;
    const match = matchService(query, seed);
    const relevance = Math.min(1, 0.2 + 0.4 * (match?.hits ?? 0));

    const qt = tokens(query);
    const overlap = existing.reduce((m, e) => Math.max(m, jaccard(qt, e)), 0);
    if (overlap >= MAX_OVERLAP) continue;
    const novelty = 1 - overlap;

    const score = 100 * (WEIGHTS.velocity * velocity + WEIGHTS.interest * interest + WEIGHTS.relevance * relevance + WEIGHTS.novelty * novelty);
    const intent = detectIntent(query);
    if (intent === "navigational") continue;
    const svc = match?.svc ?? null;

    scored.push({
      rank: 0,
      query,
      suggestedTitle: suggestTitle(query, intent),
      primaryKeyword: query,
      searchIntent: intent,
      angle: svc
        ? `Answer the search intent first, then add a worked example or template tied to ${svc.name}, and a "From my experience" section from Adithya's real work.`
        : `Answer the search intent first, then add an original framework or template and first-hand detail from Adithya.`,
      service: svc ? { slug: svc.slug, name: svc.name } : null,
      category: svc?.category ?? "Growth Marketing",
      score: Math.round(score * 10) / 10,
      components: { velocity: round(velocity), interest: round(interest), relevance: round(relevance), novelty: round(novelty) },
      evidence: rs.map((r) => ({ seed: r.seed, kind: r.kind, geo: r.geo, window: r.window, value: r.value, breakout: r.breakout })),
    });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, topN).map((t, i) => ({ ...t, rank: i + 1 }));
}

const round = (n: number) => Math.round(n * 100) / 100;
