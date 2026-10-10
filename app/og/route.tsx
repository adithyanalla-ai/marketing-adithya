import { ImageResponse } from "next/og";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Adithya Reddy").slice(0, 120);
  const label = (searchParams.get("label") || "Adithya Reddy").slice(0, 40);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0f172a", color: "#fff", padding: 72 }}>
        <div style={{ display: "flex", fontSize: 28, color: "#fb923c", textTransform: "uppercase", letterSpacing: 4 }}>{label}</div>
        <div style={{ display: "flex", fontSize: title.length > 70 ? 54 : 72, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 28, color: "#cbd5e1" }}>marketing.adithyareddy.online · Hyderabad, India</div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" } },
  );
}
