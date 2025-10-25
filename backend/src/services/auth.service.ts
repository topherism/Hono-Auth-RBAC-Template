import envConfig from "@/env";
import { AppError } from "@/lib/errors";
import { AuthRepository } from "@/repositories/auth.repository";
import { UserPermissionRepository } from "@/repositories/user-permissions.repository";
import { UserRepository } from "@/repositories/user.repository";
import { PermissionInputList } from "@/schemas/roles-permissions";
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
      await generateToken(user.id, user.role, user.tokenVersion);

    // Save refresh token in DB
    await AuthRepository.createRefreshToken(user.id, refreshTokenExp, jti);

    // Return result to handler
    const { password: pass, ...safeUser } = user;

    const effectivePermissions =
      await UserPermissionRepository.getEffectivePermissions(user.id);

    logger.info(
      "Effective permissions for user %s: %o",
      user.id,
      effectivePermissions
    );

    return {
      user: {
        ...safeUser,
        permissions: effectivePermissions as PermissionInputList,
      },
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
    logger.info("deleted refresh token");
  },

  async logout_all(refreshToken: string) {
    const payload = await verifyToken(
      refreshToken,
      envConfig.JWT_REFRESH_SECRET!
    );

    if (payload.type !== "refresh") {
      throw new AppError(HttpStatusCodes.UNAUTHORIZED, "Invalid token type");
    }

    // await AuthRepository.deleteRefreshTokenById(payload.sub!);
    // logger.info("deleted refresh token")

    // 🔥 Increment token version to revoke all existing access tokens
    await UserRepository.incrementTokenVersion(payload.sub!);

    // Delete all refresh tokens in DB
    await AuthRepository.deleteRefreshTokenById(payload.sub!);

    logger.info("Deleted all refresh tokens and incremented token version");
  },

  async refresh(refreshToken: string) {
    // finds jti in the refreshToken db

    const payload = await verifyToken(
      refreshToken,
      envConfig.JWT_REFRESH_SECRET!
    );

    const tokenRecord = await AuthRepository.findRefreshToken(payload.jti!);
    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new AppError(
        HttpStatusCodes.UNAUTHORIZED,
        "Invalid or expired refresh token"
      );
    }

    const user = await UserRepository.findUserWithInfoById(tokenRecord.userId);

    // Generate new access token (and optionally new refresh token)
    const {
      accessToken,
      refreshToken: newRefreshToken,
      jti,
      refreshTokenExp,
    } = await generateToken(tokenRecord.userId, user!.role, user!.tokenVersion);

    // Save new refresh token and delete old one
    await AuthRepository.deleteRefreshToken(payload.jti!);
    await AuthRepository.createRefreshToken(
      tokenRecord.userId,
      refreshTokenExp,
      jti
    );

    return { accessToken, refreshToken: newRefreshToken };
  },
};
