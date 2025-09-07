// src/services/user.service.ts
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserInput } from "@/schemas/users";
import { BcryptHelper } from "@/utils/hash";
import { AppError } from "@/lib/errors";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

export const UserService = {
  // async findByEmail(email: string) {
  //   return AuthRepository.findUserByEmail(email);
  // },

  // async findByUsername(username?: string) {
  //   if (!username) return null;
  //   return AuthRepository.findUserByUsername(username);
  // },

  async createUser(input: CreateUserInput) {
    // Check email
    const existingEmail = await UserRepository.findUserByEmail(input.email);
    if (existingEmail) {
      throw new AppError(HttpStatusCodes.CONFLICT, "Email already in use");
    }

    // Check username (if provided)
    if (input.username) {
      const existingUsername = await UserRepository.findUserByUsername(
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

    console.log(user);

    // Hide password
    const { password, ...safeUser } = user;
    return safeUser;
  },

  async getAllUsers() {
    const users = await UserRepository.findAll();

    // remove sensitive fields like password
    return users.map(({ password, ...rest }) => rest);
  },
};
