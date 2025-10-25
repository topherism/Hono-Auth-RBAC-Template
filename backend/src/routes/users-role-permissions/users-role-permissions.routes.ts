import { UserRolePermissionsListResponseSchema } from "@/schemas/user-role-permissions";
import { createRoute, z } from "@hono/zod-openapi";
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

const tags = ["User-Permissions"];

export const getAllUserRolePermissions = createRoute({
  path: "/users/role-permissions",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      UserRolePermissionsListResponseSchema,
      "Fetched all users with their role and permissions"
    ),
  },
});

// Export route types for handlers
export type GetAllUserRolePermissionsRoute = typeof getAllUserRolePermissions;
