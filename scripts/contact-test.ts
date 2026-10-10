/**
 * Tests for the contact form's submit logic with fetch mocked against the Formspree endpoint. Nothing is sent.
 * Usage: npm run contact:test
 */
import { FORMSPREE_ENDPOINT } from "../content/contact";
import { submitContact, type RawForm } from "../lib/contact-submit";

type Call = { url: string; init: RequestInit };
let calls: Call[] = [];
let behaviour: "ok" | "400" | "500" | "network" = "ok";
const fetchImpl = (async (url: string | URL, init?: RequestInit) => {
  calls.push({ url: String(url), init: init ?? {} });
  if (behaviour === "network") throw new TypeError("Failed to fetch");
  const status = behaviour === "ok" ? 200 : Number(behaviour);
  return new Response(JSON.stringify(status < 400 ? { ok: true } : { errors: [{ message: "raw formspree detail" }] }), { status });
}) as typeof fetch;

const NOW = Date.parse("2026-10-10T10:15:00Z"); // 03:45 PM in Asia/Kolkata
const form = (o: Partial<RawForm> = {}): RawForm => ({ name: "Priya Sharma", email: "priya@example.com", company: "", budget: "Not sure yet", message: "We want more admission enquiries please.", gotcha: "", openedAt: NOW - 10_000, ...o });
const run = (o: Partial<RawForm> = {}) => submitContact(form(o), { fetchImpl, now: () => NOW, page: "https://marketing.adithyareddy.online/contact/" });

let failed = 0;
const check = (name: string, ok: boolean, extra = "") => { if (!ok) failed++; console.log(`${ok ? "ok  " : "FAIL"} ${name}${extra ? ` (${extra})` : ""}`); };

(async () => {
  calls = []; behaviour = "ok";
  let r = await run();
  check("res.ok -> success", r.status === "ok" && calls.length === 1);
  const c = calls[0];
  const body = JSON.parse(String(c.init.body));
  check("posts to the Formspree endpoint only", c.url === FORMSPREE_ENDPOINT);
  check("JSON headers", (c.init.headers as Record<string, string>)["Accept"] === "application/json" && (c.init.headers as Record<string, string>)["Content-Type"] === "application/json" && c.init.method === "POST");
  check("payload fields", ["name", "email", "company", "budget_range", "message", "_subject", "page", "submitted_at"].every((k) => k in body), Object.keys(body).join(","));
  check("no separate reply-to field", !("_replyto" in body) && !("reply_to" in body) && body.email === "priya@example.com");
  check("subject uses the name", body._subject === "New website enquiry from Priya Sharma");
  check("empty company reads 'Not provided'", body.company === "Not provided");
  check("page is the sending URL", body.page === "https://marketing.adithyareddy.online/contact/");
  check("submitted_at is DD MMM YYYY, hh:mm AM/PM (Asia/Kolkata)", body.submitted_at === "10 Oct 2026, 03:45 PM", body.submitted_at);
  check("honeypot field is not sent", !("_gotcha" in body));

  for (const [label, b] of [["400", "400"], ["500", "500"], ["network error", "network"]] as const) {
    calls = []; behaviour = b;
    r = await run();
    check(`${label} -> error state, no raw text`, r.status === "error" && !JSON.stringify(r).includes("raw formspree"));
  }

  calls = []; behaviour = "ok";
  r = await run({ gotcha: "http://spam.example" });
  check("honeypot filled: pretend success, nothing sent", r.status === "spam" && calls.length === 0);
  r = await run({ openedAt: NOW - 500 });
  check("submitted in under 2.5s: pretend success, nothing sent", r.status === "spam" && calls.length === 0);

  r = await run({ name: "A" });
  check("short name -> validation message", r.status === "invalid" && r.errors.name === "Please enter your name." && calls.length === 0);
  r = await run({ email: "nope" });
  check("bad email -> validation message", r.status === "invalid" && r.errors.email === "Please enter a valid email address.");
  r = await run({ message: "short" });
  check("short message -> validation message", r.status === "invalid" && !!r.errors.message);

  const logs: unknown[][] = [];
  calls = [];
  r = await submitContact(form(), { fetchImpl, now: () => NOW, dryRun: true, log: (...a) => logs.push(a), page: "x" });
  check("dry run logs the payload and does not post", r.status === "ok" && calls.length === 0 && logs.length === 1);

  console.log(failed ? `\n${failed} test(s) failed` : "\nAll contact tests passed");
  process.exit(failed ? 1 : 0);
})();
