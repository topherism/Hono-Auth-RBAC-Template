import { z } from "zod";
import { UserInfoSchema } from "./user-info.schema";
import { RoleSchema } from "../roles-permissions";

export const UserResponseSchema = z.object({
  id: z.string().regex(
    /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/,
    "Invalid UUID123123"
  ),
  email: z.string().email(),
  username: z.string().nullable(),
  createdAt: z.string().datetime(),
  userInfo: UserInfoSchema,
  role: RoleSchema,
});

export const UserListResponseSchema = z.array(UserResponseSchema);

export type UserResponse = z.infer<typeof UserResponseSchema>;
export type UserListResponse = z.infer<typeof UserListResponseSchema>;
