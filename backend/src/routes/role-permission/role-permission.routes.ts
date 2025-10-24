import { notFoundSchema } from "@/lib/constants";
import {
  PatchRolePermissionSchema,
  PermissionInputSchema,
  RoleInputSchema,
  RolePermissionListSchema,
  RolePermissionSchema,
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

export const patchRolePermission = createRoute({
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
export type PatchRolePermissionRoute = typeof patchRolePermission;
