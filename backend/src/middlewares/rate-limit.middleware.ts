import { rateLimiter } from "hono-rate-limiter";
import type { Context } from "hono";

// 🔹 Helper to extract real client IP
export const getClientIp = (c: Context) => {
  return (
    c.req.header("x-forwarded-for") ||
    c.req.header("x-real-ip") ||
    c.req.header("cf-connecting-ip") ||
    c.req.header("x-client-ip") ||
    c.req.raw.headers.get("remote-addr") ||
    "unknown"
  );
};

// Rate limiter for public routes (login, register)
export const ipRateLimiter = rateLimiter({
  // windowMs: 60 * 1000, // 1 min
  // limit: 5, // 5 requests per minute per IP
  // message: "Too many requests. Please try again in 60 seconds.",
  // keyGenerator: getClientIp,
  windowMs: 60 * 1000, // 1 minute
  limit: 5, // max 5 attempts per IP per minute
  keyGenerator: getClientIp,
  statusCode: 429,
  message: JSON.stringify({
    error: "Too many login attempts. Try again in 60 seconds.",
  }),
  standardHeaders: true,
});

// Rate limiter for authenticated users
export const userRateLimiter = rateLimiter({
  windowMs: 60 * 1000, // 1 minute
  limit: 100, // max 100 requests per user
  keyGenerator: (c: Context) => c.get("user")?.id || getClientIp(c),
  standardHeaders: true, // optional: adds X-RateLimit-* headers
  statusCode: 429, // ✅ set HTTP 429
  message: JSON.stringify({
    error: "Too many requests. Please try again in 60 seconds.",
  }),
});

export const tokenRateLimiter = rateLimiter({
  windowMs: 10 * 1000, // 10 seconds
  limit: 10, // allow max 10 requests per 10s per token
  keyGenerator: (c: Context) => {
    // Try to identify user by Authorization Bearer token
    const authHeader = c.req.header("authorization");
    if (!authHeader) return "anonymous";

    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    return token || "anonymous";
  },
  standardHeaders: true,
  message: "Too many requests with this token, please try again in 10 seconds.",
});
