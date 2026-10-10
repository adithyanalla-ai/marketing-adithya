import Link from "next/link";
import { SITE } from "@/lib/site";

export function AuthorBox() {
  return (
    <aside aria-label="About the author" className="rounded-2xl border border-line bg-white p-6">
      <h2 className="text-lg font-semibold">Written by {SITE.name}</h2>
      <p className="mt-2 text-muted">
        I am a growth and performance marketer in Hyderabad, India. I work on lead generation, Meta ads,
        marketing analytics and LLM automation.
      </p>
      <p className="mt-3 flex flex-wrap gap-4 text-sm font-medium">
        {SITE.linkedin && <a className="underline" rel="me noopener" href={SITE.linkedin}>{SITE.name} on LinkedIn</a>}
        <a className="underline" rel="me noopener" href={SITE.portfolio}>Portfolio</a>
        <Link className="underline" href="/about/">About me</Link>
      </p>
    </aside>
  );
}
