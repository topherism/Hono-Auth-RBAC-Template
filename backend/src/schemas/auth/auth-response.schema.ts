import { z } from "zod";
import { extendZodWithOpenApi } from "@hono/zod-openapi";

extendZodWithOpenApi(z);

// ✅ Auth Response Schema
export const AuthResponseSchema = z
  .object({
    accessToken: z.string().openapi({
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      description: "JWT access token",
    }),
    refreshToken: z.string().openapi({
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      description: "JWT refresh token",
    }),
  })
  .openapi("AuthResponseSchema");

export type AuthResponse = z.infer<typeof AuthResponseSchema>;