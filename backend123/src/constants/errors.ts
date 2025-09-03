import { HTTP_STATUS } from "./http";

/**
 * Centralized error messages (status + message + code).
 */
export const ERROR_MESSAGES = {
  // 🔑 Auth
  INVALID_CREDENTIALS: {
    status: HTTP_STATUS.UNAUTHORIZED,
    message: "Invalid email or password.",
    code: "INVALID_CREDENTIALS",
  },
  UNAUTHORIZED: {
    status: HTTP_STATUS.UNAUTHORIZED,
    message: "Authentication required.",
    code: "UNAUTHORIZED",
  },
  FORBIDDEN: {
    status: HTTP_STATUS.FORBIDDEN,
    message: "Access denied.",
    code: "FORBIDDEN",
  },

  // ⚠️ Validation / client errors
  BAD_REQUEST: {
    status: HTTP_STATUS.BAD_REQUEST,
    message: "Invalid request.",
    code: "BAD_REQUEST",
  },
  VALIDATION_FAILED: {
    status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    message: "Validation failed.",
    code: "VALIDATION_FAILED",
  },
  EMAIL_ALREADY_EXISTS: {
    status: HTTP_STATUS.CONFLICT,
    message: "Email already registered.",
    code: "EMAIL_ALREADY_EXISTS",
  },

  // 🗂️ Not found
  USER_NOT_FOUND: {
    status: HTTP_STATUS.NOT_FOUND,
    message: "User not found.",
    code: "USER_NOT_FOUND",
  },
  RESOURCE_NOT_FOUND: {
    status: HTTP_STATUS.NOT_FOUND,
    message: "Resource not found.",
    code: "RESOURCE_NOT_FOUND",
  },

  // 💀 Server
  INTERNAL_ERROR: {
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: "Internal server error.",
    code: "INTERNAL_ERROR",
  },
  SERVICE_UNAVAILABLE: {
    status: HTTP_STATUS.SERVICE_UNAVAILABLE,
    message: "Service unavailable.",
    code: "SERVICE_UNAVAILABLE",
  },
} as const;

export type ErrorKey = keyof typeof ERROR_MESSAGES;
export type ErrorResponse = (typeof ERROR_MESSAGES)[ErrorKey];
