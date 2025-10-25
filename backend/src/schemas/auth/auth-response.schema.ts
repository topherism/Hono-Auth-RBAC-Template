import { z } from "zod";
import { extendZodWithOpenApi } from "@hono/zod-openapi";
import { UserInfoSchema } from "../users";
import { PermissionListSchema, RoleSchema } from "../roles-permissions";

extendZodWithOpenApi(z);

const user = z.object({
  id: z.string().regex(
    /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/,
    "Invalid UUID123123"
  ),
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
