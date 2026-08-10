import Redis from 'ioredis'

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  /** Seconds until the current window resets. */
  retryAfter: number
}

/* ------------------------------------------------------------------ *
 * Redis client, shared across route handlers and dev hot reloads.
 * ------------------------------------------------------------------ */

const globalForRedis = globalThis as unknown as { rateLimitRedis?: Redis | null }

function getRedis(): Redis | null {
  if (globalForRedis.rateLimitRedis !== undefined) return globalForRedis.rateLimitRedis

  const url = process.env.REDIS_URL
  if (!url) {
    console.warn('[rateLimit] REDIS_URL is not set — falling back to per-process in-memory limiting.')
    globalForRedis.rateLimitRedis = null
    return null
  }

  const client = new Redis(url, {
    // A Redis hiccup must never hang a form submission.
    connectTimeout: 2000,
    commandTimeout: 1000,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
  })
  client.on('error', (err) => console.error('[rateLimit] Redis error:', err.message))

  globalForRedis.rateLimitRedis = client
  return client
}

/* ------------------------------------------------------------------ *
 * In-memory fallback — only correct within a single process. Used in
 * local dev and if Redis becomes unreachable.
 * ------------------------------------------------------------------ */

interface MemoryEntry {
  count: number
  resetAt: number
}
const memoryStore = new Map<string, MemoryEntry>()

function memoryLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  const entry = memoryStore.get(key)

  if (!entry || entry.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs })
    if (memoryStore.size > 10_000) {
      // forEach rather than for...of: tsconfig has no `target`, so tsc
      // typechecks against ES5 and refuses to iterate a Map directly.
      memoryStore.forEach((v, k) => {
        if (v.resetAt <= now) memoryStore.delete(k)
      })
    }
    return { allowed: true, remaining: limit - 1, retryAfter: Math.ceil(windowMs / 1000) }
  }

  const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000))
  if (entry.count >= limit) return { allowed: false, remaining: 0, retryAfter }

  entry.count++
  return { allowed: true, remaining: limit - entry.count, retryAfter }
}

/* ------------------------------------------------------------------ */

/**
 * Fixed-window rate limit shared across every app instance via Redis.
 *
 * Fails open: if Redis is down we fall back to in-memory counting rather
 * than turning away real customers trying to request a quote.
 *
 * @param identifier usually the client IP
 * @param limit      max requests allowed per window
 * @param windowMs   window length in milliseconds
 */
export async function rateLimit(
  identifier: string,
  limit = 5,
  windowMs = 15 * 60 * 1000
): Promise<RateLimitResult> {
  const windowSeconds = Math.max(1, Math.ceil(windowMs / 1000))
  // Bucket the key by window so counters expire cleanly and an old window
  // can never leak into a new one.
  const bucket = Math.floor(Date.now() / (windowSeconds * 1000))
  const key = `rl:${identifier}:${windowSeconds}:${bucket}`

  const redis = getRedis()
  if (!redis) return memoryLimit(`${identifier}:${windowSeconds}`, limit, windowMs)

  try {
    const results = await redis.multi().incr(key).expire(key, windowSeconds).exec()
    const incrErr = results?.[0]?.[0]
    if (incrErr) throw incrErr

    const count = Number(results?.[0]?.[1] ?? 0)
    if (!Number.isFinite(count) || count <= 0) throw new Error('Unexpected INCR reply')

    const elapsed = Date.now() % (windowSeconds * 1000)
    const retryAfter = Math.max(1, Math.ceil((windowSeconds * 1000 - elapsed) / 1000))

    if (count > limit) return { allowed: false, remaining: 0, retryAfter }
    return { allowed: true, remaining: limit - count, retryAfter }
  } catch (err) {
    console.error('[rateLimit] Redis unavailable, falling back to in-memory:', err)
    return memoryLimit(`${identifier}:${windowSeconds}`, limit, windowMs)
  }
}
