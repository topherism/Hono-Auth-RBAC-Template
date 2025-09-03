/**
 * Common HTTP status codes (frequently used only).
 */
export const HTTP_STATUS = {
  // ✅ Success
  OK: 200, // Standard success
  CREATED: 201, // Resource created
  NO_CONTENT: 204, // Success, no body

  // ⚠️ Client errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  // 💀 Server errors
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export type HttpStatusKey = keyof typeof HTTP_STATUS;
export type HttpStatusCode = (typeof HTTP_STATUS)[HttpStatusKey];
