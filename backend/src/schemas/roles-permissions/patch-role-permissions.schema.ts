import z from "zod";
import { ROLES } from "@/constants/roles";
import { PERMISSIONS } from "@/constants/permissions";
import { RoleSchema, PermissionSchema } from "@/schemas/roles-permissions";

/**
 * Role-Permission Patch Schema
 * Used to partially update (add/remove) permissions for a given role.
 */
export const PatchRolePermissionSchema = z
  .object({
    role: RoleSchema.describe("The role whose permissions will be updated."),

    add: z
      .array(PermissionSchema)
      .optional()
      .describe("Permissions to be added to the role."),

    remove: z
      .array(PermissionSchema)
      .optional()
      .describe("Permissions to be removed from the role."),
  })
  .refine(
    (data) => data.add?.length || data.remove?.length,
    "At least one of 'add' or 'remove' must be provided."
  )
  .openapi({
    title: "PatchRolePermission",
    description:
      "Partially update a role’s permissions. You can specify permissions to add and/or remove.",
    example: {
      role: ROLES.ADMIN,
      add: [PERMISSIONS.CREATE_USER, PERMISSIONS.UPDATE_USER],
      remove: [PERMISSIONS.DELETE_USER],
    },
  });
