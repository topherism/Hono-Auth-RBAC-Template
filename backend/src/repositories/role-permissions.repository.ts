// // src/repositories/role-permission.repository.ts
import { prisma } from "@/db/client";
import { PermissionInputList, RoleInput } from "@/schemas/roles-permissions";

export const RolePermissionRepository = {
  //   /** Get all Role-Permission pairs */
  async getAll() {
    return prisma.role.findMany({
      select: {
        name: true,
        rolePerms: {
          select: {
            permission: { select: { name: true } },
          },
        },
      },
    });
  },

  async getOneRolePermission(role: RoleInput) {
    return prisma.role.findUnique({
      where: { name: role },
      select: {
        name: true,
        rolePerms: {
          select: {
            permission: { select: { name: true } },
          },
        },
      },
    });
  },

  /** Create many role‐permission links */
  async createRolePermissions(roleId: number, permissionIds: number[]) {
    return prisma.rolePermission.createMany({
      data: permissionIds.map((pid) => ({
        roleId,
        permissionId: pid,
      })),
      skipDuplicates: true,
    });
  },

  async deleteRolePermissions(roleId: number, permissionIds: number[]) {
    return prisma.rolePermission.deleteMany({
      where: {
        roleId,
        permissionId: { in: permissionIds },
      },
    });
  },
};
