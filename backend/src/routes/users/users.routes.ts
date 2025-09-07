import { RegisterSchema } from "@/schemas/auth.schema";
import { CreateUserSchema, UserResponseSchema } from "@/schemas/users";
import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import {
  createErrorSchema,
  createMessageObjectSchema,
} from "stoker/openapi/schemas";

const tags = ["Users"];

export const createUser = createRoute({
  path: "/users",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(CreateUserSchema, "Create a new user"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(UserResponseSchema, "User created"),

    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(CreateUserSchema),
      "The validation error(s)"
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema("Email or Username already in use"),
      "Email or Username already in use"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema("Internal Server Error"),
      "Unexpected server error"
    ),
  },
});

export const getAllUser = createRoute({
  path: "/users",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(RegisterSchema, "Fetched all users"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Invalid credentials"),
      "Invalid credentials"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: {
      description: "Validation error",
    },
  },
});

// Export route types for handlers
export type CreateUserRoute = typeof createUser;
export type GetAllUserRoute = typeof getAllUser;
