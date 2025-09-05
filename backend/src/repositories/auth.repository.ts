import { prisma } from "@/lib/prisma";

export const AuthRepository = {
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
