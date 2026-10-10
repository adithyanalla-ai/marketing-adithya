import type { Source } from "./types";

export type GuardReport = {
  strippedLinks: string[];
  unsourcedStatParagraphs: number;
  addedSections: string[];
  words: number;
  warnings: string[];
};

const STAT = /(\d+(\.\d+)?\s?%|\b\d+(\.\d+)?\s?(x|times)\b|\b\d[\d,]*\s?(million|billion|crore|lakh)\b|\bstud(y|ies)\b.*\d)/i;
const MD_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

/** Keep only links to URLs gathered by search; flag statistics with no citation; guarantee required sections. */
export function applyGuardrails(body: string, allowed: Source[]): { body: string; used: Source[]; report: GuardReport } {
  const allow = new Map(allowed.map((s) => [normalize(s.url), s]));
  const report: GuardReport = { strippedLinks: [], unsourcedStatParagraphs: 0, addedSections: [], words: 0, warnings: [] };
  const used = new Map<string, Source>();

  let out = body.replace(MD_LINK, (full, text: string, url: string) => {
    const hit = allow.get(normalize(url));
    if (hit) {
      used.set(hit.url, hit);
      return full;
    }
    report.strippedLinks.push(url);
    return text;
  });

  // Paragraph-level check: a percentage / multiple / large number needs a link in the same paragraph.
  out = out
    .split(/\n{2,}/)
    .map((para) => {
      const isProse = !/^\s*(#|```|\||<|\{\/\*)/.test(para);
      if (isProse && STAT.test(para) && !/\]\(https?:\/\//.test(para)) {
        report.unsourcedStatParagraphs++;
        return `${para}\n\n{/* TODO(Adithya): this paragraph states a number with no citation. Add a source from the list or remove the claim. */}`;
      }
      return para;
    })
    .join("\n\n");

  if (!/^##\s+From my experience\s*$/im.test(out)) {
    out += `\n\n## From my experience\n\n{/* TODO(Adithya): add first-hand detail only you can supply — what you did, what happened, what you would change. Do not add numbers you cannot stand behind. */}\n`;
    report.addedSections.push("From my experience");
  } else if (!/TODO\(Adithya\)/.test(out)) {
    report.warnings.push('"From my experience" exists but has no TODO(Adithya) marker; confirm it is placeholder-only.');
  }
  if (!/^##\s+(FAQ|Frequently asked questions)\b/im.test(out)) {
    report.warnings.push("No FAQ section found; FAQPage schema will not be emitted.");
  }
  if (!/<KeyTakeaways>/.test(out)) report.warnings.push("No <KeyTakeaways> block found.");

  report.words = out.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").split(/\s+/).filter(Boolean).length;
  return { body: out, used: [...used.values()], report };
}

function normalize(u: string): string {
  try {
    const x = new URL(u);
    return `${x.hostname.replace(/^www\./, "")}${x.pathname.replace(/\/$/, "")}${x.search}`.toLowerCase();
  } catch {
    return u.toLowerCase();
  }
}
