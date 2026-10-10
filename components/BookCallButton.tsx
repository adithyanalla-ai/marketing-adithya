"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";

export function BookCallButton({ children, className = "btn btn-primary" }: { children: ReactNode; className?: string }) {
  const onClick = () => track("book_call_click", { label: "book_call_button" });
  return SITE.bookingUrl.startsWith("http") ? (
    <a href={SITE.bookingUrl} className={className} onClick={onClick}>{children}</a>
  ) : (
    <Link href={SITE.bookingUrl} className={className} onClick={onClick}>{children}</Link>
  );
}
