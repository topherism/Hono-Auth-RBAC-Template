// src/services/user.service.ts
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserInput, PatchUserInput } from "@/schemas/users";
import { BcryptHelper } from "@/utils/hash";
import { AppError } from "@/lib/errors";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { RolePermissionRepository } from "@/repositories/role-permissions.repository";
import { Permission } from "@/constants/permissions";
import { PermissionInputList, RoleInput } from "@/schemas/roles-permissions";
import { RoleRepository } from "@/repositories/role.repository";

export const RolePermissionsService = {
  async getAllRolePermissions() {
    const rolesWithPerms = await RolePermissionRepository.getAll();

    // 2. Transform Prisma result into clean frontend format
    const formatted = rolesWithPerms.map((role) => ({
      role: role.name,
      permissions: role.rolePerms.map((rp) => rp.permission.name as Permission),
    }));

    return formatted;
  },

  async assignPermissionToRole(role: RoleInput, add: PermissionInputList) {
    if (!role) {
      throw new AppError(HttpStatusCodes.BAD_REQUEST, "Role must be provided");
    }
    if (!add.length) {
      throw new AppError(
        HttpStatusCodes.BAD_REQUEST,
        "No permissions provided to add."
      );
    }

    const existingPermissions =
      await RolePermissionRepository.findPermissionIdsByNames(add);
    if (existingPermissions.length !== add.length) {
      throw new AppError(
        HttpStatusCodes.BAD_REQUEST,
        "One or more permissions do not exist"
      );
    }

    const roleInfo = await RoleRepository.findRoleByName(role);
    if (!roleInfo)
      throw new AppError(
        HttpStatusCodes.BAD_REQUEST,
        `Role '${role}' not found.`
      );

    const permissionIds = existingPermissions.map((p) => p.id);

    // 3. Create role‐permissions
    await RolePermissionRepository.createRolePermissions(
      roleInfo.id!,
      permissionIds
    );

    const updatedRoleWithPerms =
      await RolePermissionRepository.getOneRolePermission(role);

    if (!updatedRoleWithPerms) {
      throw new AppError(
        HttpStatusCodes.BAD_REQUEST,
        `Failed to retrieve updated role permissions for '${role}'.`
      );
    }

    const formatted = {
      role: updatedRoleWithPerms.name,
      permissions: updatedRoleWithPerms.rolePerms.map(
        (rp) => rp.permission.name as Permission
      ),
    };

    return formatted;
  },

  async unassignPermissionToRole(role: RoleInput, remove: PermissionInputList) {
    if (!role) {
      throw new AppError(HttpStatusCodes.BAD_REQUEST, "Role must be provided");
    }
    if (!remove.length) {
      throw new AppError(
        HttpStatusCodes.BAD_REQUEST,
        "No permissions provided to remove."
      );
    }

    // 2️⃣ Find permission IDs
    const existingPermissions =
      await RolePermissionRepository.findPermissionIdsByNames(remove);

    if (existingPermissions.length !== remove.length) {
      throw new AppError(
        HttpStatusCodes.BAD_REQUEST,
        "One or more permissions do not exist"
      );
    }

    // 3️⃣ Find role info
    const roleInfo = await RoleRepository.findRoleByName(role);
    if (!roleInfo) {
      throw new AppError(
        HttpStatusCodes.BAD_REQUEST,
        `Role '${role}' not found. Please contact support.`
      );
    }

    // 4️⃣ Remove the role-permission relations
    const permissionIds = existingPermissions.map((p) => p.id);

    await RolePermissionRepository.deleteRolePermissions(
      roleInfo.id,
      permissionIds
    );

    // 5️⃣ Fetch updated role-permission list
    const updatedRoleWithPerms =
      await RolePermissionRepository.getOneRolePermission(role);

    if (!updatedRoleWithPerms) {
      throw new AppError(
        HttpStatusCodes.BAD_REQUEST,
        `Failed to retrieve updated role permissions for '${role}'.`
      );
    }

    // 6️⃣ Format and return
    const formatted = {
      role: updatedRoleWithPerms.name,
      permissions: updatedRoleWithPerms.rolePerms.map(
        (rp) => rp.permission.name as Permission
      ),
    };

    return formatted;
  },

  //   async getOneUser(id: string) {
  //     const user = await UserRepository.findUserWithInfoById(id);

  //     if (!user) throw new AppError(HttpStatusCodes.NOT_FOUND, "User not found"); // user not found

  //     return user;
  //   },
};
