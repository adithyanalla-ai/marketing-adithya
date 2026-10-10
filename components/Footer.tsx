import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-4 border-t border-line bg-white">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <Image src="/brand/logo-full-640.webp" alt="adios.marketing logo" width={200} height={Math.round((200 * 396) / 640)} className="h-auto w-[200px]" />
          <p className="mt-3 font-display text-lg font-semibold">{SITE.name}</p>
          <p className="mt-2 text-sm text-muted">
            Growth and performance marketing from Hyderabad, Telangana, serving businesses across India.
          </p>
        </div>
        <nav aria-label="Services">
          <h2 className="text-sm font-semibold uppercase tracking-wide">Services</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}><Link className="hover:text-accent" href={`/services/${s.slug}/`}>{s.name}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Site">
          <h2 className="text-sm font-semibold uppercase tracking-wide">Site</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-accent" href="/hyderabad-growth-marketing-consultant/">Hyderabad consultant</Link></li>
            <li><Link className="hover:text-accent" href="/blog/">Blog</Link></li>
            <li><Link className="hover:text-accent" href="/case-studies/">Case studies</Link></li>
            <li><Link className="hover:text-accent" href="/resources/">Resources</Link></li>
            <li><Link className="hover:text-accent" href="/about/">About</Link></li>
            <li><Link className="hover:text-accent" href="/contact/">Contact</Link></li>
            <li><a className="hover:text-accent" href="/rss.xml">RSS feed</a></li>
            {SITE.linkedin && <li><a className="hover:text-accent" href={SITE.linkedin} rel="me noopener">LinkedIn profile</a></li>}
          </ul>
        </nav>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-muted">© {new Date().getFullYear()} {SITE.name}</p>
    </footer>
  );
}
