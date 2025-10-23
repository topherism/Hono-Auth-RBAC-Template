import { notFoundSchema } from "@/lib/constants";
import {
  PatchRolePermissionSchema,
  PermissionInputSchema,
  RoleInputSchema,
  RolePermissionListSchema,
} from "@/schemas/roles-permissions";
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

export const assignPermissionToRole = createRoute({
  path: "/role-permissions",
  method: "patch",
  request: {
    body: jsonContentRequired(
      PatchRolePermissionSchema,
      "Role & Permissions to assign"
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      RolePermissionListSchema,
      "Assigned permissions to role and returned updated role-permission mappings"
    ),
  },
});

// Export route types for handlers
export type GetAllRolePermissionRoute = typeof getAllRolePermission;
export type AssignPermissionToRoleRoute = typeof assignPermissionToRole;
