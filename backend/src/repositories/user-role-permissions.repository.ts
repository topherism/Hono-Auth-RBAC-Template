// src/repositories/user-permissions.repository.ts
import { prisma } from "@/db/client";

export const UserRolePermissionRepository = {
  async getUserWithEffectivePermissions() {
    const users = await prisma.user.findMany({
      include: {
        userInfo: true,
        roleInfo: {
          include: {
            rolePerms: {
              include: { permission: true },
            },
          },
        },
        permissions: {
          include: { permission: true },
        },
        deniedPermissions: {
          include: { permission: true },
        },
      },
    });

    if (!users) return [];

    const usersWithEffectivePerms = users.map((user) => {
      const rolePerms =
        user.roleInfo?.rolePerms.map((rp) => rp.permission.name) ?? [];

      const granted = user.permissions.map((up) => up.permission.name);
      const denied = user.deniedPermissions.map((dp) => dp.permission.name);

      const effectivePermissions = Array.from(
        new Set([...rolePerms, ...granted].filter((p) => !denied.includes(p)))
      );

      return {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        userInfo: user.userInfo,
        permissions: effectivePermissions,
      };
    });

    return usersWithEffectivePerms;
  },
};
