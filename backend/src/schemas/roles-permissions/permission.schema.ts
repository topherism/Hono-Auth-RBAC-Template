// src/schemas/roles-permissions/role.schema.ts
import { z } from "zod";
import { PERMISSIONS, Permission } from "@/constants/permissions";
import { extendZodWithOpenApi } from "@hono/zod-openapi";

extendZodWithOpenApi(z);

/**
 * Permission Schema
 * Represents a single permission (e.g., MANAGE_USERS, VIEW_DASHBOARD, etc.)
 */
export const PermissionSchema = z
  .enum(Object.values(PERMISSIONS) as [Permission, ...Permission[]])
  .openapi({
    title: "Permission",
    description: "The permission identifier assigned to a role.",
    example: PERMISSIONS.CREATE_USER,
  });

export const PermissionListSchema = z.array(PermissionSchema).openapi({
  title: "PermissionList",
  description: "List of permissions assigned to a role.",
});

export const PermissionInputSchema = z.object({
  permissions: z
    .array(PermissionSchema)
    .nonempty("At least one permission must be provided."),
}).openapi({
  title: "PermissionInput",
  description: "Input object containing a list of permissions to assign.",
});

export type PermissionType = z.infer<typeof PermissionSchema>;
export type PermissionInputList = z.infer<typeof PermissionListSchema>;
