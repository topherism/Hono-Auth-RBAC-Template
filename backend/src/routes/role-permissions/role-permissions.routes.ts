import {
  RolePermissionListSchema,
  RolePermissionSchema,
} from "@/schemas/roles-permissions";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  jsonContent,
  jsonContentRequired,
} from "stoker/openapi/helpers";
import {
  createErrorSchema,
} from "stoker/openapi/schemas";

const tags = ["Role-Permissions"];

export const getAllRolePermission = createRoute({
  path: "/role-permissions",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      RolePermissionListSchema,
      "Fetched all roles with their permissions"
    ),
  },
});

export const grantRolePermission = createRoute({
  path: "/role-permissions/grant",
  method: "post",
  request: {
    body: jsonContentRequired(
      RolePermissionSchema,
      "Role & Permissions to assign"
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      RolePermissionSchema,
      "Assigned permissions to role and returned updated role-permission mappings"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createErrorSchema(RolePermissionListSchema),
      "Missing role or permissions to add/remove"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(RolePermissionListSchema),
      "No permissions provided to add or remove"
    ),
  },
});


export const denyRolePermission = createRoute({
  path: "/role-permissions/deny",
  method: "post",
  request: {
    body: jsonContentRequired(
      RolePermissionSchema,
      "Role & Permissions to assign"
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      RolePermissionSchema,
      "Assigned permissions to role and returned updated role-permission mappings"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createErrorSchema(RolePermissionListSchema),
      "Missing role or permissions to add/remove"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(RolePermissionListSchema),
      "No permissions provided to add or remove"
    ),
  },
});

// Export route types for handlers
export type GetAllRolePermissionRoute = typeof getAllRolePermission;
export type GrantRolePermissionRoute = typeof grantRolePermission;
export type DenyRolePermissionRoute = typeof denyRolePermission;
