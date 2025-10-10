// src/repositories/user-role.repository.ts
import { prisma } from "@/db/client";

export const RoleRepository = {
  async getAllRole() {
    return prisma.role.findMany();
  },
  
  async checkRole(roleId: number) {
    return prisma.role.findUnique({ where: { id: roleId } });
  },

  async getRoleId(roleName: string) {
    return prisma.role.findUnique({
      where: { name: roleName },
    });
  },
};
