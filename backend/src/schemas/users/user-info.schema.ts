import { z } from "zod";

export const UserInfoSchema = z.object({
  userId: z.string().uuid(),
  firstName: z.string(),
  middleName: z.string().nullable(),
  lastName: z.string(),
});

export type UserInfoResponse = z.infer<typeof UserInfoSchema>;
