import { HTTP_STATUS } from "./http";

/**
 * Centralized success messages
 */
export const SUCCESS_MESSAGES = {
  // 🔑 Auth
  USER_REGISTERED: {
    status: HTTP_STATUS.CREATED,
    message: "User registered successfully.",
    code: "USER_REGISTERED",
  },
  LOGIN_SUCCESSFUL: {
    status: HTTP_STATUS.OK,
    message: "Login successful.",
    code: "LOGIN_SUCCESSFUL",
  },
  LOGOUT_SUCCESSFUL: {
    status: HTTP_STATUS.OK,
    message: "Logout successful.",
    code: "LOGOUT_SUCCESSFUL",
  },
  TOKEN_REFRESHED: {
    status: HTTP_STATUS.OK,
    message: "Token refreshed.",
    code: "TOKEN_REFRESHED",
  },

  // 📝 CRUD
  RESOURCE_CREATED: {
    status: HTTP_STATUS.CREATED,
    message: "Resource created.",
    code: "RESOURCE_CREATED",
  },
  RESOURCE_FETCHED: {
    status: HTTP_STATUS.OK,
    message: "Resource fetched.",
    code: "RESOURCE_FETCHED",
  },
  RESOURCE_UPDATED: {
    status: HTTP_STATUS.OK,
    message: "Resource updated.",
    code: "RESOURCE_UPDATED",
  },
  RESOURCE_PARTIALLY_UPDATED: {
    status: HTTP_STATUS.OK,
    message: "Resource partially updated.",
    code: "RESOURCE_PARTIALLY_UPDATED",
  },
  RESOURCE_DELETED: {
    status: HTTP_STATUS.NO_CONTENT,
    message: "Resource deleted.",
    code: "RESOURCE_DELETED",
  },

  // ⚡ Utility
  HEALTH_CHECK: {
    status: HTTP_STATUS.OK,
    message: "Server healthy 🚀",
    code: "HEALTH_CHECK",
  },
  EMAIL_VERIFIED: {
    status: HTTP_STATUS.OK,
    message: "Email verified.",
    code: "EMAIL_VERIFIED",
  },
  PASSWORD_CHANGED: {
    status: HTTP_STATUS.OK,
    message: "Password changed.",
    code: "PASSWORD_CHANGED",
  },
} as const;

export type SuccessKey = keyof typeof SUCCESS_MESSAGES;
export type SuccessResponse = (typeof SUCCESS_MESSAGES)[SuccessKey];
