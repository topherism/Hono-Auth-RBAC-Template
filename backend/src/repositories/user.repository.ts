import { prisma } from "@/lib/prisma";
import type { User, UserInfo } from "@prisma/client";

export type UserWithInfo = User & { userInfo: UserInfo | null };

export const UserRepository = {
  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  async findUserByUsername(username?: string): Promise<User | null> {
    if (!username) return null;
    return prisma.user.findUnique({ where: { username } });
  },

  async createUserWithInfo(input: {
    email: string;
    password: string;
    username?: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
  }): Promise<UserWithInfo> {
    return prisma.user.create({
      data: {
        email: input.email,
        username: input.username,
        password: input.password,
        userInfo: {
          create: {
            firstName: input.first_name,
            middleName: input.middle_name,
            lastName: input.last_name,
          },
        },
      },
      include: { userInfo: true },
    });
  },
};
