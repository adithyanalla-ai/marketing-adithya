import Link from "next/link";

export function Pagination({ page, pages, base }: { page: number; pages: number; base: string }) {
  if (pages <= 1) return null;
  const href = (n: number) => (n === 1 ? `${base}/` : `${base}/page/${n}/`);
  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      {page > 1 && <Link rel="prev" className="btn btn-ghost" href={href(page - 1)}>Previous</Link>}
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <Link key={n} href={href(n)} aria-current={n === page ? "page" : undefined}
          className={`btn ${n === page ? "btn-primary" : "btn-ghost"}`} aria-label={`Page ${n}`}>{n}</Link>
      ))}
      {page < pages && <Link rel="next" className="btn btn-ghost" href={href(page + 1)}>Next</Link>}
    </nav>
  );
}
