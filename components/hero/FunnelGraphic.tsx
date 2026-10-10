const BLUE = "#1D5CFF", TEAL = "#14B8A6", ORANGE = "#F59E0B";

const LAYERS = [
  { t: "Attract", s: "Targeted campaigns", fill: BLUE, text: "#fff", top: 280, bot: 250 },
  { t: "Convert", s: "High-performing landing pages", fill: TEAL, text: "#fff", top: 244, bot: 214 },
  { t: "Nurture", s: "Automation and follow-up", fill: ORANGE, text: "#fff", top: 208, bot: 178 },
  { t: "Close", s: "Turn leads into customers", fill: "#fff", text: "#0B1630", top: 172, bot: 142 },
];

export function FunnelGraphic({ className = "" }: { className?: string }) {
  const h = 68, gap = 6, cx = 140;
  return (
    <svg viewBox="0 0 280 290" className={className} role="img" aria-label="Funnel: Attract, Convert, Nurture, Close" style={{ filter: "drop-shadow(0 14px 22px rgba(29,92,255,0.18))" }}>
      {LAYERS.map((l, i) => {
        const y = i * (h + gap);
        const pad = 4;
        const pts = `${cx - l.top / 2 + pad},${y + pad} ${cx + l.top / 2 - pad},${y + pad} ${cx + l.bot / 2 - pad},${y + h - pad} ${cx - l.bot / 2 + pad},${y + h - pad}`;
        return (
          <g key={l.t}>
            <polygon points={pts} fill={l.fill} stroke={i === 3 ? "#D6E3FF" : l.fill} strokeWidth={i === 3 ? 1.5 : 8} strokeLinejoin="round" />
            <text x={cx} y={y + 32} textAnchor="middle" fontSize="16" fontWeight="800" fill={l.text} fontFamily="var(--font-jakarta), sans-serif">{l.t}</text>
            <text x={cx} y={y + 49} textAnchor="middle" fontSize="10.5" fontWeight="600" fill={l.text} fillOpacity={0.92} fontFamily="var(--font-inter), sans-serif">{l.s}</text>
          </g>
        );
      })}
    </svg>
  );
}

