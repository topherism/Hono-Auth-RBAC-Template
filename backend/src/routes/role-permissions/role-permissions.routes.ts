import {
  RolePermissionListSchema,
  RolePermissionSchema,
} from "@/schemas/roles-permissions";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

const tags = ["Role-Permissions"];

export const getAllRolePermission = createRoute({
  path: "/role/permissions",
  method: "get",
  tags,
  summary: "Get all role-permissions",
  description: `
    This endpoint retrieves all roles along with their assigned permissions.
  `,
  operationId: "getAllRolePermissions",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      RolePermissionListSchema,
      "Fetched all roles with their permissions"
    ),
  },
});

export const grantRolePermission = createRoute({
  path: "/role/permissions/grant",
  method: "post",
  tags,
  summary: "Grant role-permissions",
  description: `
    This endpoint assigns specified permissions to a role.
  `,
  operationId: "grantRolePermissions",
  request: {
    body: jsonContentRequired(
      RolePermissionSchema,
      "Role & Permissions to assign"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      RolePermissionSchema,
      "Assigned permissions to role and returned updated role-permission mappings"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createErrorSchema(RolePermissionSchema),
      "Missing role or permissions to add/remove"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(RolePermissionSchema),
      "No permissions provided to add or remove"
    ),
  },
});

export const denyRolePermission = createRoute({
  path: "/role/permissions/deny",
  method: "post",
  tags,
  summary: "Deny role-permissions",
  description: `
    This endpoint removes specified permissions from a role.
  `,
  operationId: "denyRolePermissions",
  request: {
    body: jsonContentRequired(
      RolePermissionSchema,
      "Role and Permissions to remove"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      RolePermissionSchema,
      "Removed permissions from role and returned updated role-permission mappings"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createErrorSchema(RolePermissionSchema),
      "Missing role or permissions to add/remove"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(RolePermissionSchema),
      "No permissions provided to add or remove"
    ),
  },
});

// Export route types for handlers
export type GetAllRolePermissionRoute = typeof getAllRolePermission;
export type GrantRolePermissionRoute = typeof grantRolePermission;
export type DenyRolePermissionRoute = typeof denyRolePermission;
