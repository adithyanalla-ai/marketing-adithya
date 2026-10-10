import type { ReactNode } from "react";

/** Wrapper adding the dot-grid corners and soft blue glows used on every page. */
export function Deco({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-x-clip ${className}`}>
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute -left-8 top-20 hidden h-44 w-44 opacity-50 [mask-image:radial-gradient(circle,#000,transparent_70%)] md:block" />
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute -right-8 top-40 hidden h-44 w-44 opacity-40 [mask-image:radial-gradient(circle,#000,transparent_70%)] md:block" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-32 size-[640px]" style={{ background: "radial-gradient(closest-side, rgba(29,92,255,0.13), transparent)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-48 size-[560px]" style={{ background: "radial-gradient(closest-side, rgba(20,184,166,0.10), transparent)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}
