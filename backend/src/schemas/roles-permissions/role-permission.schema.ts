// src/schemas/roles-permissions/role-permission.schema.ts
import { z } from "zod";
import { RoleSchema } from "./role.schema";
import { PermissionListSchema } from "./permission.schema";
import { extendZodWithOpenApi } from "@hono/zod-openapi";
import { ROLES } from "@/constants/roles";
import { PERMISSIONS } from "@/constants/permissions";

extendZodWithOpenApi(z);

export const RolePermissionSchema = z
  .object({
    role: RoleSchema.openapi({
      title: "Role",
      description: "The role assigned to the user",
      example: ROLES.ADMIN, // or whatever RoleSchema example is
    }),
    permissions: PermissionListSchema.openapi({
      title: "Permissions",
      description: "List of permissions assigned to the role",
      example: [PERMISSIONS.CREATE_USER, PERMISSIONS.DELETE_USER], // match some PermissionSchema examples
    }),
  })
  .openapi("RolePermission");

export const RolePermissionListSchema = z
  .array(RolePermissionSchema)
  .openapi({
    title: "RolePermissionList",
    description: "List of roles with their permissions",
    example: [
      {
        role: ROLES.SUPERADMIN,
        permissions: [PERMISSIONS.CREATE_USER, PERMISSIONS.DELETE_USER],
      },
      {
        role: ROLES.ADMIN,
        permissions: [PERMISSIONS.VIEW_USER],
      },
    ],
  });
