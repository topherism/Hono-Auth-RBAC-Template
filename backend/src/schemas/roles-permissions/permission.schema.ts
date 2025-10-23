// src/schemas/roles-permissions/role.schema.ts
import { z } from "zod";
import { PERMISSIONS, Permission } from "@/constants/permissions";

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
export const PermissionInputSchema = z
  .array(PermissionSchema)
  .nonempty("At least one permission must be provided.");

export type PermissionType = z.infer<typeof PermissionSchema>; // single permission
export type PermissionInputList = z.infer<typeof PermissionInputSchema>;