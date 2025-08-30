import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";

export const AuthRepository = {
  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  async findUserByUsername(username?: string): Promise<User | null> {
    if (!username) return null;
    return prisma.user.findUnique({ where: { username } });
  },
  
  async createUser(
    email: string,
    password: string,
    username?: string
  ): Promise<User> {
    return prisma.user.create({
      data: { email, password, username },
    });
  },
};
