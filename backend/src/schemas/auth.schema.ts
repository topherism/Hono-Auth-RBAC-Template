import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { sendError, ERROR_MESSAGES } from "@/utils/response";
import { extendZodWithOpenApi } from "@hono/zod-openapi";

// Extend Zod with OpenAPI helpers
extendZodWithOpenApi(z);

// ✅ Auth Register Schema with OpenAPI metadata
export const RegisterSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .openapi({ example: "user@example.com", description: "Valid email address" }),

  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username must not exceed 30 characters" })
    .optional()
    .openapi({ example: "john_doe", description: "Unique username (optional)" }),

  password: z
    .string()
    .min(10, { message: "Password must be at least 10 characters long." })
    .max(100, { message: "Password must not exceed 100 characters" })
    .openapi({ example: "MyS3cureP@ssw0rd", description: "Secure password" }),
}).openapi("RegisterSchema"); // <-- schema name for docs

// ✅ Export inferred TypeScript type
export type RegisterInput = z.infer<typeof RegisterSchema>;

// ✅ Validator middleware (typed + OpenAPI-ready)
export const registerValidator = zValidator("json", RegisterSchema, (result, c) => {
  if (!result.success) {
    const issues = result.error.issues.map((i) => i.message);
    return sendError(c, ERROR_MESSAGES.VALIDATION_FAILED, issues);
  }
});
