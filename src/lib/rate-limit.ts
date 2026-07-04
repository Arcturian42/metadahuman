/**
 * Best-effort in-memory rate limiter (fixed window per key).
 *
 * MVP mitigation against report-generation abuse / runaway OpenAI cost (PRD §23).
 * Note: on serverless this is per-instance, not global — good enough to blunt a
 * simple flood, but swap for a shared store (e.g. Upstash Redis) for a hard,
 * cross-instance guarantee before heavy traffic.
 */
interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  // Opportunistic cleanup so the map doesn't grow unbounded on a long-lived instance.
  if (buckets.size > 10_000) {
    buckets.forEach((b, k) => {
      if (now >= b.resetAt) buckets.delete(k);
    });
  }
  return { allowed: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}

/** Extract a client identifier from proxy headers (Vercel sets x-forwarded-for). */
export function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = fwd ? fwd.split(",")[0].trim() : req.headers.get("x-real-ip") || "unknown";
  return ip;
}
