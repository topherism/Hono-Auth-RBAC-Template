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

  async unassignPermissonToRole(role: RoleInput, remove: PermissionInputList) {
    return prisma.rolePermission.deleteMany({
      where: {
        role: {
          name: role,
        },
        permission: {
          name: { in: remove },
        },
      },
    });
  },

  async findPermissionIdsByNames(permissions: PermissionInputList) {
    return prisma.permission.findMany({
      where: {
        name: { in: permissions },
      },
      select: { id: true },
    });
  },

  //   /** Get all default permissions for a given role ID */
  //   async getPermissionsByRoleId(roleId: number) {
  //     return prisma.rolePermission.findMany({
  //       where: { roleId },
  //       include: { permission: true },
  //     });
  //   },

  //   /** Optional: Get all roles that have a specific permission */
  //   async getRolesByPermissionId(permissionId: number) {
  //     return prisma.rolePermission.findMany({
  //       where: { permissionId },
  //       include: { role: true },
  //     });
  //   },
};
