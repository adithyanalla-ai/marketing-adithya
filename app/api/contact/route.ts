import { NextResponse } from "next/server";
import { z } from "zod";
import { BUDGETS } from "@/content/contact";
import { rateLimited } from "@/lib/rate-limit";
import { build as buildWhatsApp, sendWhatsApp } from "@/lib/notify/whatsapp";
import { buildEmail, sendEmail } from "@/lib/notify/email";
import type { Lead } from "@/lib/notify/types";

export const dynamic = "force-dynamic";

const clean = (max: number) => z.string().transform((s) => s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, " ").trim()).pipe(z.string().max(max));

const schema = z.object({
  name: clean(100).pipe(z.string().min(2, "Please enter your name.")),
  email: clean(200).pipe(z.string().email("Please enter a valid email address.")),
  company: clean(150).optional().default(""),
  budget: clean(60).optional().default("Not sure yet"),
  message: clean(4000).pipe(z.string().min(10, "Please tell me a little more (at least 10 characters).")),
  website: z.string().optional().default(""), // honeypot
  t: z.coerce.number().optional().default(0),  // time the form was opened
});

const OK = { message: "Thanks, your message has been sent." };
const KEEP = new Set(["provider", "method", "Content-Type", "Authorization", "messaging_product", "type"]);
/** Replaces every string except a few structural keys, so no visitor detail (including the reply-to address) is logged in production. */
const redact = (o: unknown) => JSON.parse(JSON.stringify(o, (k, v) => (typeof v === "string" && !KEEP.has(k) ? `<redacted ${v.length} chars>` : v)));

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const raw = await req.json().catch(() => null);
  if (!raw || typeof raw !== "object") return NextResponse.json({ message: "Invalid request." }, { status: 400 });

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] ??= i.message;
    return NextResponse.json({ message: "Please check the form.", errors }, { status: 400 });
  }
  const d = parsed.data;

  // Spam: drop silently and look successful so bots do not retry. Honeypot filled, or submitted faster than a person can.
  if (d.website.trim() || Date.now() - d.t < 2500) return NextResponse.json(OK);
  if (rateLimited(ip)) return NextResponse.json({ message: "Too many messages. Please try again later." }, { status: 429 });

  const lead: Lead = { name: d.name, email: d.email, company: d.company, budget: (BUDGETS as readonly string[]).includes(d.budget) ? d.budget : "Not sure yet", message: d.message, receivedAt: new Date() };

  if (process.env.CONTACT_DRY_RUN === "true") {
    const payload = { whatsapp: buildWhatsApp(lead), email: buildEmail(lead) };
    // Production never prints visitor details.
    console.log("[contact] DRY RUN", JSON.stringify(process.env.NODE_ENV === "production" ? redact(payload) : payload, null, 2));
    return NextResponse.json(OK);
  }

  const [wa, mail] = await Promise.all([sendWhatsApp(lead), sendEmail(lead)]);

  if (!wa.ok && !mail.ok) {
    // Never lose a lead silently: log the failure (no visitor details) and tell the visitor.
    console.error("[contact] LEAD NOT DELIVERED", { at: lead.receivedAt.toISOString(), whatsapp: wa.error, email: mail.error });
    return NextResponse.json({ message: "We could not send your message. Please use the phone or WhatsApp options on this page." }, { status: 502 });
  }
  if (!wa.ok) console.error("[contact] WhatsApp notification failed (email delivered)", { provider: wa.provider, error: wa.error });
  if (!mail.ok) console.error("[contact] Email backup failed (WhatsApp delivered)", { error: mail.error });
  return NextResponse.json(OK);
}
