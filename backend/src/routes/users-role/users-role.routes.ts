import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  jsonContent,
  jsonContentOneOf,
  jsonContentRequired,
} from "stoker/openapi/helpers";
import { createErrorSchema, IdUUIDParamsSchema } from "stoker/openapi/schemas";
import {
  PermissionInputSchema,
  PermissionListSchema,
  RoleInputSchema,
} from "@/schemas/roles-permissions";
import { notFoundSchema } from "@/lib/constants";
import { UserRoleSchema } from "@/schemas/user-role";

const tags = ["User-Permissions"];

export const patchUserRole = createRoute({
  path: "/users/role/{id}",
  method: "patch",
  tags,
  summary: "Patch user-role",
  description: `
    This endpoint assigns a role to a user.
  `,
  operationId: "patchUserRole",
  request: {
    params: IdUUIDParamsSchema,
    body: jsonContentRequired(RoleInputSchema, "Role to assign to the user"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      UserRoleSchema,
      "Patched user role & returned updated user-role"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [
        createErrorSchema(IdUUIDParamsSchema),
        createErrorSchema(UserRoleSchema),
      ],
      "No role provided to patch or invalid user ID"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContentOneOf(
      [
        createErrorSchema(IdUUIDParamsSchema),
        createErrorSchema(UserRoleSchema),
      ],
      "Missing user ID or role to patch"
    ),
  },
});

// Export route types for handlers
export type PatchUserRoleRoute = typeof patchUserRole;
