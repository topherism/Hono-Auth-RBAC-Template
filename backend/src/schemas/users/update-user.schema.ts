import { z } from "zod";

export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(3).nullable().optional(),
  first_name: z.string().optional(),
  middle_name: z.string().nullable().optional(),
  last_name: z.string().optional(),
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
