/**
 * Prints the exact WhatsApp request and email for a SAMPLE submission (no real visitor data), without sending anything.
 * Usage: npm run contact:dry
 */
import { build } from "../lib/notify/whatsapp";
import { buildEmail } from "../lib/notify/email";
import { missingEnv, provider } from "../lib/notify/whatsapp";
import { missingEmailEnv } from "../lib/notify/email";

const lead = {
  name: "Priya Sharma",
  email: "priya@example.com",
  company: "",
  budget: "Not sure yet",
  message: "Hi Adithya,\nWe run a small institute in Hyderabad and want more qualified admission enquiries.\n\n\tCould we talk this week?  Details: https://example.com/brief <b>urgent</b> *bold*\n" + "More detail. ".repeat(60),
  receivedAt: new Date(),
};

const wa = build(lead);
console.log(`WhatsApp provider: ${provider()}`);
console.log(`Missing WhatsApp env: ${missingEnv().join(", ") || "none"}`);
console.log(`Missing email env: ${missingEmailEnv().join(", ") || "none"}\n`);
console.log("--- WhatsApp request ---");
console.log(wa.request.method, wa.request.url);
console.log(JSON.stringify(wa.request.headers, null, 2));
if (wa.request.body) {
  try { console.log(JSON.stringify(JSON.parse(wa.request.body), null, 2)); } catch { console.log(wa.request.body); }
}
const params = (() => { try { return JSON.parse(wa.request.body ?? "{}").template.components[0].parameters.map((p: { text: string }) => p.text) as string[]; } catch { return [] as string[]; } })();
for (const [i, p] of params.entries()) {
  const bad = /[\n\t]| {5,}/.test(p);
  console.log(`  param ${i + 1}: ${p.length} chars, forbidden characters: ${bad ? "YES (bug)" : "none"}`);
}
console.log("\n--- Email ---");
const e = buildEmail(lead);
console.log(JSON.stringify({ ...e, html: `<${e.html.length} chars of HTML>` }, null, 2));
console.log(`Full message preserved in email: ${e.text.includes(lead.message)}`);
