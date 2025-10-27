import { Role } from "@/constants/roles";
import envConfig from "@/env";
import { AppError } from "@/lib/errors";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { randomUUID } from "crypto";
import { sign, verify } from "hono/jwt";
import type { CookieOptions } from "hono/utils/cookie";
import type { JWTPayload } from "hono/utils/jwt/types";
import { UserRepository } from "@/repositories/user.repository";

export interface DefineJWT extends JWTPayload {
  sub: string; // subject = userId
  role: Role; // optional custom claim
  tokenVersion: number;
  type: "access" | "refresh";
  jti?: string;
}

const ISSUER = "node-hono-name";
const AUDIENCE = "node-hono-users";

export const generateToken = async (
  userId: string,
  role: Role,
  tokenVersion: number
) => {
  const access_token_secret = envConfig.JWT_ACCESS_SECRET;
  const refresh_token_secret = envConfig.JWT_REFRESH_SECRET;

  if (!access_token_secret || !refresh_token_secret) {
    throw new AppError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "JWT secrets are not set in environment variables"
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const accessExp = now + 60 * 5; // 5 mins
  const refreshExp = now + 60 * 60 * 24; // 1 day

  const accessPayload: DefineJWT = {
    sub: userId,
    tokenVersion,
    role,
    iat: now,
    exp: accessExp,
    type: "access",
    iss: ISSUER,
    aud: AUDIENCE,
  }; // 5 mins
  const refreshPayload: DefineJWT = {
    sub: userId,
    tokenVersion,
    role,
    iat: now,
    exp: refreshExp,
    type: "refresh", // 1 day
    iss: ISSUER,
    aud: AUDIENCE,
    jti: randomUUID(), // unique identifier for the token
  };

  const accessToken = await sign(accessPayload, access_token_secret!);
  const refreshToken = await sign(refreshPayload, refresh_token_secret!);

  return {
    accessToken,
    refreshToken,
    jti: refreshPayload.jti!,
    refreshTokenExp: new Date(refreshExp * 1000),
  };
};

export const accessTokenCookie = {
  httpOnly: true,
  secure: envConfig.NODE_ENV === "production",
  sameSite: "lax", // or Strict
  path: "/",
  maxAge: 300, // 5 mins
} as CookieOptions;

export const refreshTokenCookie = {
  httpOnly: true,
  secure: envConfig.NODE_ENV === "production",
  sameSite: "lax", // or Strict
  path: "/",
  maxAge: 60 * 60 * 24, // 1 day
} as CookieOptions;

export const verifyToken = async (token: string, secret: string) => {
  const payload = (await verify(token, secret)) as DefineJWT;

  const user = await UserRepository.findUserById(payload.sub);
  if (!user) {
    throw new AppError(HttpStatusCodes.UNAUTHORIZED, "User no longer exists");
  }

  if (!user || user.tokenVersion !== payload.tokenVersion) {
    throw new AppError(HttpStatusCodes.UNAUTHORIZED, "Token revoked");
  }

  // Validate issuer
  if (payload.iss !== ISSUER) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      `Invalid issuer: expected ${ISSUER}, got ${payload.iss}`
    );
  }

  // Validate audience
  if (payload.aud !== AUDIENCE) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      `Invalid audience: expected ${AUDIENCE}, got ${payload.aud}`
    );
  }

  return payload;
};
