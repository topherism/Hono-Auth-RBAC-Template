import type { Context } from "hono";
import type { ErrorResponse } from "../constants/errors";
import type { SuccessResponse } from "../constants/success";
import { logger } from "./logger";

// Standard API response structure
export interface ApiResponse<T = unknown> {
  success: boolean;      // true = success, false = error
  status: number;        // HTTP status code
  message: string;       // User-facing message
  code?: string;         // Optional internal code (frontend i18n / debugging)
  data?: T;              // Response payload
  errors?: string[];     // Optional validation or extra errors
  timestamp: string;     // Always include timestamp for logs/debugging
}

/**
 * Send standard success response
 * @param c Hono context
 * @param successObj Predefined success object from SUCCESS_MESSAGES
 * @param data Optional response payload
 * @param customMessage Optional message to override default
 */
export function sendSuccess<T>(
  c: Context,
  successObj: SuccessResponse,
  data?: T,
  customMessage?: string
) {
  const response: ApiResponse<T> = {
    success: true,
    status: successObj.status,
    message: customMessage ?? successObj.message,
    code: successObj.code,
    data,
    timestamp: new Date().toISOString(),
  };

  logger.info({ route: c.req.path, method: c.req.method, response }, "Success response");
  return c.json(response, successObj.status as any);
}

/**
 * Send standard error response
 * @param c Hono context
 * @param errorObj Predefined error object from ERROR_MESSAGES
 * @param extraErrors Optional extra error details
 * @param customMessage Optional message to override default
 */
export function sendError(
  c: Context,
  errorObj: ErrorResponse,
  extraErrors?: string[],
  customMessage?: string
) {
  const response: ApiResponse = {
    success: false,
    status: errorObj.status,
    message: customMessage ?? errorObj.message,
    code: errorObj.code,
    errors: extraErrors,
    timestamp: new Date().toISOString(),
  };

  logger.error({ route: c.req.path, method: c.req.method, response }, "Error response");
  return c.json(response, errorObj.status as any);
}

/**
 * Send fully custom response
 * @param c Hono context
 * @param status HTTP status code
 * @param message Custom message
 * @param data Optional payload
 * @param code Optional internal code
 * @param errors Optional extra errors
 */
export function sendCustom<T>(
  c: Context,
  status: number,
  message: string,
  data?: T,
  code?: string,
  errors?: string[]
) {
  const response: ApiResponse<T> = {
    success: status < 400,
    status,
    message,
    code,
    data,
    errors,
    timestamp: new Date().toISOString(),
  };

  // Log with appropriate level
  if (status < 400) {
    logger.info({ route: c.req.path, method: c.req.method, response }, "Custom success");
  } else {
    logger.error({ route: c.req.path, method: c.req.method, response }, "Custom error");
  }

  return c.json(response, status as any);
}

// At the bottom of response.ts
export { ERROR_MESSAGES } from "../constants/errors";
export { SUCCESS_MESSAGES } from "../constants/success";
