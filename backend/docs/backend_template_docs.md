# Project Documentation

This documentation explains the structure, utilities, and best practices for the backend template built with **Hono**, **Prisma**, **Zod**, and **Pino**.

---

## 1️⃣ Folder Structure

```
src/
├─ constants/
│  ├─ http.ts          # Common HTTP status codes
│  ├─ errors.ts        # Predefined error messages
│  └─ success.ts       # Predefined success messages
├─ middlewares/
│  └─ errorHandler.ts  # Global error handling
├─ utils/
│  ├─ logger.ts        # Pino logger instance
│  └─ response.ts      # Standardized API responses
├─ routes/
│  └─ *.ts             # Route handlers
└─ index.ts            # App entry point
```

**Notes:**
- Use `@/` imports configured in `tsconfig.json`.
- Centralized constants and response utilities maintain consistency and simplify development.

---

## 2️⃣ Required Packages

**Dependencies:**
- `hono` – Minimal web framework
- `@hono/zod-validator` – Validation middleware with Zod
- `zod` – Schema validation
- `dotenv` – Environment variable management
- `pino` – Structured logging

**DevDependencies:**
- `pino-pretty` – Human-readable logs for development
- `@types/bun` – Bun TypeScript definitions

---

## 3️⃣ HTTP Status Codes

File: `src/constants/http.ts`

Defines common HTTP status codes:

```ts
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;
```

Use these constants for consistency in all responses.

---

## 4️⃣ Error Messages

File: `src/constants/errors.ts`

Centralized error messages:

```ts
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: { status: 401, message: "Invalid email or password.", code: "INVALID_CREDENTIALS" },
  UNAUTHORIZED: { status: 401, message: "Login required.", code: "UNAUTHORIZED" },
  FORBIDDEN: { status: 403, message: "Access denied.", code: "FORBIDDEN" },
  BAD_REQUEST: { status: 400, message: "Invalid request.", code: "BAD_REQUEST" },
  VALIDATION_FAILED: { status: 422, message: "Validation failed.", code: "VALIDATION_FAILED" },
  USER_NOT_FOUND: { status: 404, message: "User not found.", code: "USER_NOT_FOUND" },
  INTERNAL_ERROR: { status: 500, message: "Internal server error.", code: "INTERNAL_ERROR" },
} as const;
```

- Use predefined errors with `sendError` for standardized responses.

---

## 5️⃣ Success Messages

File: `src/constants/success.ts`

Centralized success messages:

```ts
export const SUCCESS_MESSAGES = {
  USER_REGISTERED: { status: 201, message: "User registered successfully.", code: "USER_REGISTERED" },
  LOGIN_SUCCESSFUL: { status: 200, message: "Logged in successfully.", code: "LOGIN_SUCCESSFUL" },
  RESOURCE_FETCHED: { status: 200, message: "Resource fetched successfully.", code: "RESOURCE_FETCHED" },
  RESOURCE_CREATED: { status: 201, message: "Resource created successfully.", code: "RESOURCE_CREATED" },
} as const;
```

---

## 6️⃣ Response Utilities

File: `src/utils/response.ts`

Provides standardized API responses and logging:

- `sendSuccess(c, successObj, data?, customMessage?)`
- `sendError(c, errorObj, extraErrors?, customMessage?)`
- `sendCustom(c, status, message, data?, code?, errors?)`

**Examples:**

```ts
// Success
sendSuccess(c, SUCCESS_MESSAGES.RESOURCE_FETCHED, user);

// Error
sendError(c, ERROR_MESSAGES.BAD_REQUEST, ["Missing email field"]);

// Custom
sendCustom(c, 400, "Dynamic error occurred", undefined, "DYNAMIC_ERROR", ["Extra validation detail"]);
```

---

## 7️⃣ Global Error Handler

File: `src/middlewares/errorHandler.ts`

Catches all unhandled errors globally, including predefined errors:

```ts
app.use("*", errorHandler);
```

**Example Route:**

```ts
app.get("/users/:id", async (c) => {
  const user = await getUserById(c.req.param("id"));
  if (!user) throw ERROR_MESSAGES.USER_NOT_FOUND;
  return sendSuccess(c, SUCCESS_MESSAGES.RESOURCE_FETCHED, user);
});
```

**Notes:**
- No need for try/catch in every route.
- Logs errors with Pino.
- Differentiates between predefined and unexpected errors.

---

## 8️⃣ Logger

File: `src/utils/logger.ts`

```ts
import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
  transport: isDev
    ? { target: "pino-pretty", options: { colorize: true } }
    : undefined,
});
```

- Dev: human-readable colored logs
- Prod: structured JSON logs for aggregation
- Automatically used in all responses and global error handler

---

## 9️⃣ Notes

- Keep messages centralized for maintainability.
- Use `sendCustom` for dynamic responses.
- Pino logging ensures observability for both dev and production.
- Global error handler reduces boilerplate and improves consistency.

