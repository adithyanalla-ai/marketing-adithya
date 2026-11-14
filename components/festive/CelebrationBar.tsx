import Link from "next/link";
import { celebrationGreeting } from "@/content/theme";
import { StarBurst } from "./StarBurst";

/** Slim announcement bar for the Christmas, New Year and Sankranti windows. */
export function CelebrationBar() {
  const { greeting, cta } = celebrationGreeting();
  return (
    <div className="relative z-[45] bg-gradient-to-r from-[#0B1630] via-[#2A2570] to-[#0B1630] text-white">
      <p className="container-x flex min-h-10 flex-wrap items-center justify-center gap-x-3 gap-y-0 py-2 text-center text-[13px] font-semibold sm:text-sm">
        <StarBurst size={20} className="shrink-0" />
        <span>{greeting}</span>
        <Link href="/contact/" className="font-bold text-[#FFD36B] underline underline-offset-4 hover:text-white">{cta}</Link>
      </p>
    </div>
  );
}
