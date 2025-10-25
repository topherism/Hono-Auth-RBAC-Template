// src/repositories/permissions.repository.ts
import { prisma } from "@/db/client";
import { PermissionInputList } from "@/schemas/roles-permissions";

export const PermissionRepository = {
  async getAll() {
    return prisma.permission.findMany();
  },

  async findPermissionIdsByNames(permissions: PermissionInputList) {
    return prisma.permission.findMany({
      where: {
        name: { in: permissions },
      },
      select: { id: true },
    });
  },
};
