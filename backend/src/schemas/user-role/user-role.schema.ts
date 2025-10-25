// src/schemas/roles-permissions/role.schema.ts
import { z } from "zod";
import { ROLES, Role } from "@/constants/roles";
import { RoleSchema } from "@/schemas/roles-permissions/role.schema";

/**
 * Role-Permission Mapping Schema
 * Defines the structure of a role and its associated permissions.
 */
export const UserRoleSchema = z
  .object({
    id: z.string().uuid().describe("The unique identifier of the user."),
    role: RoleSchema.describe("The role assigned to the user."),
  })
  .strict()
  .openapi({
    title: "UserRole",
    description: "Represents a user Id and the role assigned to them",
    example: {
      id: "",
      permissions: [ROLES.SUPERADMIN, ROLES.ADMIN],
    },
  });

export const UserRoleListSchema = z.array(UserRoleSchema);
