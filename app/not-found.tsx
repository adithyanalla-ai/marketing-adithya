import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = { title: { absolute: "Page not found | Adithya Reddy" }, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">Error 404</p>
      <h1 className="mt-2 text-4xl font-semibold">This page has wandered off</h1>
      <p className="mt-4 text-muted">The link may be old or mistyped. Try one of these instead:</p>
      <ul className="mt-6 list-disc space-y-2 pl-5">
        <li><Link className="underline" href="/">Home</Link></li>
        <li><Link className="underline" href="/blog/">Read the blog</Link></li>
        {SERVICES.slice(0, 3).map((s) => (
          <li key={s.slug}><Link className="underline" href={`/services/${s.slug}/`}>{s.name}</Link></li>
        ))}
        <li><Link className="underline" href="/contact/">Contact Adithya</Link></li>
      </ul>
    </div>
  );
}
