// src/services/user.service.ts
import { UserRepository } from "@/repositories/user.repository";
import type { RegisterInput } from "@/schemas/auth.schema";
import { CreateUserInput } from "@/schemas/user.schema";
import bcrypt from "bcryptjs";

export const UserService = {
  async createUser(input: CreateUserInput) {
    // Check email
    const existingEmail = await UserRepository.findUserByEmail(input.email);
    if (existingEmail) {
      const err = new Error("Email already in use");
      (err as any).code = "EMAIL_EXISTS";
      throw err;
    }

    // Check username (if provided)
    if (input.username) {
      const existingUsername = await UserRepository.findUserByUsername(
        input.username
      );
      if (existingUsername) {
        const err = new Error("Username already in use");
        (err as any).code = "USERNAME_EXISTS";
        throw err;
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Create user
    const user = await UserRepository.createUserWithInfo({
      ...input,
      password: hashedPassword,
    });

    // Hide password
    const { password, ...safeUser } = user;
    return safeUser;
  },
};
