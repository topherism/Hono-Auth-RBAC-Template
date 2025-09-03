import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";
import { isValid } from "zod/v3";

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

  async createRefreshToken(userId: string, expiresAt: Date, jti: string) {
    return prisma.refreshToken.create({
      data: { jti, userId, expiresAt },
    });
  },

  async findRefreshToken(jti: string) {
    return prisma.refreshToken.findUnique({ where: { jti } });
  },

  async isValidRefreshToken(jti: string, userId: string) {
    const token = await prisma.refreshToken.findUnique({
      where: { jti },
    });
    if (!token || token.userId !== userId) return false;
    if (token.expiresAt < new Date()) return false;
    return true;
  },

  async deleteRefreshToken(jti: string) {
    return prisma.refreshToken.deleteMany({
      where: { jti },
    });
  },
};
