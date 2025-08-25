import type { Context, Next } from "hono";
import type { ErrorResponse } from "@/constants/errors";
import { sendError, ERROR_MESSAGES } from "@/utils/response";
import { logger } from "@/utils/logger";

/**
 * Type guard to check if an object is a predefined ErrorResponse
 */
function isErrorResponse(obj: any): obj is ErrorResponse {
  return (
    obj && typeof obj.status === "number" && typeof obj.message === "string"
  );
}

/**
 * Global error handler middleware
 * - Catches all unhandled errors
 * - Automatically handles predefined errors from ERROR_MESSAGES
 * - Logs structured info for observability
 */
export async function errorHandler(c: Context, next: Next) {
  try {
    await next();
  } catch (err: unknown) {
    if (isErrorResponse(err)) {
      // Predefined error
      logger.warn(
        { route: c.req.path, method: c.req.method, error: err },
        "Predefined error caught"
      );
      return sendError(c, err);
    }

    // Fallback for unexpected errors
    logger.error(
      { route: c.req.path, method: c.req.method, error: err },
      "Unhandled error"
    );
    return sendError(c, ERROR_MESSAGES.INTERNAL_ERROR);
  }
}
