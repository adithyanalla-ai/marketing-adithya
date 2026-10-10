export const dynamic = "force-static";

/** Serves the IndexNow ownership key. Set INDEXNOW_KEY (8-128 chars, a-z A-Z 0-9 -). */
export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return new Response("Not found", { status: 404 });
  return new Response(key, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
