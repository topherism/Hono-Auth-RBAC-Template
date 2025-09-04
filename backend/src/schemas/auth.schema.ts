import { z } from "zod";
import { extendZodWithOpenApi } from "@hono/zod-openapi";

// Extend Zod with OpenAPI
extendZodWithOpenApi(z);

// ✅ Auth Register Schema
export const RegisterSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .openapi({
        example: "user@example.com",
        description: "Valid email address",
      }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(30, { message: "Username must not exceed 30 characters" })
      .optional()
      .openapi({
        example: "john_doe",
        description: "Unique username (optional)",
      }),
    password: z
      .string()
      .min(10, { message: "Password must be at least 10 characters long." })
      .max(100, { message: "Password must not exceed 100 characters" })
      .openapi({ example: "MyS3cureP@ssw0rd", description: "Secure password" }),
  })
  .openapi("RegisterSchema");

// ✅ Auth Login Schema
export const LoginSchema = z
  .object({
    emailOrUsername: z
      .string()
      .min(3, { message: "Must be at least 3 characters" })
      .openapi({
        example: "user@example.com or john_doe",
        description: "Either email or username",
      }),
    password: z
      .string()
      .min(10, { message: "Password must be at least 10 characters long." })
      .max(100, { message: "Password must not exceed 100 characters" })
      .openapi({ example: "MyS3cureP@ssw0rd", description: "Secure password" }),
  })
  .openapi("LoginSchema");

// ✅ Auth Response Schema
export const AuthResponseSchema = z
  .object({
    accessToken: z
      .string()
      .openapi({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        description: "JWT access token",
      }),
    refreshToken: z
      .string()
      .openapi({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        description: "JWT refresh token",
      }),
  })
  .openapi("AuthResponseSchema");

// ✅ Export inferred TS types
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
