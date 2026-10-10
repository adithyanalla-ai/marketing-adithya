"use client";
import { useState } from "react";

export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("busy");
    const email = new FormData(e.currentTarget).get("email");
    try {
      const res = await fetch("/api/newsletter/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const j = await res.json();
      setState(res.ok ? "ok" : "err");
      setMsg(j.message ?? "");
    } catch {
      setState("err");
      setMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row" aria-label="Newsletter signup">
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <input
        id="nl-email" name="email" type="email" required placeholder="you@company.com" autoComplete="email"
        className="min-h-11 flex-1 rounded-full border border-line bg-white px-4"
      />
      <button type="submit" disabled={state === "busy"} className="btn btn-primary">Subscribe</button>
      <p role="status" className="text-sm sm:basis-full">{state !== "idle" && state !== "busy" ? msg : ""}</p>
    </form>
  );
}
