import Link from "next/link";
import { Diya } from "./Diya";

/** Slim announcement bar shown during the Diwali window. */
export function FestiveBar() {
  return (
    <div className="relative z-[45] bg-gradient-to-r from-[#0B1630] via-[#1B2A5C] to-[#0B1630] text-white">
      <p className="container-x flex min-h-10 flex-wrap items-center justify-center gap-x-3 gap-y-0 py-2 text-center text-[13px] font-semibold sm:text-sm">
        <Diya size={22} className="shrink-0" />
        <span>Happy Diwali from Adithya Reddy!</span>
        <Link href="/contact/" className="font-bold text-[#FFD36B] underline underline-offset-4 hover:text-white">Planning your festive campaign? Let&apos;s talk</Link>
      </p>
    </div>
  );
}
