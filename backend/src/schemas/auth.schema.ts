import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { sendError, ERROR_MESSAGES } from "@/utils/response";

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email format"),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  password: z.string().min(10, "Password must be at least 10 characters long."),
});

// ✅ Export inferred type
export type RegisterInput = z.infer<typeof RegisterSchema>;

// ✅ Attach schema to validator → automatically types c.req.valid("json")
export const registerValidator = zValidator(
  "json",
  RegisterSchema,
  (result, c) => {
    if (!result.success) {
      const issues = result.error.issues.map((i) => i.message);
      return sendError(c, ERROR_MESSAGES.VALIDATION_FAILED, issues);
    }
    
  }

  


);
