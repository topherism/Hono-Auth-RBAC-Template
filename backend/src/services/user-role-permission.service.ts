// src/services/user.service.ts
import { UserRolePermissionRepository } from "@/repositories/user-role-permissions.repository";

export const UserRolePermissionsService = {
  async getAllUserRolePermissions() {
    const userRolePermissions =
      await UserRolePermissionRepository.getUserWithEffectivePermissions();
    return userRolePermissions;
  },
};
