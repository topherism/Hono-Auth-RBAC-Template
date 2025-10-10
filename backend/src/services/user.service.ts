// src/services/user.service.ts
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserInput } from "@/schemas/users";
import { BcryptHelper } from "@/utils/hash";
import { AppError } from "@/lib/errors";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { RoleRepository } from "@/repositories/role.repository";

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
};
