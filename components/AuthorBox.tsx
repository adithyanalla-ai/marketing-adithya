import Link from "next/link";
import { SITE } from "@/lib/site";

export function AuthorBox() {
  return (
    <aside aria-label="About the author" className="card p-6">
      <h2 className="text-lg">Written by {SITE.name}</h2>
      <p className="mt-2 text-slate">
        I am a growth and performance marketer in Hyderabad, India. I work on lead generation, Meta ads,
        marketing analytics and LLM automation, and I have published research in machine learning.
      </p>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
        <Link className="text-brand underline" href="/about/">About me</Link>
        {SITE.linkedin && <a className="text-brand underline" rel="me noopener" href={SITE.linkedin}>LinkedIn</a>}
        <Link className="text-brand underline" href="/about/#research">Published research</Link>
        {SITE.ssrn && <a className="text-brand underline" rel="me noopener" href={SITE.ssrn}>SSRN</a>}
        <a className="text-brand underline" rel="me noopener" href={SITE.portfolio}>Portfolio</a>
      </p>
    </aside>
  );
}
