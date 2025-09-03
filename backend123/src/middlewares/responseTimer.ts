// src/middlewares/responseTimer.ts
import type { Context, Next } from "hono";
import { logger } from "../utils/logger";

export async function responseTimer(c: Context, next: Next) {
  const start = Date.now();
  await next();
  const elapsed = Date.now() - start;

  // Add response time header
  c.header("X-Response-Time", `${elapsed}ms`);

  // Log it with route/method/status
  logger.info(
    {
      route: c.req.path,
      method: c.req.method,
      status: c.res.status,
      responseTime: `${elapsed}ms`,
    },
    "Request completed"
  );
}
