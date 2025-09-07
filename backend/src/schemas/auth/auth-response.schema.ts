import { z } from "zod";
import { extendZodWithOpenApi } from "@hono/zod-openapi";

extendZodWithOpenApi(z);

const user = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().nullable(),
  firstName: z.string(),
  middleName: z.string().nullable(),
  lastName: z.string(),
});

const tokens = z.object({
  accessToken: z.string().openapi({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    description: "JWT access token",
  }),
  refreshToken: z.string().openapi({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    description: "JWT refresh token",
  }),
});

// ✅ Auth Response Schema
export const AuthResponseSchema = z
  .object({
    user: user,
    tokens: tokens,
  })
  .openapi("AuthResponseSchema");

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
