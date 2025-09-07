import { z } from "zod";

export const CreateUserSchema = z
  .object({
    email: z.string().email().openapi({
      example: "test@test.com",
      description: "Unique email address",
    }),
    username: z.string().min(3).optional().nullable().openapi({
      example: "testusername",
      description: "Unique username (optional)",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .openapi({
        example: "password123",
        description: "Password with at least 6 characters",
      }),
    first_name: z.string().min(1).openapi({
      example: "Juan",
      description: "First Name of User",
    }),
    middle_name: z.string().optional().nullable().openapi({
      example: "Santos",
      description: "Middle name (optional)",
    }),
    last_name: z.string().min(1).openapi({
      example: "Dela Cruz",
      description: "Last Name of User",
    }),
  })
  .openapi("CreateUserSchema");

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
