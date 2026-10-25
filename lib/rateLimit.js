import crypto from 'crypto';

// Server-side rate limiting for /api/analyze (every photo check costs a real
// AI API call, and the "3 free checks" counter in the browser can be reset by
// refreshing the page, so the real limit has to live on the server).
//
// Three counters are checked, cheapest first:
//   1. per visitor, per minute  (stops rapid-fire scripts)
//   2. per visitor, per day     (stops one person burning through the budget)
//   3. whole site, per day      (hard ceiling on worst-case spend, even if
//                                someone rotates IP addresses)
//
// Where the counters live:
//   - If a Redis database is connected (Upstash via Vercel; env vars below) the
//     counters are shared by every serverless instance, so the limits are exact.
//   - If not, it falls back to per-instance memory. That still blocks casual
//     abuse on a warm instance, but Vercel can run several instances and
//     restarts them often, so treat it as best-effort until Redis is connected.
//
// Visitor IPs are hashed before being stored, so no raw IP addresses are kept.
//
// Environment variables (all optional):
//   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN   (or KV_REST_API_URL / KV_REST_API_TOKEN)
//   ANALYZE_LIMIT_PER_MINUTE      default 5
//   ANALYZE_LIMIT_PER_DAY         default 20   (per visitor)
//   ANALYZE_LIMIT_GLOBAL_PER_DAY  default 300  (whole site)
//   RATE_LIMIT_SALT               any random string, used when hashing IPs

const TZ = 'Australia/Melbourne';
const DAY_TTL_SECONDS = 36 * 60 * 60;
const REDIS_TIMEOUT_MS = 2000;

const EMERGENCY_HINT = "If you may have been bitten or stung, don't wait for a photo result. Call 000 now.";

function positiveInt(value, fallback) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function getLimits() {
  return {
    perMinute: positiveInt(process.env.ANALYZE_LIMIT_PER_MINUTE, 5),
    perDay: positiveInt(process.env.ANALYZE_LIMIT_PER_DAY, 20),
    globalPerDay: positiveInt(process.env.ANALYZE_LIMIT_GLOBAL_PER_DAY, 300),
  };
}

// Finds the Redis connection details that Vercel's Upstash integration adds
// as environment variables. The integration lets you choose a name prefix, so
// besides the two standard pairs we also accept any "<PREFIX>_REST_API_URL" +
// "<PREFIX>_REST_API_TOKEN" pair (for example STORAGE_REST_API_URL). The
// read-only token is never used: counters need to be written.
function redisConfig() {
  const env = process.env;
  const clean = (url) => url.replace(/\/$/, '');

  const standardPairs = [
    ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
    ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
  ];
  for (const [urlKey, tokenKey] of standardPairs) {
    if (env[urlKey] && env[tokenKey]) return { url: clean(env[urlKey]), token: env[tokenKey] };
  }

  for (const key of Object.keys(env)) {
    const match = key.match(/^(.+)_REST_API_URL$/);
    if (match && env[key] && env[`${match[1]}_REST_API_TOKEN`]) {
      return { url: clean(env[key]), token: env[`${match[1]}_REST_API_TOKEN`] };
    }
  }
  return null;
}

// ---------- counters ----------

// keys: [{ key, ttl }] -> array of counts (after incrementing each by 1).
async function redisIncrement(cfg, keys) {
  // SET key 0 EX ttl NX creates the counter with an expiry only if it does not
  // exist yet; INCR then bumps it. Both are sent in a single HTTP request.
  const commands = keys.flatMap(({ key, ttl }) => [
    ['SET', key, '0', 'EX', String(ttl), 'NX'],
    ['INCR', key],
  ]);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REDIS_TIMEOUT_MS);
  try {
    const res = await fetch(`${cfg.url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(commands),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Redis HTTP ${res.status}`);
    const out = await res.json();
    return keys.map((_, i) => {
      const reply = out[i * 2 + 1];
      if (!reply || reply.error || typeof reply.result !== 'number') {
        throw new Error(`Unexpected Redis reply: ${JSON.stringify(reply)}`);
      }
      return reply.result;
    });
  } finally {
    clearTimeout(timer);
  }
}

const memory = new Map(); // key -> { count, expires }

function memoryIncrement(keys) {
  const now = Date.now();
  if (memory.size > 5000) {
    for (const [k, v] of memory) if (v.expires <= now) memory.delete(k);
    if (memory.size > 20000) memory.clear();
  }
  return keys.map(({ key, ttl }) => {
    let entry = memory.get(key);
    if (!entry || entry.expires <= now) {
      entry = { count: 0, expires: now + ttl * 1000 };
      memory.set(key, entry);
    }
    entry.count += 1;
    return entry.count;
  });
}

