const SPOTS = [
  { x: "8%", y: "18%", s: 14, d: "0s" }, { x: "22%", y: "64%", s: 10, d: "1.1s" }, { x: "41%", y: "10%", s: 12, d: "0.5s" },
  { x: "58%", y: "76%", s: 9, d: "1.7s" }, { x: "72%", y: "22%", s: 15, d: "0.9s" }, { x: "88%", y: "58%", s: 11, d: "2.2s" },
  { x: "94%", y: "14%", s: 9, d: "1.4s" }, { x: "34%", y: "88%", s: 10, d: "0.2s" },
];

/** Twinkling gold sparkles. CSS-only; static under reduced motion. */
export function Sparkles({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {SPOTS.map((p, i) => (
        <svg key={i} viewBox="0 0 24 24" width={p.s} height={p.s} className="sparkle absolute" style={{ left: p.x, top: p.y, animationDelay: p.d }}>
          <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12Z" fill="#F4B73F" />
        </svg>
      ))}
    </div>
  );
}
