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
} from "@/schemas/roles-permissions";
import { UserPermissionSchema } from "@/schemas/user-permissions";
import { notFoundSchema } from "@/lib/constants";

const tags = ["User-Permissions"];

export const grantUserPermissions = createRoute({
  path: "/users/permissions/grant/{id}",
  method: "post",
  request: {
    params: IdUUIDParamsSchema,
    body: jsonContentRequired(
      PermissionInputSchema,
      "Permissions to grant to the user"
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      UserPermissionSchema,
      "Granted Permissions to user & returned updated user-role-permission"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [
        createErrorSchema(IdUUIDParamsSchema),
        createErrorSchema(PermissionListSchema),
      ],
      "No permissions provided to add or invalid user ID"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContentOneOf(
      [
        createErrorSchema(IdUUIDParamsSchema),
        createErrorSchema(PermissionListSchema),
      ],
      "Missing user ID or permissions to add"
    ),
  },
});

export const denyUserPermissions = createRoute({
  path: "/users/permissions/deny/{id}",
  method: "delete",
  request: {
    params: IdUUIDParamsSchema,
    body: jsonContentRequired(
      PermissionInputSchema,
      "Permissions to deny to the user"
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      UserPermissionSchema,
      "Denied Permissions to user & returned updated user-role-permission"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [
        createErrorSchema(IdUUIDParamsSchema),
        createErrorSchema(PermissionListSchema),
      ],
      "No permissions provided to remove or invalid user ID"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContentOneOf(
      [
        createErrorSchema(IdUUIDParamsSchema),
        createErrorSchema(PermissionListSchema),
      ],
      "Missing user ID or permissions to remove"
    ),
  },
});

// Export route types for handlers
export type GrantUserPermissionsRoute = typeof grantUserPermissions;
export type DenyUserPermissionsRoute = typeof denyUserPermissions;
