import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { LoginSchema, AuthResponseSchema } from "@/schemas/auth";
import {
  createErrorSchema,
  createMessageObjectSchema,
} from "stoker/openapi/schemas";

const tags = ["Auth"];

export const login = createRoute({
  path: "/auth/login",
  method: "post",
  tags,
  summary: "User login",
  description: `
    This endpoint allows users to log in using their email/username and password.
  `,
  operationId: "login",
  request: {
    body: jsonContentRequired(
      LoginSchema,
      "Login with email/username + password"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(AuthResponseSchema, "Login success"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Invalid credentials"),
      "Invalid credentials"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(LoginSchema),
      "The validation error(s)"
    ),
  },
});

export const logout = createRoute({
  path: "/auth/logout",
  method: "post",
  tags,
  summary: "User logout",
  description: `
    This endpoint allows users to logout by invalidating their refresh token.
  `,
  operationId: "logout",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Logged out"),
      "Logout success"
    ),
  },
});

export const logout_all = createRoute({
  path: "/auth/logout/all",
  method: "post",
  tags,
  summary: "User logout from all devices",
  description: `
    This endpoint allows users to logout from all devices by invalidating all their refresh tokens.
  `,
  operationId: "logoutAll",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Logged out"),
      "Logout from all device/s success"
    ),
  },
});

export const refresh = createRoute({
  path: "/auth/refresh",
  method: "get",
  tags,
  summary: "Refresh access token",
  description: `
    This endpoint allows users to refresh their access token using a valid refresh token.
  `,
  operationId: "refresh",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        accessToken: z.string().openapi({
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          description: "JWT access token",
        }),
      }),
      "Login success"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Invalid or expired refresh token"),
      "Invalid or expired refresh token"
    ),
  },
});

// Export route types for handlers
export type LoginRoute = typeof login;
export type LogoutRoute = typeof logout;
export type LogoutAllRoute = typeof logout_all;
export type RefreshRoute = typeof refresh;
