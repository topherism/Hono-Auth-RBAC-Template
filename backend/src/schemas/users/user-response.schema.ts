import { z } from "zod";
import { UserInfoSchema } from "./user-info.schema";
import { RoleSchema } from "../roles-permissions/role.schema";

export const UserResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().nullable(),
  createdAt: z.string().datetime(),
  userInfo: UserInfoSchema,
  role: RoleSchema,
});

export const UserListResponseSchema = z.array(UserResponseSchema);

export type UserResponse = z.infer<typeof UserResponseSchema>;
export type UserListResponse = z.infer<typeof UserListResponseSchema>;
