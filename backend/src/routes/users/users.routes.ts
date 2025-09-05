import { RegisterSchema } from "@/schemas/auth.schema";
import { CreateUserSchema } from "@/schemas/user.schema";
import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema, IdUUIDParamsSchema } from "stoker/openapi/schemas";

const tags = ["Users"];

export const createUser = createRoute({
  path: "/users",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(CreateUserSchema, "Create a new user"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(CreateUserSchema, "User created"),
    [HttpStatusCodes.CONFLICT]: { description: "Email or Username already in use" },
    [HttpStatusCodes.BAD_REQUEST]: { description: "Invalid input" },
  },
});

export const getAllUser = createRoute({
  path: "/users",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(RegisterSchema,"Fetched all users"),
    [HttpStatusCodes.UNAUTHORIZED]: {
      description: "Invalid credentials",
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: {
      description: "Validation error",
    },
  },
});

// Export route types for handlers
export type CreateUserRoute = typeof createUser;
export type UserRoute = typeof getAllUser;

