import { z } from "zod";
import { PermissionListSchema, RoleSchema } from "../roles-permissions";

export const UserRolePermissionsResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().nullable(),
  userInfo: z.object({
    firstName: z.string(),
    middleName: z.string().nullable(),
    lastName: z.string(),
  }),
  role: RoleSchema,
  permissions: PermissionListSchema,
});

export const UserRolePermissionsListResponseSchema = z.array(
  UserRolePermissionsResponseSchema
);

export type UserRolePermissionsListType = z.infer<
  typeof UserRolePermissionsListResponseSchema
>;
