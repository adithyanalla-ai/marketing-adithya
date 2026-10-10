const hits = new Map<string, number[]>();

/**
 * In-memory limiter: LIMIT submissions per IP per hour. On serverless hosting each instance has its own memory,
 * so this is a best-effort guard; use a shared store (for example Upstash Redis) for a strict limit.
 */
export function rateLimited(ip: string, limit = 5, windowMs = 3_600_000): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  return recent.length > limit;
}
