import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Forwards signups to Buttondown. Set BUTTONDOWN_API_KEY to enable; otherwise responds 503. */
export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  const key = process.env.BUTTONDOWN_API_KEY;
  if (!key) {
    return NextResponse.json({ message: "Newsletter signup is not configured yet." }, { status: 503 });
  }
  const res = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: { Authorization: `Token ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ email_address: email }),
  });
  if (res.ok) return NextResponse.json({ message: "Thanks! Check your inbox to confirm." });
  return NextResponse.json({ message: "Could not subscribe. You may already be on the list." }, { status: 400 });
}
