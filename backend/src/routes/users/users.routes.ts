import { notFoundSchema } from "@/lib/constants";
import {
  CreateUserSchema,
  UserListResponseSchema,
  UserResponseSchema,
  PatchUserResponseSchema,
  PatchUserSchema,
} from "@/schemas/users";
import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  jsonContent,
  jsonContentOneOf,
  jsonContentRequired,
} from "stoker/openapi/helpers";
import {
  createErrorSchema,
  createMessageObjectSchema,
  IdParamsSchema,
  IdUUIDParamsSchema,
} from "stoker/openapi/schemas";

const tags = ["Users"];

export const createUser = createRoute({
  path: "/users",
  method: "post",
  tags,
  summary: "Create a new user account",
  description: `
    This endpoint allows admins to create new users.
    You must provide a unique email and valid role.
  `,
  security: [{ BearerAuth: [] }],
  operationId: "createUser",
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
  },
});

export const getAllUser = createRoute({
  path: "/users",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      UserListResponseSchema,
      "Fetched all users"
    ),
  },
});

export const getOneUser = createRoute({
  path: "/users/{id}",
  method: "get",
  tags,
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(UserResponseSchema, "The requested user"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User Not Found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid Id Error"
    ),
  },
});

export const patchUser = createRoute({
  path: "/users/{id}",
  method: "patch",
  tags,
  request: {
    params: IdUUIDParamsSchema,
    body: jsonContentRequired(PatchUserSchema, "Partial user update"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      PatchUserResponseSchema,
      "The updated user"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),

    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [
        createErrorSchema(PatchUserSchema),
        createErrorSchema(IdUUIDParamsSchema),
      ],
      "The validation error(s)"
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema("Email or username already in use"),
      "Conflict error"
    ),
  },
});

// Export route types for handlers
export type CreateUserRoute = typeof createUser;
export type GetAllUserRoute = typeof getAllUser;
export type GetOneUserRoute = typeof getOneUser;
export type PatchRoute = typeof patchUser;
