import { AuthRepository } from "@/repositories/auth.repository";
import { BcryptHelper } from "@/utils/hash";

export const AuthService = {
  async findByEmail(email: string) {
    return AuthRepository.findUserByEmail(email);
  },

  async findByUsername(username?: string) {
    if (!username) return null;
    return AuthRepository.findUserByUsername(username);
  },

  async register(email: string, password: string, username?: string) {
    const hashedPassword = await BcryptHelper.hash(password);
    return AuthRepository.createUser(email, hashedPassword, username);
  },
};
