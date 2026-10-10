import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-display text-lg font-semibold">{SITE.name}</Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium">
            {NAV.filter((n) => n.href !== "/").map((n) => (
              <li key={n.href}><Link href={n.href} className="py-2 hover:text-accent">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
