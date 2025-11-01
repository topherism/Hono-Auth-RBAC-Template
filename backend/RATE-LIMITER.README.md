# 🛡️ Rate Limiter Documentation

## Overview

This application uses **three rate limiters** to protect against different types of attacks:

| Rate Limiter | Tracks By | Limit | Purpose |
|--------------|-----------|-------|---------|
| `ipRateLimiter` | IP Address | 5 req/min | Prevent brute-force on login/register |
| `userRateLimiter` | User ID | 100 req/min | Prevent API abuse by authenticated users |
| `tokenRateLimiter` | Refresh Token | 20 req/min | Prevent token refresh abuse |

---

## Quick Start

### 1. Install

```bash
npm install hono-rate-limiter
```

### 2. Apply to Routes

```typescript
import { ipRateLimiter, userRateLimiter } from "@/middlewares/rate-limit.middleware";
import { wrapWithMiddlewares } from "@/lib/wrapWithMiddleware";

const router = createRouter()
  // Protect login with IP rate limiter
  .openapi(
    routes.login,
    wrapWithMiddlewares(handlers.login, ipRateLimiter)
  )
  // Protect API with user rate limiter
  .openapi(
    routes.getUsers,
    wrapWithMiddlewares(handlers.getUsers, authMiddleware, userRateLimiter)
  );
```

---

## Rate Limiter Details

### 🚨 IP Rate Limiter

**Use for**: Login, register, forgot-password

**How it works**: Blocks an IP after 5 requests in 60 seconds

```typescript
// Example: Protect login
.openapi(routes.login, wrapWithMiddlewares(handlers.login, ipRateLimiter))
```

**Prevents**: Brute-force password attacks

---

### 👤 User Rate Limiter

**Use for**: All authenticated endpoints

**How it works**: 
- Tracks by User ID (not IP!)
- Limit is **shared across ALL protected routes**
- 100 requests per user per minute

```typescript
// Example: Protect user endpoints
.openapi(
  routes.getUsers,
  wrapWithMiddlewares(handlers.getUsers, authMiddleware, userRateLimiter)
)
```

**Key Feature**: User makes 50 requests to `/users` + 50 to `/posts` = 100 total → BLOCKED on next request to ANY endpoint

**Prevents**: 
- API abuse and scraping
- VPN hopping (tracked by User ID, not IP)

---

### 🔄 Token Rate Limiter

**Use for**: Token refresh endpoint

**How it works**: 
- Tracks by the refresh token itself
- 20 refreshes per token per minute

```typescript
// Example: Protect token refresh
.openapi(routes.refresh, wrapWithMiddlewares(handlers.refresh, tokenRateLimiter))
```

**Prevents**: Stolen token abuse (attacker can't spam refreshes)

---

## Attack Prevention

### ❌ Brute-Force Login
```
Without: 1000 password attempts/min ✅
With ipRateLimiter: Only 5 attempts/min ✅ BLOCKED
```

### ❌ Endpoint Rotation Bypass
```
Attack: 5 req to /login + 5 to /register + 5 to /forgot = 15 total
Solution: Use shared rate limiter across all auth endpoints
```

**Create shared limiter**:
```typescript
const globalAuthRateLimiter = rateLimiter({
  keyGenerator: (c) => `auth:${getClientIp(c)}`, // Same key for all!
  limit: 10
});

// Apply to all auth routes
.openapi(routes.login, wrapWithMiddlewares(handlers.login, globalAuthRateLimiter))
.openapi(routes.register, wrapWithMiddlewares(handlers.register, globalAuthRateLimiter))
```

### ❌ VPN Hopping
```
Attack: User hits limit → switches VPN IP → tries again
Solution: userRateLimiter tracks by User ID, not IP ✅ STILL BLOCKED
```

### ❌ Stolen Token Spam
```
Attack: Attacker steals token → spam refresh endpoint
Solution: tokenRateLimiter limits token to 20 refreshes/min ✅ BLOCKED
```

---

## Configuration

### Adjust Limits

Edit `middlewares/rate-limit.middleware.ts`:

```typescript
// Stricter login (3 attempts instead of 5)
export const ipRateLimiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 3,  // Changed from 5
  // ...
});

// Higher limit for premium users
export const premiumUserRateLimiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 500,  // 5x normal limit
  keyGenerator: (c) => `premium:${c.get("user")?.id}`,
  // ...
});
```

### Whitelist IPs

```typescript
export const ipRateLimiter = rateLimiter({
  // ...
  skip: (c: Context) => {
    const ip = getClientIp(c);
    return ['192.168.1.100', '10.0.0.5'].includes(ip);
  }
});
```

---

## Testing

### Manual Test

```bash
# Should block after 5 attempts
for i in {1..10}; do
  curl -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
done
```

### Automated Test

```typescript
// Run: npm run test:rpc
for (let i = 0; i < 10; i++) {
  const res = await client.auth.login.$post({
    json: { email: "test@test.com", password: "wrong" }
  });
  console.log(`Request ${i + 1}: Status ${res.status}`);
  if (res.status === 429) {
    console.log("✅ Rate limiter working!");
    break;
  }
}
```

---

## Troubleshooting

### Rate limiter not blocking requests

**Check 1**: Verify middleware is applied
```typescript
// ❌ Wrong
.openapi(routes.login, handlers.login)

// ✅ Correct
.openapi(routes.login, wrapWithMiddlewares(handlers.login, ipRateLimiter))
```

**Check 2**: Add logging
```typescript
handler: (c: Context) => {
  console.log("🚨 RATE LIMIT HIT!");
  return c.json({ error: "Rate limited" }, 429);
}
```

### All requests show same IP

**Problem**: Behind proxy/load balancer

**Solution**: Configure proxy to forward real IP

**Nginx**:
```nginx
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Real-IP $remote_addr;
```

**Cloudflare**: Automatically adds `CF-Connecting-IP` header

---

## Best Practices

### ✅ DO:
- Use `ipRateLimiter` for public auth endpoints
- Use `userRateLimiter` for all protected routes
- Return clear error messages with retry time
- Monitor rate limit hits in logs
- Test rate limiters before deploying

### ❌ DON'T:
- Don't use same limiter for all endpoints
- Don't set limits too low (impacts legitimate users)
- Don't rely only on rate limiting (use with auth, validation, etc.)
- Don't forget to configure proxy headers if behind load balancer

---

## Summary

```
┌─────────────────────────────────────────────────────────┐
│ Endpoint          │ Rate Limiter      │ Limit          │
├─────────────────────────────────────────────────────────┤
│ /auth/login       │ ipRateLimiter     │ 5 req/min      │
│ /auth/register    │ ipRateLimiter     │ 5 req/min      │
│ /auth/refresh     │ tokenRateLimiter  │ 20 req/min     │
│ /users/*          │ userRateLimiter   │ 100 req/min    │
│ /api/* (protected)│ userRateLimiter   │ 100 req/min    │
└─────────────────────────────────────────────────────────┘
```

**Security**: Multi-layer protection against brute-force, API abuse, and token theft

**Performance**: Minimal overhead, uses efficient in-memory counters

**User Experience**: Generous limits for legitimate users, strict on attackers