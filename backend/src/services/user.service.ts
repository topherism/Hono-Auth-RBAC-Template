// src/services/user.service.ts
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserInput } from "@/schemas/users";
import { BcryptHelper } from "@/utils/hash";

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
    const hashedPassword = await BcryptHelper.hash(input.password);

    // Create user
    const user = await UserRepository.createUserWithInfo({
      ...input,
      password: hashedPassword,
      username: input.username ?? undefined,
      middle_name: input.middle_name ?? undefined,
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
