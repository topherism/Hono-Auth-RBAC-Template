import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import {
  // LoginSchema,
  RegisterSchema,
  AuthResponseSchema,
} from "@/schemas/auth.schema";
import {
  LoginSchema,
  // UserListResponseSchema,
  // UserResponseSchema,
} from "@/schemas/auth";
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
    [HttpStatusCodes.UNAUTHORIZED]: {
      description: "Invalid credentials",
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: {
      description: "Validation error",
    },
  },
});

export const register = createRoute({
  path: "/auth/register",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(RegisterSchema, "Register a new user"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      AuthResponseSchema,
      "Register success"
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema("Email or username already exists"),
      "Email or username already exists"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(RegisterSchema),
      "The validation error(s)"
    ),
  },
});

// Export route types for handlers
export type LoginRoute = typeof login;
export type RegisterRoute = typeof register;
