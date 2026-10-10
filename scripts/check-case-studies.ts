/**
 * Pre-build gate for case studies and the posts based on them.
 * Fails the build when:
 *  - a confirmed case still contains TODO_CONFIRM
 *  - a published post (draft: false) is based on an unconfirmed case
 *  - a published post shows digits in its title/description while that case's figures are private
 *  - a private client name appears in published blog content or in site source files
 * Always prints the list of unresolved TODOs.
 */
import fs from "node:fs";
import path from "node:path";
import { CASE_STUDIES } from "../content/case-studies";
import { getAllPostsIncludingDrafts } from "../lib/blog";
import { unresolved } from "../lib/case-study";

const errors: string[] = [];
const blockers: string[] = [];

for (const c of CASE_STUDIES) {
  const todos = unresolved(c);
  blockers.push(...todos);
  if (c.confirmed && todos.length) errors.push(`Confirmed case "${c.slug}" has unresolved TODO_CONFIRM:\n    ${todos.join("\n    ")}`);
  if (c.actionsPublic && c.actionsPublic.length !== c.actions.length) errors.push(`${c.slug}: actionsPublic must have the same length as actions`);
  const generic = new Set(["university", "private", "association", "city", "design", "studio", "solutions", "officers", "police", "hyderabad", "pvt", "ltd"]);
  const distinctive = c.clientName.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length >= 4 && !generic.has(t));
  if (c.slug === c.anonymizedSlug || distinctive.some((t) => c.anonymizedSlug.toLowerCase().includes(t))) errors.push(`${c.slug}: anonymizedSlug must not contain the client name`);
}

const posts = getAllPostsIncludingDrafts();
for (const p of posts) {
  if (p.draft || !p.caseStudy) continue;
  const c = CASE_STUDIES.find((x) => x.slug === p.caseStudy);
  if (!c) { errors.push(`Post "${p.slug}" references unknown case "${p.caseStudy}"`); continue; }
  if (!c.confirmed) errors.push(`Post "${p.slug}" is published but case "${c.slug}" is not confirmed`);
  if (!c.permission.figuresPublic && /\d/.test(`${p.title} ${p.description}`)) errors.push(`Post "${p.slug}": title/description contain figures but "${c.slug}" figures are not public`);
}

// Private client names must not appear in published blog content or site source.
const privateNames = CASE_STUDIES.filter((c) => !c.permission.clientNamePublic).flatMap((c) => [c.clientName, c.clientName.replace(/ Pvt\. Ltd\.$/, "")]);
const scan = (file: string, label: string) => {
  const t = fs.readFileSync(file, "utf8");
  for (const n of privateNames) if (t.toLowerCase().includes(n.toLowerCase())) errors.push(`Private client name "${n}" appears in ${label}`);
};
for (const p of posts.filter((x) => !x.draft)) scan(path.join("content/blog", `${p.slug}.mdx`), `published post ${p.slug}`);
const walk = (dir: string) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) { if (!["node_modules", ".next", "case-studies"].includes(e.name)) walk(f); }
    else if (/\.(tsx?|mdx?)$/.test(e.name) && !f.startsWith(path.join("content", "blog"))) scan(f, f);
  }
};
for (const d of ["app", "components", "lib", "content"]) walk(d);

console.log(`\nUnresolved TODO_CONFIRM items (${blockers.length}):`);
for (const b of blockers) console.log(`  - ${b}`);
console.log("\nCase study status:");
for (const c of CASE_STUDIES) console.log(`  - ${c.slug}: confirmed=${c.confirmed}, clientNamePublic=${c.permission.clientNamePublic}, figuresPublic=${c.permission.figuresPublic}`);

if (errors.length) {
  console.error(`\nCase-study check FAILED:\n${errors.map((e) => `  x ${e}`).join("\n")}`);
  process.exit(1);
}
console.log("\nCase-study check passed.");
