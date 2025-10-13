// src/services/user.service.ts
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserInput } from "@/schemas/users";
import { BcryptHelper } from "@/utils/hash";
import { AppError } from "@/lib/errors";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { RoleRepository } from "@/repositories/role.repository";
import { Prisma } from "@prisma/client";
import { PatchUserInput } from "@/schemas/users/patch-user.schema";

export const UserService = {
  async createUser(input: CreateUserInput) {
    // Check email
    const existingEmail = await UserRepository.findUserWithInfoByEmail(
      input.email
    );
    if (existingEmail) {
      throw new AppError(HttpStatusCodes.CONFLICT, "Email already in use");
    }

    // Check username (if provided)
    if (input.username) {
      const existingUsername = await UserRepository.findUserWithInfoByUsername(
        input.username
      );
      if (existingUsername) {
        throw new AppError(HttpStatusCodes.CONFLICT, "Username already in use");
      }
    }

    // Hash password
    const hashedPassword = await BcryptHelper.hash(input.password);

    // Create user
    const user = await UserRepository.createUserWithInfo({
      ...input,
      password: hashedPassword,
      username: input.username ?? null,
      middle_name: input.middle_name ?? null, // ✅ always null, not undefined
    });

    if (!user) {
      throw new AppError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        HttpStatusPhrases.INTERNAL_SERVER_ERROR
      );
    }
    console.log("Created user:", user);

    return user;
  },

  async getAllUsers() {
    const users = await UserRepository.findAllUserWithInfo();

    return users;
  },

  async getOneUser(id: string) {
    const user = await UserRepository.findUserWithInfoById(id);

    if (!user) throw new AppError(HttpStatusCodes.NOT_FOUND, "User not found"); // user not found

    return user;
  },

  async patchUser(id: string, updates: PatchUserInput) {
    const user = await UserRepository.findUserWithInfoById(id);
    if (!user) throw new AppError(HttpStatusCodes.NOT_FOUND, "User not found"); // user not found

    if (user.isSystem === true) {
      throw new AppError(
        HttpStatusCodes.FORBIDDEN,
        "Cannot modify system user"
      );
    }

    if (updates.email && updates.email !== user.email) {
      const existingEmail = await UserRepository.findUserWithInfoByEmail(
        updates.email
      );
      if (existingEmail) {
        throw new AppError(HttpStatusCodes.CONFLICT, "Email already in use");
      }
    }

    if (updates.username && updates.username !== user.username) {
      const existingUsername = await UserRepository.findUserWithInfoByUsername(
        updates.username
      );
      if (existingUsername) {
        throw new AppError(HttpStatusCodes.CONFLICT, "Username already in use");
      }
    }

    if (updates.password) {
      updates.password = await BcryptHelper.hash(updates.password);
    }

    if (updates.role && updates.role !== user.role) {
      const role = await RoleRepository.findRoleByName(updates.role);
      if (!role) {
        throw new AppError(
          HttpStatusCodes.BAD_REQUEST,
          "Invalid role provided"
        );
      }
    }

    // ✅ Build update data
    const updateData: Prisma.UserUpdateInput = {
      email: updates.email ?? undefined,
      username: updates.username ?? undefined,
      password: updates.password ?? undefined,
      changedPasswordAt: updates.password ? new Date() : undefined,
      isActive: updates.isActive ?? undefined,
      roleInfo: updates.role
        ? {
            connect: { name: updates.role }, // 👈 connect by role name (unique)
          }
        : undefined,
      userInfo:
        updates.first_name || updates.middle_name || updates.last_name
          ? {
              update: {
                firstName: updates.first_name ?? user.userInfo?.firstName,
                middleName: updates.middle_name ?? user.userInfo?.middleName,
                lastName: updates.last_name ?? user.userInfo?.lastName,
              },
            }
          : undefined,
    };

    const patchedUser = await UserRepository.updateUser(id, updateData);
    if (!patchedUser) {
      throw new AppError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        HttpStatusPhrases.INTERNAL_SERVER_ERROR
      );
    }

    return {
      id: patchedUser.id,
      email: patchedUser.email,
      username: patchedUser.username,
      userInfo: patchedUser.userInfo,
      role: patchedUser.role,
      isActive: patchedUser.isActive,
      changePasswordAt: patchedUser.changedPasswordAt,
    };
  },
};
