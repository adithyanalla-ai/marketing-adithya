import type { TocItem } from "@/lib/blog";

export function Toc({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;
  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-line bg-white p-5">
      <h2 className="text-base font-semibold">On this page</h2>
      <ol className="mt-3 space-y-1.5 text-sm">
        {items.map((i) => (
          <li key={i.id} className={i.depth === 3 ? "ml-4" : ""}>
            <a className="hover:text-accent" href={`#${i.id}`}>{i.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
