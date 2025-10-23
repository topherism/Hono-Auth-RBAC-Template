// src/schemas/users.ts
import { z } from "zod";
import { RoleName } from "@prisma/client";
import { RoleSchema } from "../roles-permissions";

export const PatchUserSchema = z.object({
  email: z.string().email().optional().openapi({
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
    .optional()
    .openapi({
      example: "password123",
      description: "Password with at least 6 characters",
    }),
  first_name: z.string().min(1).optional().openapi({
    example: "Juan",
    description: "First Name of User",
  }),
  middle_name: z.string().optional().nullable().openapi({
    example: "Santos",
    description: "Middle name (optional)",
  }),
  last_name: z.string().min(1).optional().openapi({
    example: "Dela Cruz",
    description: "Last Name of User",
  }),
  role: RoleSchema.optional(),
  isActive: z.boolean().optional().openapi({
    example: true,
    description: "Indicates if the user is active",
  }),
}).openapi("PatchUserSchema");

export const PatchUserResponseSchema = PatchUserSchema.extend({
  id: z.string().uuid().openapi({ example: "uuid" }),
  changePasswordAt: z.date().optional().nullable(),
});

export type PatchUserInput = z.infer<typeof PatchUserSchema>;
