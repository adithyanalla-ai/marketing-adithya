/** Handwritten note with a curved arrow. Decorative, so hidden from assistive tech. */
export function Annotation({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <p className="-rotate-[8deg] text-center font-hand text-[26px] font-medium leading-[1.05] text-slate">
        {lines.map((l) => <span key={l} className="block">{l}</span>)}
      </p>
      <svg viewBox="0 0 90 50" width="90" height="50" className="ml-10 mt-1 text-slate" fill="none">
        <path d="M6 8c18 22 44 30 70 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="m66 20 11 6-12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
