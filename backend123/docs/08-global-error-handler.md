
#### 08-global-error-handler.md
```markdown
# Global Error Handler

`src/middleware/errorHandler.ts`:

```ts
import type { Context, Next } from "hono";
import { sendError } from "@/utils/response";
import { ERROR_MESSAGES } from "@/constants/errors";
import { logger } from "@/utils/logger";

export async function errorHandler(c: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    if (err.status && err.message) return sendError(c, err);
    logger.error({ route: c.req.path, method: c.req.method, error: err }, "Unhandled error");
    return sendError(c, ERROR_MESSAGES.INTERNAL_ERROR);
  }
}

````

Optional: Use app.use("*", errorHandler) to cover all routes.