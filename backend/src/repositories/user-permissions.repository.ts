// src/repositories/user-permissions.repository.ts
import { prisma } from "@/db/client";

export const UserPermissionRepository = {
  async findUserPermissionsById(id: string) {
    return prisma.userPermission.findMany({
      where: { userId: id },
    });
  },
  async findUserDeniedPermissionsById(id: string) {
    return prisma.userDeniedPermission.findMany({
      where: { userId: id },
    });
  },

  async getEffectivePermissionsById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
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

    if (!user) return [];

    // 1️⃣ Default role permissions
    const rolePerms =
      user.roleInfo?.rolePerms.map((rp) => rp.permission.name) ?? [];

    // 2️⃣ User granted permissions (explicitly assigned)
    const granted = user.permissions.map((up) => up.permission.name);

    // 3️⃣ User denied permissions (explicitly removed)
    const denied = user.deniedPermissions.map((dp) => dp.permission.name);

    // 4️⃣ Compute effective permissions
    const effective = Array.from(
      new Set([...rolePerms, ...granted].filter((p) => !denied.includes(p)))
    );

    console.log(
      "ROLE PERMS:",
      rolePerms,
      " GRANTED:",
      granted,
      " DENIED:",
      denied,
      " EFFECTIVE:",
      effective
    );
    return effective;
  },

  async grantManyPermissions(userId: string, permissionIds: number[]) {
    return prisma.userPermission.createMany({
      data: permissionIds.map((id) => ({ userId, permissionId: id })),
      skipDuplicates: true,
    });
  },

  async denyManyPermissions(userId: string, permissionIds: number[]) {
    return prisma.userDeniedPermission.createMany({
      data: permissionIds.map((permissionId) => {
        return { userId, permissionId };
      }),
    });
  },

  async removeGrantedPermissions(userId: string, permissionIds: number[]) {
    return prisma.userPermission.deleteMany({
      where: {
        userId,
        permissionId: { in: permissionIds },
      },
    });
  },

  async removeDeniedPermissions(userId: string, permissionIds: number[]) {
    return prisma.userDeniedPermission.deleteMany({
      where: {
        userId,
        permissionId: { in: permissionIds },
      },
    });
  },
};
