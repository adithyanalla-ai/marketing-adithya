"use client";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track } from "@/lib/analytics";

/** Anchor that reports a GA4 event on click. */
export function TrackedLink({ event, label, children, ...rest }: { event: "book_call_click" | "outbound_click"; label: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...rest} onClick={(e) => { track(event, { label }); rest.onClick?.(e); }}>{children}</a>;
}
