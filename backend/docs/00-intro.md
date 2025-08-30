# Dynamic API Response System

This project provides a **scalable and consistent pattern** for building APIs with Hono.

## Features

- Standardized API responses (`success`, `error`, `custom`)
- Centralized error handling
- Predefined HTTP codes, errors, and success messages
- Structured logging with Pino
- Production-ready & development-friendly

---

src/
├── routes/ → Hono routers (grouping endpoints)
├── controllers/ → Handle req/res, validation
├── services/ → Business logic (optional but good for complex apps)
├── repositories/ → Prisma data access
├── middlewares/ → Auth, logging, etc.
├── utils/ → Shared helpers


## Architecture Flow

```text
   ┌────────────┐        ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
   │   Client   │  -->   │  Controller   │  -->   │    Service     │  -->   │  Repository   │
   └────────────┘        └───────────────┘        └───────────────┘        └───────────────┘
                              │                        │                        │
                              ▼                        ▼                        ▼
                       (Speak to client)       (Think & decide)         (Talk to database)
```



# 🌐 1. CORS (Cross-Origin Resource Sharing)
Problem it solves

By default, browsers block requests from a frontend running on one origin (like http://localhost:3000) to a backend running on another origin (like http://localhost:3001).

CORS is how your backend explicitly says:

“It’s safe for this frontend to talk to me.”

Your setup
app.use(
  "/api/*",
  cors({
    origin: (origin, c) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://yourdomain.com",
      ]
      if (origin && allowedOrigins.includes(origin)) {
        return origin // ✅ allow request from this origin
      }
      return "null" // ❌ block / no CORS
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
)

🔎 Explanation

origin: checks the request’s Origin header.

If it’s in allowedOrigins, return it → browser allows the request.

Otherwise, return "null" → request is blocked by the browser.

allowMethods: HTTP methods you want to allow.

allowHeaders: Headers you allow the client to send.

credentials: true: allows cookies / auth tokens to be sent with requests.

✅ This protects your API from random websites making requests to it.


# 🔑 2. CSRF (Cross-Site Request Forgery)
Problem it solves

Even with CORS, imagine this attack:

You’re logged into yourdomain.com in one tab (with an active session cookie).

An attacker tricks you into visiting evil.com.

evil.com auto-submits a hidden <form> POSTing to yourdomain.com/api/delete-account.

Since your browser automatically sends cookies, the request looks valid to your backend.

This is a CSRF attack.

Your setup
app.use("/api/*", csrf())

🔎 Explanation

The CSRF middleware does two things:

Generates a CSRF token → your backend issues it (usually in a cookie or response header).

Verifies the CSRF token → for any state-changing requests (POST, PUT, DELETE), the client must send back the token in a header or body.

If the token is missing/invalid → request is blocked.

✅ This prevents “drive-by” attacks from malicious sites. Even if cookies are present, the attacker can’t guess the CSRF token.

⚖️ How they work together

CORS: Controls who can call your API. (Protects against other domains trying to use your API.)

CSRF: Protects against unauthorized requests with your credentials. (Even if the request came from the right domain but wasn’t intentionally made by the user.)

They complement each other:

CORS = external gatekeeper.

CSRF = internal bodyguard.