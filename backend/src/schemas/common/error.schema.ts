// src/schemas/common/error.schema.ts
import { z } from "zod";

export const ZodErrorSchema = z.object({
  message: z.string(), // short explanation
  path: z.array(z.union([z.string(), z.number()])), // which field failed
});

export const ErrorResponseSchema = z.object({
  message: z.string(),
  errors: z.array(ZodErrorSchema).optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
