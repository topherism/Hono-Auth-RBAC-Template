// src/schemas/roles-permissions/role.schema.ts
import { z } from "zod";
import { ROLES, Role } from "@/constants/roles";

export const RoleSchema = z
  .enum(Object.values(ROLES) as [Role, ...Role[]])
  .openapi({
    example: ROLES.ADMIN,
    description: "Role name of the user",
  });

export type RoleInput = z.infer<typeof RoleSchema>;
