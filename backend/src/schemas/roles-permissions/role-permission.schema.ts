// src/schemas/roles-permissions/role.schema.ts
import { z } from "zod";
import { ROLES, Role } from "@/constants/roles";
import { PERMISSIONS, Permission } from "@/constants/permissions";
import { RoleSchema } from "./role.schema";
import { PermissionSchema } from "./permission.schema";

/**
 * Role-Permission Mapping Schema
 * Defines the structure of a role and its associated permissions.
 */
export const RolePermissionSchema = z
  .object({
    role: RoleSchema.describe("The role name."),
    permissions: z
      .array(PermissionSchema)
      .nonempty("At least one permission must be assigned to the role.")
      .describe("List of permissions granted to this role."),
  })
  .openapi({
    title: "RolePermission",
    description:
      "Represents a role and the list of permissions assigned to it.",
    example: {
      role: ROLES.ADMIN,
      permissions: [PERMISSIONS.CREATE_USER, PERMISSIONS.DELETE_USER],
    },
  });

export const RolePermissionListSchema = z.array(RolePermissionSchema);
