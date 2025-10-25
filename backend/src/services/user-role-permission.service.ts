// src/services/user.service.ts
import { AppError } from "@/lib/errors";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { UserRolePermissionRepository } from "@/repositories/user-role-permissions.repository";
import { UserRolePermissionsListResponse } from "@/schemas/user-role-permissions";

export const UserRolePermissionsService = {
  async getAllUserRolePermissions() {
    const userRolePermissions =
      await UserRolePermissionRepository.getUserWithEffectivePermissions();

    return userRolePermissions as UserRolePermissionsListResponse;
  },
};
