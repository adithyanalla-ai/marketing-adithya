"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Item = { title: string; slug: string; description: string; tags: string[] };

export function BlogSearch({ items }: { items: Item[] }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("q");
    if (p) setQ(p);
  }, []);
  const results = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (n.length < 2) return [];
    return items
      .filter((i) => `${i.title} ${i.description} ${i.tags.join(" ")}`.toLowerCase().includes(n))
      .slice(0, 8);
  }, [q, items]);

  return (
    <div role="search" className="relative">
      <label htmlFor="blog-search" className="sr-only">Search articles</label>
      <input
        id="blog-search" type="search" value={q} onChange={(e) => setQ(e.target.value)}
        placeholder="Search articles" className="min-h-11 w-full rounded-full border border-line bg-white px-4"
      />
      {q.trim().length >= 2 && (
        <ul className="mt-3 space-y-2 rounded-2xl border border-line bg-white p-4" aria-live="polite">
          {results.length === 0 && <li className="text-sm text-muted">No articles match “{q}”.</li>}
          {results.map((r) => (
            <li key={r.slug}>
              <Link className="font-medium hover:text-accent" href={`/blog/${r.slug}/`}>{r.title}</Link>
              <p className="text-sm text-muted">{r.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
