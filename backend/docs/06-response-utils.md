# Response Utilities

This file explains the standardized API response functions in `src/utils/response.ts`.  
They ensure consistent responses and structured logging using Pino.

---

## API Response Structure

All responses follow this interface:

```ts
interface ApiResponse<T = unknown> {
  success: boolean;      // true = success, false = error
  status: number;        // HTTP status code
  message: string;       // User-facing message
  code?: string;         // Optional internal code (frontend i18n / debugging)
  data?: T;              // Response payload
  errors?: string[];     // Optional validation or extra errors
  timestamp: string;     // Timestamp of the response
}

```

### 1️⃣ sendSuccess

Send a standard success response.

Parameters:

c: Hono context
successObj: Predefined success object from SUCCESS_MESSAGES
data?: Optional response payload
customMessage?: Optional message to override default

Example Usage:

```ts

import { sendSuccess } from "@/utils/response";
import { SUCCESS_MESSAGES } from "@/constants/success";

// Standard success
sendSuccess(c, SUCCESS_MESSAGES.RESOURCE_FETCHED, user);

// Custom message
sendSuccess(c, SUCCESS_MESSAGES.USER_REGISTERED, newUser, "New user created successfully!");
```
---

### 2️⃣ sendError

Send a standard error response.

Parameters:

c: Hono context
errorObj: Predefined error object from ERROR_MESSAGES
extraErrors?: Optional array of additional errors
customMessage?: Optional message to override default

````ts
import { sendError } from "@/utils/response";
import { ERROR_MESSAGES } from "@/constants/errors";

// Standard error
sendError(c, ERROR_MESSAGES.BAD_REQUEST);

// With extra validation errors
sendError(c, ERROR_MESSAGES.UNPROCESSABLE_ENTITY, ["Email is required", "Password too short"]);

// Custom message
sendError(c, ERROR_MESSAGES.FORBIDDEN, undefined, "You cannot access this resource.");

````
---

#### 3️⃣ sendCustom

Send a fully custom response without relying on predefined messages.

Parameters:

c: Hono context
status: HTTP status code
message: Custom message
data?: Optional response payload
code?: Optional internal code (for frontend i18n/debugging)
errors?: Optional array of extra errors

Example Usage:

````ts
import { sendCustom } from "@/utils/response";

// Custom success
sendCustom(c, 202, "Partial content updated", { updatedCount: 5 }, "PARTIAL_UPDATE");

// Custom error
sendCustom(c, 400, "Invalid input provided", undefined, "CUSTOM_BAD_REQUEST", ["Field 'email' is missing"]);

````

Automatically sets success: true if status < 400, otherwise false.

Logs using Pino: info for success, error for errors.

Includes timestamp in every response.

Ideal for dynamic responses not defined in SUCCESS_MESSAGES or ERROR_MESSAGES.
