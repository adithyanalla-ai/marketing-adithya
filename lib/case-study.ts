import { CASE_STUDIES, TODO, type CaseStudy } from "../content/case-studies";

/**
 * The only way pages, schema, OG images and blog posts read case studies.
 * Enforces the permission flags and hides anything still marked TODO_CONFIRM.
 */
export const hasTodo = (s: string) => s.includes(TODO);

/** "2024-2025 (TODO_CONFIRM months)" -> "2024-2025". Anything still containing the marker after that becomes "". */
const publicText = (s: string) => {
  const t = s.replace(/\s*\([^)]*TODO_CONFIRM[^)]*\)/g, "").trim();
  return hasTodo(t) ? "" : t;
};

export const publicSlug = (c: CaseStudy) => (c.permission.clientNamePublic ? c.slug : c.anonymizedSlug);
export const displayName = (c: CaseStudy) => (c.permission.clientNamePublic ? c.clientName : c.anonymizedLabel);
export const casePath = (c: CaseStudy) => `/case-studies/${publicSlug(c)}/`;

export type CaseView = {
  c: CaseStudy;
  slug: string;
  name: string;
  title: string;
  role: string;
  period: string;
  challenge: string;
  actions: string[];
  /** Figures visible: value + label. Otherwise qualitative text only. */
  results: { value?: string; label: string; scope: string }[];
  tools: string[];
  badge: string;
  confirmed: boolean;
};

export function view(c: CaseStudy): CaseView {
  const figures = c.permission.figuresPublic;
  const name = displayName(c);
  const actions = (figures ? c.actions : c.actionsPublic ?? c.actions).map(publicText).filter(Boolean);
  const results = c.results.map((r) =>
    figures ? { value: r.value, label: r.label, scope: r.scope } : { label: r.qualitative, scope: "" },
  );
  const first = results[0];
  return {
    c,
    slug: publicSlug(c),
    name,
    title: c.headline.replace("{client}", name),
    role: publicText(c.role),
    period: publicText(c.period),
    challenge: publicText(c.challenge),
    actions,
    results,
    tools: c.tools.filter((t) => !hasTodo(t)),
    badge: first ? (first.value ? `${first.value} ${first.label}` : first.label) : "Case study",
    confirmed: c.confirmed,
  };
}

export const getCaseBySlug = (slug: string) => CASE_STUDIES.find((c) => publicSlug(c) === slug);
export const getCaseById = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
export const casesForService = (serviceSlug: string) => CASE_STUDIES.filter((c) => c.serviceSlugs.includes(serviceSlug));

/** Every unresolved TODO_CONFIRM in a case, as "slug: field" strings. */
export function unresolved(c: CaseStudy): string[] {
  const out: string[] = [];
  const walk = (v: unknown, path: string) => {
    if (typeof v === "string") { if (hasTodo(v)) out.push(`${c.slug}: ${path} = ${JSON.stringify(v)}`); }
    else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`));
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, path ? `${path}.${k}` : k);
  };
  walk(c, "");
  return out;
}
