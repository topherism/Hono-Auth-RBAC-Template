import { z } from "zod";
import { extendZodWithOpenApi } from "@hono/zod-openapi";
import { UserInfoSchema } from "../users";
import { PermissionListSchema, RoleSchema } from "../roles-permissions";

extendZodWithOpenApi(z);

const user = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().nullable(),
  createdAt: z.string().datetime(),
  userInfo: UserInfoSchema,
  role: RoleSchema,
  permissions: PermissionListSchema
});

// ✅ Auth Response Schema
export const AuthResponseSchema = z
  .object({
    user: user,
    accessToken: z.string().openapi({
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      description: "JWT access token",
    }),
  });

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
