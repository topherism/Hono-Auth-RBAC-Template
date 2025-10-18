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

export const refresh = createRoute({
  path: "/auth/refresh",
  method: "get",
  tags,
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
export type RefreshRoute = typeof refresh;

