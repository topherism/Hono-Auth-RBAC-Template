import { notFoundSchema } from "@/lib/constants";
import {
  CreateUserSchema,
  UserListResponseSchema,
  UserResponseSchema,
} from "@/schemas/users";
import { PatchUserResponseSchema, PatchUserSchema } from "@/schemas/users/patch-user.schema";
import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
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
})




export const patchUser = createRoute({
  path: "/users/{id}",
  method: "patch",
  tags,
  request: {
    params: IdUUIDParamsSchema,
    body: jsonContentRequired(PatchUserSchema, "Partial user update"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(PatchUserResponseSchema, "The updated user"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),

    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(PatchUserSchema), createErrorSchema(IdUUIDParamsSchema)],
      "The validation error(s)"
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema("Email or username already in use"),
      "Conflict error"
    ),
  },
});

// export const patch = createRoute({
//   path: "/tasks/{id}",
//   method: "patch",
//   tags,
//   request: {
//     params: IdUUIDParamsSchema,
//     body: jsonContentRequired(patchTasksSchema, "The tasks updates"),
//   },
//   responses: {
//     [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, "The updated task"),
//     [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task Not Found"),

//     [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
//       [createErrorSchema(patchTasksSchema), createErrorSchema(IdParamsSchema)],
//       "The validation error(s)"
//     ),
//   },
// });

// Export route types for handlers
export type CreateUserRoute = typeof createUser;
export type GetAllUserRoute = typeof getAllUser;
export type GetOneUserRoute = typeof getOneUser;
export type PatchRoute = typeof patchUser;
