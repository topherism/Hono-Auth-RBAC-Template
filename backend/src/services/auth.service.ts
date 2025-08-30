import { AuthRepository } from "@/repositories/auth.repository";
import { BcryptHelper } from "@/utils/hash";

export const AuthService = {
  async register(email: string, password: string, username?: string) {
    let existingUser;
     existingUser = await AuthRepository.findUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    existingUser = await AuthRepository.findUserByUsername(username);
    if (existingUser) throw new Error("User already exists");

    const hashPassword = await BcryptHelper.hash(password);

    const user = await AuthRepository.createUser(email, hashPassword, username);

    return user;
  },
};