async function increment(keys) {
  const cfg = redisConfig();
  if (cfg) {
    try {
      return { counts: await redisIncrement(cfg, keys), store: 'redis' };
    } catch (err) {
      // Never block real users because the limiter's database hiccuped.
      console.error('Rate limiter: Redis unavailable, using in-memory fallback:', err.message);
    }
  }
  return { counts: memoryIncrement(keys), store: 'memory' };
}

// ---------- helpers ----------

export function getClientIp(req) {
  // On Vercel these headers are set by the platform and cannot be spoofed by
  // the visitor.
  const real = req.headers['x-real-ip'];
  if (real) return String(real).trim();
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return String(forwarded).split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

function hashIp(ip) {
  const salt = process.env.RATE_LIMIT_SALT || 'wildguardian';
  return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
}

function melbourneParts(date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type).value;
  return {
    day: `${get('year')}-${get('month')}-${get('day')}`,
    secondsIntoDay: Number(get('hour')) * 3600 + Number(get('minute')) * 60 + Number(get('second')),
  };
}

function message(reason, limits) {
  switch (reason) {
    case 'minute':
      return `You're sending photos too quickly. Please wait a minute and try again. ${EMERGENCY_HINT}`;
    case 'day':
      return `You've reached today's limit of ${limits.perDay} photo checks from this connection. Please try again tomorrow. You can still browse the species database and safety guides. ${EMERGENCY_HINT}`;
    default:
      return `WildGuardian's photo check has reached its daily capacity. Please try again tomorrow. You can still browse the species database and safety guides. ${EMERGENCY_HINT}`;
  }
}

// ---------- public API ----------

/**
 * @returns {Promise<{allowed: boolean, store: 'redis'|'memory', reason?: string,
 *                    status?: number, retryAfter?: number, message?: string}>}
 */
export async function checkRateLimit(req) {
  const limits = getLimits();
  const now = new Date();
  const { day, secondsIntoDay } = melbourneParts(now);
  const id = hashIp(getClientIp(req));
  const minuteBucket = Math.floor(now.getTime() / 60000);
  const secondsToMidnight = Math.max(60, 86400 - secondsIntoDay);

  // Per-visitor counters first. Requests blocked here never touch the global
  // counter, so one abuser cannot use up everyone else's daily allowance.
  const visitor = await increment([
    { key: `wg:rl:min:${id}:${minuteBucket}`, ttl: 120 },
    { key: `wg:rl:day:${id}:${day}`, ttl: DAY_TTL_SECONDS },
  ]);
  const [minuteCount, dayCount] = visitor.counts;

  if (minuteCount > limits.perMinute) {
    return {
      allowed: false,
      reason: 'minute',
      status: 429,
      retryAfter: 60 - now.getUTCSeconds(),
      store: visitor.store,
      message: message('minute', limits),
    };
  }
  if (dayCount > limits.perDay) {
    return {
      allowed: false,
      reason: 'day',
      status: 429,
      retryAfter: secondsToMidnight,
      store: visitor.store,
      message: message('day', limits),
    };
  }

  const site = await increment([{ key: `wg:rl:global:${day}`, ttl: DAY_TTL_SECONDS }]);
  if (site.counts[0] > limits.globalPerDay) {
    return {
      allowed: false,
      reason: 'global',
      status: 503,
      retryAfter: secondsToMidnight,
      store: site.store,
      message: message('global', limits),
    };
  }

  return { allowed: true, store: site.store };
}

/**
 * Diagnostic used by /api/rate-limit-status. Runs the limiter's real Redis
 * code path once and reports whether it works. It never returns the
 * connection URL, token, visitor data or counter values.
 */
export async function rateLimitSelfTest() {
  const limits = getLimits();
  const cfg = redisConfig();
  if (!cfg) {
    // Only a COUNT of Redis-looking variables is reported, never their names or values.
    const redisLikeVariables = Object.keys(process.env).filter((k) => /(REDIS|UPSTASH|KV_|REST_API)/.test(k)).length;
    const hint =
      redisLikeVariables === 0
        ? 'No Redis variables reach this deployment. Connect the database to this project, enable Production, then redeploy.'
        : 'Redis-like variables exist but none match a known naming pattern. Send the variable NAMES (not values) to your developer.';
    return { store: 'memory', redisConfigured: false, redisWorking: false, redisLikeVariables, hint, limits };
  }
  const started = Date.now();
  try {
    await redisIncrement(cfg, [{ key: 'wg:rl:selftest', ttl: 60 }]);
    return { store: 'redis', redisConfigured: true, redisWorking: true, latencyMs: Date.now() - started, limits };
  } catch (err) {
    const message = String((err && err.message) || 'unknown error')
      .replace(/https?:\/\/\S+/g, '[url]')
      .slice(0, 120);
    return { store: 'memory', redisConfigured: true, redisWorking: false, error: message, limits };
  }
}
