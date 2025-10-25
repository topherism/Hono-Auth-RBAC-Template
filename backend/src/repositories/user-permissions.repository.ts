// src/repositories/user-permissions.repository.ts
import { prisma } from "@/db/client";

export const UserPermissionRepository = {
  async getAll() {
    return prisma.permission.findMany();
  },

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

  async getEffectivePermissions(userId: string) {
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
};
