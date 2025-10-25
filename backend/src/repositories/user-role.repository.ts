// src/repositories/user-role.repository.ts
import { prisma } from "@/db/client";
import { RoleInput } from "@/schemas/roles-permissions";

export const UserRoleRepository = {
  async updateUserRole(userId: string, role: RoleInput) {
    return prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  },
};
