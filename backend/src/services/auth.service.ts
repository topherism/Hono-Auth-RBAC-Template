import { AuthRepository } from "@/repositories/auth.repository";
import { BcryptHelper } from "@/utils/hash";

export const AuthService = {


  async login(emailOrUsername: string, password: string){
  }

  // async register(email: string, password: string, username?: string) {
  //   const hashedPassword = await BcryptHelper.hash(password);
  //   return AuthRepository.createUser(email, hashedPassword, username);
  // },

  // async verifyPassword(plainText: string, hashed: string) {
  //   return BcryptHelper.verify(plainText, hashed);
  // },

  // async insertRefreshToken(userId: string, expiresAt: Date, jti: string) {
  //   return AuthRepository.createRefreshToken(userId, expiresAt, jti);
  // } 

};
