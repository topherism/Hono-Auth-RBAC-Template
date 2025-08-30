// src/utils/makeValidator.ts
import { zValidator } from "@hono/zod-validator";
import type { ZodObject, ZodRawShape, ZodTypeAny } from "zod";
import { sendError, ERROR_MESSAGES } from "@/utils/response";

type ValidatorTarget = "json" | "form" | "query" | "param";


export function makeValidator<T extends ZodTypeAny>(
  target: ValidatorTarget,
  schema: T
) {
  return zValidator(target, schema, (result, c) => {
    if (!result.success) {
      return sendError(
        c,
        ERROR_MESSAGES.VALIDATION_FAILED,
        result.error.issues.map((i) => i.message)
      );
    }
  });
}

