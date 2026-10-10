import { FORMSPREE_ENDPOINT } from "../content/contact";
import { contactSchema } from "./contact-schema";
import { formatSubmitted } from "./format-date";

export type RawForm = { name: string; email: string; company: string; budget: string; message: string; gotcha: string; openedAt: number };
export type SubmitResult =
  | { status: "ok" }
  | { status: "spam" }                       // looked like a bot: the visitor is shown success, nothing was sent
  | { status: "invalid"; errors: Record<string, string> }
  | { status: "error" };                     // network error, 4xx or 5xx; details are never shown to visitors

export const MIN_FILL_MS = 2500;
const TIMEOUT_MS = 15000;

type Deps = { fetchImpl?: typeof fetch; now?: () => number; page?: string; dryRun?: boolean; log?: (...a: unknown[]) => void };

/** The only external call the contact form makes is the POST to Formspree. */
export async function submitContact(input: RawForm, deps: Deps = {}): Promise<SubmitResult> {
  const now = deps.now ?? Date.now;
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] ??= i.message;
    return { status: "invalid", errors };
  }
  // Honeypot filled, or sent faster than a person can type: pretend success and send nothing.
  if (input.gotcha.trim() || now() - input.openedAt < MIN_FILL_MS) return { status: "spam" };

  const d = parsed.data;
  const payload = {
    name: d.name,
    email: d.email, // Formspree uses the field named "email" as the reply-to
    company: d.company || "Not provided",
    budget_range: d.budget,
    message: d.message,
    _subject: `New website enquiry from ${d.name.replace(/[\r\n]+/g, " ")}`,
    page: deps.page ?? (typeof window !== "undefined" ? window.location.href : ""),
    submitted_at: formatSubmitted(new Date(now())),
  };

  if (deps.dryRun) {
    (deps.log ?? console.log)("[contact] DRY RUN: not posting. Payload:", JSON.stringify(payload, null, 2));
    return { status: "ok" };
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await (deps.fetchImpl ?? fetch)(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    return res.ok ? { status: "ok" } : { status: "error" };
  } catch {
    return { status: "error" };
  } finally {
    clearTimeout(timer);
  }
}

/** Dry run is development-only and can never be switched on in a production build. */
export const DRY_RUN = process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_CONTACT_DRY_RUN === "true";
