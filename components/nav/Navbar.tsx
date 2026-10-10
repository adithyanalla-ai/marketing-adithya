"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoMark, ChevronDownIcon, MenuIcon, CloseIcon } from "../icons";
import { BookCallButton } from "../BookCallButton";

const LINKS = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/services/", label: "Services", match: (p: string) => p.startsWith("/services") },
  { href: "/case-studies/", label: "Case Studies", match: (p: string) => p.startsWith("/case-studies") },
  { href: "/about/", label: "About", match: (p: string) => p.startsWith("/about") },
  { href: "/blog/", label: "Blog", match: (p: string) => p.startsWith("/blog") },
];

const RESOURCES = [
  { href: "/resources/lead-cost-calculator/", label: "Lead Cost Calculator" },
  { href: "/blog/", label: "Blog" },
  { href: "/resources/#tools", label: "Tools I Use" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => { setOpen(false); setDd(false); }, [pathname]);

  useEffect(() => {
    if (!dd) return;
    const click = (e: MouseEvent) => { if (!ddRef.current?.contains(e.target as Node)) setDd(false); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setDd(false); };
    document.addEventListener("mousedown", click);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", click); document.removeEventListener("keydown", key); };
  }, [dd]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", key); };
  }, [open]);

  const link = (active: boolean) =>
    `relative py-2 text-[15px] font-semibold transition-colors ${active ? "text-brand" : "text-ink hover:text-brand"}`;

  return (
    <>
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "border-b border-card-line bg-white/80 shadow-[0_4px_20px_rgba(11,22,48,0.05)] backdrop-blur-lg" : "border-b border-transparent bg-transparent"}`}>
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Adithya Reddy, home">
          <LogoMark />
          <span className="font-display text-[19px] font-extrabold tracking-tight">Adithya Reddy</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => {
            const active = l.match(pathname);
            return (
              <Link key={l.href} href={l.href} className={link(active)} aria-current={active ? "page" : undefined}>
                {l.label}
                {active && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded bg-brand" />}
              </Link>
            );
          })}
          <div className="relative" ref={ddRef}>
            <button type="button" className={`${link(pathname.startsWith("/resources"))} flex items-center gap-1 ${pathname.startsWith("/resources") ? "border-b-2 border-brand" : ""}`} aria-expanded={dd} aria-haspopup="menu" onClick={() => setDd((v) => !v)}>
              Resources <ChevronDownIcon width={16} height={16} className={`transition-transform ${dd ? "rotate-180" : ""}`} />
            </button>
            {dd && (
              <ul role="menu" className="card absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 p-2">
                {RESOURCES.map((r) => (
                  <li key={r.label} role="none">
                    <Link role="menuitem" href={r.href} className="block rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-[#EAF2FF] hover:text-brand">{r.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <BookCallButton className="btn btn-primary hidden !min-h-11 !px-5 text-sm lg:inline-flex">Book a Free Strategy Call</BookCallButton>
          <button type="button" className="grid size-11 place-items-center rounded-xl border border-card-line bg-white lg:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <MenuIcon />
          </button>
        </div>
      </div>

    </header>

      {/* Mobile slide-in menu: sibling of <header> because backdrop-filter would otherwise trap position:fixed */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`} inert={!open}>
        <div className={`absolute inset-0 bg-ink/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <div role="dialog" aria-modal="true" aria-label="Menu" className={`absolute right-0 top-0 flex h-full w-[84%] max-w-sm flex-col gap-1 overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2.5 font-display text-lg font-extrabold"><LogoMark /> Adithya Reddy</span>
            <button type="button" className="grid size-11 place-items-center rounded-xl border border-card-line" aria-label="Close menu" onClick={() => setOpen(false)}><CloseIcon /></button>
          </div>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} tabIndex={open ? 0 : -1} className={`rounded-xl px-3 py-3 text-lg font-bold ${l.match(pathname) ? "bg-[#EAF2FF] text-brand" : ""}`}>{l.label}</Link>
          ))}
          <p className="mt-4 px-3 text-xs font-bold uppercase tracking-wider text-slate">Resources</p>
          {RESOURCES.map((r) => (
            <Link key={r.label} href={r.href} tabIndex={open ? 0 : -1} className="rounded-xl px-3 py-2.5 text-base font-semibold">{r.label}</Link>
          ))}
          <BookCallButton className="btn btn-primary mt-6 w-full">Book a Free Strategy Call</BookCallButton>
        </div>
      </div>
    </>
  );
}
