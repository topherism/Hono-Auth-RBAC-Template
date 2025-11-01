// src/schemas/roles-permissions/role.schema.ts
import { z } from "zod";
import { PERMISSIONS, Permission } from "@/constants/permissions";
import { PermissionSchema } from "@/schemas/roles-permissions/permission.schema";

/**
 * Role-Permission Mapping Schema
 * Defines the structure of a role and its associated permissions.
 */
export const UserPermissionsSchema = z
  .object({
    id: z.string().uuid(),
    permissions: z
      .array(PermissionSchema)
  })
  .strict()
  .openapi("Grant/Deny UserPermissionSchema");

export const UserPermissionsListSchema = z.array(UserPermissionsSchema);
