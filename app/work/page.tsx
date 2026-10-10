import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBanner } from "@/components/CtaBanner";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "Marketing Case Studies and Results | Adithya Reddy",
  description: "Results from lead pipelines, Meta ads A/B testing and LLM reporting automation, by Hyderabad marketer Adithya Reddy.",
  path: "/work/",
});

export default function Work() {
  const items = SERVICES.flatMap((s) => s.proof.map((p) => ({ ...p, service: s })));
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs items={[{ name: "Work", path: "/work/" }]} />
      <h1 className="mt-6 text-4xl font-semibold">Case studies and results</h1>
      <p className="mt-4 text-muted">Outcomes from my marketing work. More detailed write-ups are published on the blog.</p>
      <ul className="mt-10 space-y-6">
        {items.map((p) => (
          <li key={p.title} className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-2xl font-semibold">{p.title}</h2>
            <p className="mt-2 text-lg">{p.result}</p>
            <p className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
              {p.postSlug && <Link className="text-accent underline" href={`/blog/${p.postSlug}/`}>Read the full write-up</Link>}
              <Link className="text-accent underline" href={`/services/${p.service.slug}/`}>{p.service.name} service</Link>
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-12"><CtaBanner /></div>
    </div>
  );
}
