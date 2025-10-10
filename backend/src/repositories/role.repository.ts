// src/repositories/user-role.repository.ts
import { prisma } from "@/db/client";
import { RoleName } from "@prisma/client";

export const RoleRepository = {
  async getAllRole() {
    return prisma.role.findMany();
  },

  async checkRole(roleId: number) {
    return prisma.role.findUnique({ where: { id: roleId } });
  },

  async getRoleId(roleName: RoleName) {
    return prisma.role.findUnique({
      where: { name: roleName },
    });
  },
};
