// src/repositories/user-role.repository.ts
import { prisma } from "@/db/client";
import { RoleInput } from "@/schemas/roles-permissions";

export const RoleRepository = {
  async getAllRole() {
    return prisma.role.findMany();
  },

  async findRoleById(roleId: number) {
    return prisma.role.findUnique({ where: { id: roleId } });
  },

  async findRoleByName(roleName: RoleInput) {
    return prisma.role.findUnique({
      where: { name: roleName },
    });
  },
};
