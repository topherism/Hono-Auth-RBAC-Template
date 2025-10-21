import envConfig from "@/env";
import { AppError } from "@/lib/errors";
import { AuthRepository } from "@/repositories/auth.repository";
import { UserRepository } from "@/repositories/user.repository";
import { BcryptHelper } from "@/utils/hash";
import { generateToken, verifyToken } from "@/utils/jwt";
import { logger } from "@/utils/logger";
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
      await generateToken(user.id, user.role);

    // Save refresh token in DB
    await AuthRepository.createRefreshToken(user.id, refreshTokenExp, jti);

    // Return result to handler
    const { password: pass, ...safeUser } = user;
    return {
      user: safeUser,
      tokens: { accessToken, refreshToken },
    };
  },

  async logout(refreshToken: string) {
    const payload = await verifyToken(
      refreshToken,
      envConfig.JWT_REFRESH_SECRET!
    );

    if (payload.type !== "refresh") {
      throw new AppError(HttpStatusCodes.UNAUTHORIZED, "Invalid token type");
    }

    await AuthRepository.deleteRefreshToken(payload.jti!);
    logger.info("deleted refresh token")

  },

  async logout_all(refreshToken: string) {
    const payload = await verifyToken(
      refreshToken,
      envConfig.JWT_REFRESH_SECRET!
    );

    if (payload.type !== "refresh") {
      throw new AppError(HttpStatusCodes.UNAUTHORIZED, "Invalid token type");
    }

    await AuthRepository.deleteRefreshTokenById(payload.sub!);
    logger.info("deleted refresh token")

  },

  async refresh(refreshToken: string) {
    // finds jti in the refreshToken db

    const payload = await verifyToken(
      refreshToken,
      envConfig.JWT_REFRESH_SECRET!
    );

    console.log(payload, "payload123");

    const tokenRecord = await AuthRepository.findRefreshToken(payload.jti!);
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
    } = await generateToken(tokenRecord.userId, payload.role);

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
