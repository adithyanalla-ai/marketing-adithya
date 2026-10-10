import Link from "next/link";
import { SITE } from "@/lib/site";

export function CtaBanner({ heading = "Want this working in your business?" }: { heading?: string }) {
  const external = SITE.bookingUrl.startsWith("http");
  return (
    <section aria-labelledby="cta-h" className="rounded-3xl bg-ink p-8 text-white md:p-12">
      <h2 id="cta-h" className="text-2xl font-semibold md:text-3xl">{heading}</h2>
      <p className="mt-3 max-w-xl text-slate-300">Book a free call and we will look at your current numbers and decide what to fix first.</p>
      {external ? (
        <a className="btn btn-primary mt-6" href={SITE.bookingUrl}>Book a call</a>
      ) : (
        <Link className="btn btn-primary mt-6" href={SITE.bookingUrl}>Book a call</Link>
      )}
    </section>
  );
}
