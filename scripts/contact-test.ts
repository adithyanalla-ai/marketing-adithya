/**
 * Behaviour tests for the contact API with fetch mocked (nothing is sent). Usage: npm run contact:test
 */
process.env.OWNER_WHATSAPP_NUMBER = "918712569303";
process.env.META_WA_TOKEN = "test-token";
process.env.META_WA_PHONE_NUMBER_ID = "111";
process.env.OWNER_EMAIL = "owner@example.com";
process.env.RESEND_API_KEY = "test-key";

import { POST } from "../app/api/contact/route";

let waStatus = 200, mailStatus = 200;
const calls: { url: string; body: string }[] = [];
globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
  const u = String(url);
  calls.push({ url: u, body: String(init?.body ?? "") });
  const status = u.includes("graph.facebook.com") ? waStatus : u.includes("resend.com") ? mailStatus : 500;
  return new Response(JSON.stringify(status >= 400 ? { error: { code: 131030, message: "secret provider detail" } } : { ok: true }), { status });
}) as typeof fetch;

const body = (o: object = {}) => ({ name: "Priya Sharma", email: "priya@example.com", company: "", budget: "Not sure yet", message: "We want more admission enquiries please.", website: "", t: Date.now() - 10_000, ...o });
let n = 0;
const post = (b: object, ip = `10.0.0.${++n}`) => POST(new Request("http://x/api/contact", { method: "POST", headers: { "x-forwarded-for": ip, "content-type": "application/json" }, body: JSON.stringify(b) }));

let failed = 0;
const expect = (name: string, ok: boolean, extra = "") => { if (!ok) failed++; console.log(`${ok ? "ok  " : "FAIL"} ${name}${extra ? ` (${extra})` : ""}`); };
const quiet = console.error; // keep expected error logs out of the output but capture them
let logs: string[] = [];
console.error = (...a: unknown[]) => { logs.push(a.map((x) => (typeof x === "string" ? x : JSON.stringify(x))).join(" ")); };

(async () => {
  calls.length = 0; waStatus = 200; mailStatus = 200;
  let r = await post(body());
  expect("both channels succeed -> 200", r.status === 200 && calls.length === 2);

  waStatus = 400; mailStatus = 200; logs = [];
  r = await post(body());
  expect("WhatsApp fails, email ok -> 200", r.status === 200);
  expect("WhatsApp failure is logged", logs.some((l) => l.includes("WhatsApp notification failed")));

  waStatus = 200; mailStatus = 500; logs = [];
  r = await post(body());
  expect("email fails, WhatsApp ok -> 200", r.status === 200);

  waStatus = 400; mailStatus = 500; logs = [];
  r = await post(body());
  const j = await r.json();
  expect("both fail -> 502", r.status === 502);
  expect("lead failure logged without visitor details", logs.some((l) => l.includes("LEAD NOT DELIVERED")) && !logs.join(" ").includes("Priya") && !logs.join(" ").includes("priya@"));
  expect("provider error never shown to visitor", !JSON.stringify(j).includes("secret provider detail") && !JSON.stringify(j).includes("131030"));

  waStatus = 200; mailStatus = 200; calls.length = 0;
  r = await post(body({ website: "http://spam.example" }));
  expect("honeypot: silent 200, nothing sent", r.status === 200 && calls.length === 0);
  r = await post(body({ t: Date.now() - 500 }));
  expect("filled in under 2.5s: silent 200, nothing sent", r.status === 200 && calls.length === 0);

  r = await post(body({ email: "not-an-email" }));
  expect("invalid email -> 400", r.status === 400);
  r = await post(body({ message: "short" }));
  expect("short message -> 400", r.status === 400);

  const ip = "203.0.113.9";
  const codes: number[] = [];
  for (let i = 0; i < 6; i++) codes.push((await post(body(), ip)).status);
  expect("rate limit: 5 allowed, 6th blocked", codes.slice(0, 5).every((c) => c === 200) && codes[5] === 429, codes.join(","));

  const wa = calls.find((c) => c.url.includes("graph.facebook.com"));
  const sent = wa ? JSON.parse(wa.body).template.components[0].parameters.map((p: { text: string }) => p.text) : [];
  expect("WhatsApp body has 6 parameters with no newlines or tabs", sent.length === 6 && sent.every((p: string) => !/[\n\t]| {5,}/.test(p)));
  expect("empty company becomes 'Not provided'", sent[2] === "Not provided");

  console.error = quiet;
  console.log(failed ? `\n${failed} test(s) failed` : "\nAll contact tests passed");
  process.exit(failed ? 1 : 0);
})();
