import { AppError } from "@/lib/errors";
import { AuthRepository } from "@/repositories/auth.repository";
import { UserRepository } from "@/repositories/user.repository";
import { BcryptHelper } from "@/utils/hash";
import { generateToken, refreshTokenCookie } from "@/utils/jwt";
import * as HttpStatusCodes from "stoker/http-status-codes";

export const AuthService = {
  async login(emailOrUsername: string, password: string) {
    // Find user by email or username
    let user =
      (await UserRepository.findUserWithInfoByEmail(emailOrUsername)) ??
      (await UserRepository.findUserWithInfoByUsername(emailOrUsername));

    if (!user)
      throw new AppError(HttpStatusCodes.UNAUTHORIZED, "Invalid credentials");

    // Verify password
    const valid = await BcryptHelper.verify(password, user.password);
    if (!valid)
      throw new AppError(HttpStatusCodes.UNAUTHORIZED, "Invalid credentials");

    // Generate tokens
    const { accessToken, refreshToken, jti, refreshTokenExp } =
      await generateToken(user.id);

    // Save refresh token in DB
    await AuthRepository.createRefreshToken(user.id, refreshTokenExp, jti);

    // Return result to handler
    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.userInfo!.firstName,
        middleName: user.userInfo?.middleName ?? null,
        lastName: user.userInfo!.lastName,
      },
      tokens: { accessToken, refreshToken },
    };
  },

  async refresh(refreshToken: string) {
    // finds jti in the refreshToken db
    const tokenRecord = await AuthRepository.findRefreshToken(refreshToken);
    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new AppError(
        HttpStatusCodes.UNAUTHORIZED,
        "Invalid or expired refresh token"
      );
    }

    // Generate new access token (and optionally new refresh token)
    const {
      accessToken,
      refreshToken: newRefreshToken,
      jti,
      refreshTokenExp,
    } = await generateToken(tokenRecord.userId);

    // Save new refresh token and delete old one
    await AuthRepository.deleteRefreshToken(refreshToken);
    await AuthRepository.createRefreshToken(
      tokenRecord.userId,
      refreshTokenExp,
      jti
    );

    return { accessToken, refreshToken: newRefreshToken };
  },

};
