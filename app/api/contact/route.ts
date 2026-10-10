import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const hits = new Map<string, number[]>();
const LIMIT = 5; // submissions per IP per hour (per server instance; use a shared store such as Upstash for multi-instance deployments)

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, max);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ message: "Invalid request." }, { status: 400 });

  // Honeypot: bots fill the hidden field. Pretend success so they do not retry.
  if (clean(body.website, 200)) return NextResponse.json({ message: "Thanks, your message has been sent." });
  // Humans take more than a couple of seconds to fill the form.
  if (Date.now() - Number(body.t || 0) < 2500) return NextResponse.json({ message: "Please try again." }, { status: 400 });
  if (limited(ip)) return NextResponse.json({ message: "Too many messages. Please try again later." }, { status: 429 });

  const name = clean(body.name, 100), email = clean(body.email, 200), company = clean(body.company, 150);
  const budget = clean(body.budget, 60), message = clean(body.message, 4000);
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please tell me a little more (at least 10 characters).";
  if (Object.keys(errors).length) return NextResponse.json({ message: "Please check the form.", errors }, { status: 400 });

  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) {
    return NextResponse.json({ message: "The contact form is not connected yet. Please use the email or LinkedIn links on this page." }, { status: 503 });
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Website <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      html: `<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Company:</b> ${esc(company) || "-"}<br><b>Budget:</b> ${esc(budget) || "-"}</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });
  if (!res.ok) return NextResponse.json({ message: "Could not send your message. Please email me directly." }, { status: 502 });
  return NextResponse.json({ message: "Thanks, your message has been sent." });
}
