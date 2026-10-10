import { formatReceived } from "./sanitize";
import type { Lead, NotifyResult } from "./types";

const env = (k: string) => (process.env[k] ?? "").trim();
export const missingEmailEnv = () => ["RESEND_API_KEY", "OWNER_EMAIL"].filter((k) => !env(k));
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** The full, untruncated enquiry. Used for the real email and for dry-run display. */
export function buildEmail(lead: Lead) {
  const received = formatReceived(lead.receivedAt);
  const company = lead.company.trim() || "Not provided";
  return {
    from: env("CONTACT_FROM_EMAIL") || "Website <onboarding@resend.dev>",
    to: [env("OWNER_EMAIL") || "<OWNER_EMAIL>"],
    reply_to: lead.email,
    subject: `New website enquiry from ${lead.name.replace(/[\r\n]+/g, " ")}`,
    text: `New website enquiry\n\nName: ${lead.name}\nEmail: ${lead.email}\nCompany: ${company}\nBudget range: ${lead.budget}\nReceived: ${received}\n\nHow can I help:\n${lead.message}\n`,
    html: `<h2>New website enquiry</h2><p><b>Name:</b> ${esc(lead.name)}<br><b>Email:</b> ${esc(lead.email)}<br><b>Company:</b> ${esc(company)}<br><b>Budget range:</b> ${esc(lead.budget)}<br><b>Received:</b> ${esc(received)}</p><p><b>How can I help:</b></p><p style="white-space:pre-wrap">${esc(lead.message)}</p>`,
  };
}

export async function sendEmail(lead: Lead): Promise<NotifyResult> {
  const missing = missingEmailEnv();
  if (missing.length) {
    console.error(`[contact] Email backup is not configured. Missing env vars: ${missing.join(", ")}`);
    return { ok: false, channel: "email", provider: "resend", skipped: true, error: `missing env: ${missing.join(", ")}` };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env("RESEND_API_KEY")}`, "Content-Type": "application/json" },
      body: JSON.stringify(buildEmail(lead)),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? { ok: true, channel: "email", provider: "resend" } : { ok: false, channel: "email", provider: "resend", error: `HTTP ${res.status}` };
  } catch (e) {
    return { ok: false, channel: "email", provider: "resend", error: (e as Error).name === "TimeoutError" ? "timeout" : "network error" };
  }
}
