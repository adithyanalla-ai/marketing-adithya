import { formatReceived, messageParam, param } from "./sanitize";
import type { Lead, NotifyResult } from "./types";

export type Provider = "meta" | "twilio" | "callmebot";

const TIMEOUT_MS = 8000;
const env = (k: string) => (process.env[k] ?? "").trim();
export const provider = (): Provider => {
  const p = env("WHATSAPP_PROVIDER").toLowerCase();
  return p === "twilio" || p === "callmebot" ? p : "meta";
};
const ownerNumber = () => env("OWNER_WHATSAPP_NUMBER").replace(/[^\d]/g, ""); // E.164 digits, e.g. 918712569303

const REQUIRED: Record<Provider, string[]> = {
  meta: ["META_WA_TOKEN", "META_WA_PHONE_NUMBER_ID", "OWNER_WHATSAPP_NUMBER"],
  twilio: ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_WHATSAPP_FROM", "OWNER_WHATSAPP_NUMBER"],
  callmebot: ["CALLMEBOT_API_KEY", "OWNER_WHATSAPP_NUMBER"],
};
export const missingEnv = (p: Provider = provider()) => REQUIRED[p].filter((k) => !env(k));

let warned = false;
function warnMissing(p: Provider, missing: string[]) {
  if (warned) return;
  warned = true;
  console.error(`[contact] WhatsApp provider "${p}" is not configured. Missing env vars: ${missing.join(", ")}`);
}

/** The six template variables, in order: name, email, company, budget, message, received. */
export function templateParams(lead: Lead): string[] {
  return [
    param(lead.name, 100) || "Not provided",
    param(lead.email, 200) || "Not provided",
    param(lead.company, 150) || "Not provided",
    param(lead.budget, 60) || "Not provided",
    messageParam(lead.message),
    formatReceived(lead.receivedAt),
  ];
}

/** Plain-text rendering of the same message, for providers that cannot use templates. */
export const plainText = (p: string[]) =>
  `New website enquiry\nName: ${p[0]}\nEmail: ${p[1]}\nCompany: ${p[2]}\nBudget range: ${p[3]}\nHow can I help: ${p[4]}\nReceived: ${p[5]} | marketing.adithyareddy.online`;

export type Built = { provider: Provider; request: { method: "POST" | "GET"; url: string; headers: Record<string, string>; body?: string } };

export function build(lead: Lead): Built {
  const p = templateParams(lead);
  const to = ownerNumber();
  const prov = provider();
  if (prov === "meta") {
    const body = {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: env("META_WA_TEMPLATE_NAME") || "new_website_lead",
        language: { code: env("META_WA_TEMPLATE_LANG") || "en" },
        components: [{ type: "body", parameters: p.map((text) => ({ type: "text", text })) }],
      },
    };
    return {
      provider: prov,
      request: {
        method: "POST",
        url: `https://graph.facebook.com/v21.0/${env("META_WA_PHONE_NUMBER_ID") || "{PHONE_NUMBER_ID}"}/messages`,
        headers: { Authorization: "Bearer <META_WA_TOKEN>", "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    };
  }
  if (prov === "twilio") {
    const form = new URLSearchParams({ To: `whatsapp:+${to}`, From: env("TWILIO_WHATSAPP_FROM").startsWith("whatsapp:") ? env("TWILIO_WHATSAPP_FROM") : `whatsapp:${env("TWILIO_WHATSAPP_FROM")}` });
    if (env("TWILIO_CONTENT_SID")) {
      form.set("ContentSid", env("TWILIO_CONTENT_SID"));
      form.set("ContentVariables", JSON.stringify(Object.fromEntries(p.map((v, i) => [String(i + 1), v]))));
    } else form.set("Body", plainText(p));
    return {
      provider: prov,
      request: {
        method: "POST",
        url: `https://api.twilio.com/2010-04-01/Accounts/${env("TWILIO_ACCOUNT_SID") || "{ACCOUNT_SID}"}/Messages.json`,
        headers: { Authorization: "Basic <SID:TOKEN>", "Content-Type": "application/x-www-form-urlencoded" },
        body: form.toString(),
      },
    };
  }
  const q = new URLSearchParams({ phone: `+${to}`, text: plainText(p), apikey: "<CALLMEBOT_API_KEY>" });
  return { provider: prov, request: { method: "GET", url: `https://api.callmebot.com/whatsapp.php?${q}`, headers: {} } };
}

/** Sends the owner notification. Never throws; the caller decides what to do with a failure. */
export async function sendWhatsApp(lead: Lead): Promise<NotifyResult> {
  const prov = provider();
  const missing = missingEnv(prov);
  if (missing.length) {
    warnMissing(prov, missing);
    return { ok: false, channel: "whatsapp", provider: prov, skipped: true, error: `missing env: ${missing.join(", ")}` };
  }
  const { request } = build(lead);
  // Put real credentials in place of the redacted placeholders used for dry-run display.
  const headers = { ...request.headers };
  let url = request.url;
  if (prov === "meta") headers.Authorization = `Bearer ${env("META_WA_TOKEN")}`;
  if (prov === "twilio") headers.Authorization = "Basic " + Buffer.from(`${env("TWILIO_ACCOUNT_SID")}:${env("TWILIO_AUTH_TOKEN")}`).toString("base64");
  if (prov === "callmebot") url = url.replace(encodeURIComponent("<CALLMEBOT_API_KEY>"), encodeURIComponent(env("CALLMEBOT_API_KEY")));
  try {
    const res = await fetch(url, { method: request.method, headers, body: request.body, signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (res.ok) return { ok: true, channel: "whatsapp", provider: prov };
    let code = String(res.status);
    try {
      const j = (await res.json()) as { error?: { code?: number | string; message?: string } };
      if (j?.error?.code !== undefined) code = `${res.status}/${j.error.code}`;
    } catch { /* body is not JSON */ }
    return { ok: false, channel: "whatsapp", provider: prov, error: `HTTP ${code}` };
  } catch (e) {
    return { ok: false, channel: "whatsapp", provider: prov, error: (e as Error).name === "TimeoutError" ? "timeout" : "network error" };
  }
}
