import { z } from "zod";
import { extendZodWithOpenApi } from "@hono/zod-openapi";

// Extend Zod with OpenAPI
extendZodWithOpenApi(z);

export const CreateUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).optional(),
  password: z.string().min(6),
  first_name: z.string().min(1).openapi({
    example: "Juan",
    description: "First Name of User",
  }),
  middle_name: z.string().optional().openapi({
    example: "Santos",
    description: "Middle Name of User",
  }),
  last_name: z.string().min(1).openapi({
    example: "Dela Cruz",
    description: "Last Name of User",
  }),
}).openapi("CreateUserSchema");;

// UserInfoSchema
export const UserResponseSchema = z
  .object({
    id: z.string().uuid(),
    email: z.string().email(),
    username: z.string().nullable(),
    first_name: z.string().openapi({
      example: "Juan",
      description: "First Name of User",
    }),
    middle_name: z.string().optional().openapi({
      example: "Santos",
      description: "Middle Name of User",
    }),
    last_name: z.string().openapi({
      example: "Dela Cruz",
      description: "Last Name of User",
    }),
  })
  .openapi("UserInfoSchema");

// ✅ Export inferred TS types
export type UserInfoInput = z.infer<typeof UserResponseSchema>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
