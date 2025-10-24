import { z } from "zod";
import { extendZodWithOpenApi } from "@hono/zod-openapi";

extendZodWithOpenApi(z);

// ✅ Auth Login Schema
export const LoginSchema = z
  .object({
    emailOrUsername: z
      .string()
      .trim()
      .min(3, { message: "Must be at least 3 characters" })
      .refine(
        (val) => {
          if (val.includes("@")) {
            // validate as email
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
          }
          // validate as username (already min(3), so just return true)
          return true;
        },
        {
          message: "Invalid email format",
        }
      )
      .openapi({
        example: "test@test.com or testusername",
        description: "Either a valid email or a username (min 3 characters)",
      }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .openapi({ example: "password123", description: "Secure password" }),
  })
  .strict()
  .openapi("LoginSchema");

// ✅ Export inferred TS types
export type LoginInput = z.infer<typeof LoginSchema>;
