/**
 * Sanitisers for WhatsApp template parameters.
 * Meta rejects parameters containing newlines, tabs or more than four consecutive spaces,
 * so every user-supplied field passes through `param()` before it is sent.
 */
export const MESSAGE_LIMIT = 500;
export const MESSAGE_NOTE = "... (full message in email)";

// Built from escaped strings so no raw control characters live in the source file.
const CONTROL_CHARS = new RegExp("[\\u0000-\\u001f\\u007f\\u200b-\\u200f\\u2028\\u2029]", "g");

export function param(input: unknown, max = 200): string {
  let s = String(input ?? "");
  s = s.replace(/<[^>]*>/g, " ");                        // strip HTML-like markup
  s = s.replace(/(https?:\/\/|www\.)\S+/gi, "[link removed]"); // neutralise links
  s = s.replace(/[*_~`]/g, "");                            // WhatsApp formatting characters
  s = s.replace(/\r\n|\r|\n/g, " / ");                    // newlines are not allowed
  s = s.replace(/\t/g, " ");
  s = s.replace(CONTROL_CHARS, " ");                      // control and zero-width characters
  s = s.replace(/(\s*\/\s*){2,}/g, " / ");                // collapse repeated separators
  s = s.replace(/ {2,}/g, " ").trim();                    // never more than one space in a row
  if (s.length > max) s = s.slice(0, max - 3).trimEnd() + "...";
  return s;
}

export function messageParam(message: string): string {
  const clean = param(message, 100_000);
  if (clean.length <= MESSAGE_LIMIT) return clean || "Not provided";
  return clean.slice(0, MESSAGE_LIMIT - MESSAGE_NOTE.length).trimEnd() + MESSAGE_NOTE;
}

/** "10 Oct 2026, 03:45 PM" in Asia/Kolkata. */
export function formatReceived(d: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("day")} ${get("month")} ${get("year")}, ${get("hour")}:${get("minute")} ${get("dayPeriod").toUpperCase()}`;
}
