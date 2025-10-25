// src/services/user.service.ts
import { AppError } from "@/lib/errors";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { PermissionInputList } from "@/schemas/roles-permissions";
import { UserRepository } from "@/repositories/user.repository";
import { PermissionRepository } from "@/repositories/permission.repository";
import { UserPermissionRepository } from "@/repositories/user-permissions.repository";

export const UserPermissionsService = {
  async grantUserPermissions(userId: string, permissions: PermissionInputList) {
    const user = await UserRepository.findUserById(userId);
    if (!user) throw new AppError(HttpStatusCodes.NOT_FOUND, "User not found"); // user not found

    const permissionIds = await PermissionRepository.findPermissionIdsByNames(
      permissions
    );
    if (permissionIds.length === 0) {
      throw new AppError(
        HttpStatusCodes.BAD_REQUEST,
        "No valid permissions found to grant."
      );
    }

    // grant the permissions to the user
    await UserPermissionRepository.grantManyPermissions(
      user.id,
      permissionIds.map((p) => p.id)
    );

    // remove the denied permissions if they exist
    await UserPermissionRepository.removeDeniedPermissions(
      user.id,
      permissionIds.map((p) => p.id)
    );

    //get updated effective permissions
    const effectivePermissions =
      await UserPermissionRepository.getEffectivePermissionsById(userId);
    if (!effectivePermissions) {
      throw new AppError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to fetch updated user permissions"
      );
    }

    const updatedUserWithPermissions = {
      id: user.id,
      permissions: effectivePermissions as PermissionInputList,
    };

    return updatedUserWithPermissions;
  },

  async denyUserPermissions(userId: string, permissions: PermissionInputList) {
    const user = await UserRepository.findUserById(userId);
    if (!user) throw new AppError(HttpStatusCodes.NOT_FOUND, "User not found"); // user not found

    const permissionIds = await PermissionRepository.findPermissionIdsByNames(
      permissions
    );
    if (permissionIds.length === 0) {
      throw new AppError(
        HttpStatusCodes.BAD_REQUEST,
        "No valid permissions found to grant."
      );
    }

    await UserPermissionRepository.denyManyPermissions(
      user.id,
      permissionIds.map((p) => p.id)
    );

    await UserPermissionRepository.removeGrantedPermissions(
      userId,
      permissionIds.map((p) => p.id)
    );

    const effectivePermissions =
      await UserPermissionRepository.getEffectivePermissionsById(userId);
    if (!effectivePermissions) {
      throw new AppError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to fetch updated user permissions"
      );
    }

    const updatedUserWithPermissions = {
      id: user.id,
      permissions: effectivePermissions as PermissionInputList,
    };

    return updatedUserWithPermissions;
  },
};
