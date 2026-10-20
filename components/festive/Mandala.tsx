/** Decorative rangoli-style mandala (line art), used as a faint watermark. */
export function Mandala({ size = 520, className = "" }: { size?: number; className?: string }) {
  const rings = [
    { r: 40, n: 8, rx: 9, ry: 22, c: "#E0A030" },
    { r: 82, n: 12, rx: 11, ry: 28, c: "#1D5CFF" },
    { r: 128, n: 16, rx: 12, ry: 30, c: "#E0A030" },
    { r: 176, n: 20, rx: 12, ry: 30, c: "#1D5CFF" },
    { r: 222, n: 24, rx: 11, ry: 26, c: "#E0A030" },
  ];
  return (
    <svg width={size} height={size} viewBox="-260 -260 520 520" aria-hidden="true" className={className} fill="none">
      {rings.map((ring) =>
        Array.from({ length: ring.n }, (_, i) => (
          <ellipse key={`${ring.r}-${i}`} cx="0" cy={-ring.r} rx={ring.rx} ry={ring.ry} stroke={ring.c} strokeWidth="1.4" transform={`rotate(${(360 / ring.n) * i})`} />
        )),
      )}
      {[60, 105, 150, 200, 245].map((r) => <circle key={r} r={r} stroke="#E0A030" strokeOpacity=".45" strokeWidth="1" strokeDasharray="2 6" />)}
      <circle r="14" stroke="#E0A030" strokeWidth="1.6" />
      <circle r="5" fill="#E0A030" />
    </svg>
  );
}
