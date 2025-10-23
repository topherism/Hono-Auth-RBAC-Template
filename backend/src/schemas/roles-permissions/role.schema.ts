// src/schemas/roles-permissions/role.schema.ts
import { z } from "zod";
import { ROLES, Role } from "@/constants/roles";

/**
 * Role Schema
 * Represents a single user role (e.g., ADMIN, USER, etc.)
 */
export const RoleSchema = z
  .enum(Object.values(ROLES) as [Role, ...Role[]])
  .openapi({
    title: "Role",
    description: "The role name assigned to a user or group.",
    example: ROLES.ADMIN,
  });

export const RoleInputSchema = z.object({
  role: RoleSchema,
});


export type RoleInput = z.infer<typeof RoleSchema>;
