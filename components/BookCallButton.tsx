import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

export function BookCallButton({ children, className = "btn btn-primary" }: { children: ReactNode; className?: string }) {
  return SITE.bookingUrl.startsWith("http") ? (
    <a href={SITE.bookingUrl} className={className}>{children}</a>
  ) : (
    <Link href={SITE.bookingUrl} className={className}>{children}</Link>
  );
}
