import type { ReactNode } from "react";
import { Mandala } from "../festive/Mandala";
import { Torana } from "../festive/Torana";
import { isFestive } from "@/content/theme";

/** Wrapper adding the dot-grid corners and soft blue glows used on every page. */
export function Deco({ children, className = "" }: { children: ReactNode; className?: string }) {
  const festive = isFestive();
  return (
    <div className={`relative overflow-x-clip ${className}`}>
      {festive && <Torana />}
      {festive && <Mandala size={560} className="pointer-events-none absolute -right-40 top-24 hidden opacity-[0.16] lg:block" />}
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute -left-8 top-20 hidden h-44 w-44 opacity-50 [mask-image:radial-gradient(circle,#000,transparent_70%)] md:block" />
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute -right-8 top-40 hidden h-44 w-44 opacity-40 [mask-image:radial-gradient(circle,#000,transparent_70%)] md:block" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-32 size-[640px]" style={{ background: festive ? "radial-gradient(closest-side, rgba(255,176,32,0.26), transparent)" : "radial-gradient(closest-side, rgba(29,92,255,0.13), transparent)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-48 size-[560px]" style={{ background: festive ? "radial-gradient(closest-side, rgba(29,92,255,0.10), transparent)" : "radial-gradient(closest-side, rgba(20,184,166,0.10), transparent)" }} />
      <div className={festive ? "relative pt-11" : "relative"}>{children}</div>
    </div>
  );
}
