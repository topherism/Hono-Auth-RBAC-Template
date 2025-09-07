import { z } from "zod";

export const PaginationParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1).openapi({
    example: 1,
    description: "Page number (starting from 1)",
  }),
  limit: z.coerce.number().min(1).max(100).default(10).openapi({
    example: 10,
    description: "Number of items per page",
  }),
});

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    total: z.number().openapi({ example: 42 }),
    page: z.number().openapi({ example: 1 }),
    limit: z.number().openapi({ example: 10 }),
    totalPages: z.number().openapi({ example: 5 }),
  });
