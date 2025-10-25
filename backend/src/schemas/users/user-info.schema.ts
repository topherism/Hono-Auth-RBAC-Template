import { z } from "zod";

export const UserInfoSchema = z.object({
  userId: z.string().regex(
    /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/,
    "Invalid UUID123123"
  ),
  firstName: z.string(),
  middleName: z.string().nullable(),
  lastName: z.string(),
}).nullable();

export type UserInfoResponse = z.infer<typeof UserInfoSchema>;
