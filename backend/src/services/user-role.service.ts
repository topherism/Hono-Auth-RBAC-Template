// src/services/user.service.ts
import { AppError } from "@/lib/errors";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { RoleInput } from "@/schemas/roles-permissions";
import { UserRepository } from "@/repositories/user.repository";
import { UserRoleRepository } from "@/repositories/user-role.repository";

export const UserRoleService = {
  async patchUserRole(userId: string, role: RoleInput) {
    const user = await UserRepository.findUserById(userId);
    if (!user) throw new AppError(HttpStatusCodes.NOT_FOUND, "User not found"); // user not found

    // update the user's role
    const updatedUser = await UserRoleRepository.updateUserRole(user.id, role);

    const updatedUserRole = {
      id: updatedUser.id,
      role: updatedUser.role,
    };

    return updatedUserRole;
  },
};
