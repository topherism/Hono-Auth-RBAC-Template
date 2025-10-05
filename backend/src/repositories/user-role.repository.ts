// src/repositories/user-role.repository.ts
import { prisma } from "@/db/client";

export const UserRoleRepository = {
  async assignUserRole(userId: string, roleId: number) {
    const user = await prisma.userRole.create({
      data: { userId, roleId },
    });

    return user;
  },

  async findUserRole(userId: string, roleId: number) {
    return prisma.userRole.findUnique({
      where: { userId_roleId: { userId, roleId } },
    });
  },

  async checkUser(userId: string) {
    return prisma.user.findUnique({ where: { id: userId } });
  },

  async checkRole(roleId: number) {
    return prisma.role.findUnique({ where: { id: roleId } });
  },
};