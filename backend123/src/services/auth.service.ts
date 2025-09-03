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

  async verifyPassword(plainText: string, hashed: string) {
    return BcryptHelper.verify(plainText, hashed);
  },

  async insertRefreshToken(userId: string, expiresAt: Date, jti: string) {
    return AuthRepository.createRefreshToken(userId, expiresAt, jti);
  } 

};
