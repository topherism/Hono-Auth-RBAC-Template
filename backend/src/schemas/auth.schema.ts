// src/schemas/auth.schema.ts
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(10, "Password must be at least 10 characters long."),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

// No helper, just use zValidator directly
export const registerValidator = zValidator("json", RegisterSchema);
