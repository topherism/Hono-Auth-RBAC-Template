// src/db/transactions.ts
import { prisma } from "./client";

/**
 * Example transaction: create a user with a role in one atomic step
 */
export async function createUserWithRole(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: number;
}) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: data.email,
        password: data.password, // hash before calling this
        userInfo: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
        },
      },
    });

    await tx.userRole.create({
      data: {
        userId: user.id,
        roleId: data.roleId,
      },
    });

    return user;
  });
}

/**
 * Example transaction: revoke all refresh tokens for a user
 */
export async function revokeAllTokens(userId: string) {
  return prisma.$transaction(async (tx) => {
    await tx.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  });
}
