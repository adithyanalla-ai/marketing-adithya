const PIECES = [
  { x: "6%", y: "6%", c: "#F4B73F", r: 20 }, { x: "14%", y: "14%", c: "#1D5CFF", r: -35 }, { x: "26%", y: "4%", c: "#14B8A6", r: 50 },
  { x: "38%", y: "12%", c: "#E8548C", r: -15 }, { x: "52%", y: "5%", c: "#F4B73F", r: 70 }, { x: "63%", y: "13%", c: "#1D5CFF", r: 10 },
  { x: "75%", y: "6%", c: "#14B8A6", r: -60 }, { x: "86%", y: "12%", c: "#E8548C", r: 30 }, { x: "94%", y: "4%", c: "#F4B73F", r: -20 },
];

/** Static confetti strip across the top of the page. Decorative only, no animation. */
export function Confetti({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-24 ${className}`}>
      {PIECES.map((p, i) => (
        <span key={i} className="absolute block h-3 w-1.5 rounded-[2px] opacity-80" style={{ left: p.x, top: p.y, background: p.c, transform: `rotate(${p.r}deg)` }} />
      ))}
    </div>
  );
}
