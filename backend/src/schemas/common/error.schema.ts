// src/schemas/common/error.schema.ts
import { z } from "zod";

// For Zod validation errors (422)
export const ZodErrorSchema = z.object({
  message: z.string(),
  path: z.array(z.union([z.string(), z.number()])),
});

export const ValidationErrorResponseSchema = z.object({
  message: z.string(),
  errors: z.array(ZodErrorSchema).optional(),
});

// For business logic / server errors (409, 500, etc.)
export const ErrorResponseSchema = z.object({
  message: z.string(),
});

export type ValidationErrorResponse = z.infer<typeof ValidationErrorResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
