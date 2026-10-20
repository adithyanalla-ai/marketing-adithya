/** Hanging marigold garland across the top of the page. Decorative; sits behind content. */
const P0 = [0, 6], P1 = [48, 40], P2 = [96, 6];
const at = (t: number) => [
  (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t ** 2 * P2[0],
  (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t ** 2 * P2[1],
];
const FLOWERS = [0.08, 0.26, 0.5, 0.74, 0.92].map(at);

export function Torana({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 z-0 h-[54px] overflow-hidden ${className}`}>
      <svg width="100%" height="54" className="block">
        <defs>
          <pattern id="torana" width="96" height="54" patternUnits="userSpaceOnUse">
            <path d="M0 6 Q48 40 96 6" fill="none" stroke="#B7791F" strokeWidth="1.6" />
            {FLOWERS.map(([x, y], i) => (
              <g key={i} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
                {[0, 60, 120, 180, 240, 300].map((a) => <circle key={a} cx="0" cy="-4.5" r="3.4" fill={i % 2 ? "#FFB020" : "#F59E0B"} transform={`rotate(${a})`} />)}
                <circle r="3.6" fill="#E26B00" /><circle r="1.5" fill="#FFE08A" />
              </g>
            ))}
            <g transform={`translate(${at(0.5)[0]} ${at(0.5)[1] + 5})`}>
              <path d="M0 0v7" stroke="#B7791F" strokeWidth="1.2" />
              <circle cy="10" r="3" fill="#F4B73F" /><circle cy="10" r="1.2" fill="#8A5A00" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="54" fill="url(#torana)" />
      </svg>
    </div>
  );
}
