import { randomUUID } from "crypto";
import { sign, verify } from "hono/jwt";
import type { CookieOptions } from "hono/utils/cookie";
import type { JWTPayload } from "hono/utils/jwt/types";

export interface DefineJWT extends JWTPayload {
  sub: string; // subject = userId
  role?: string; // optional custom claim
  type: "access" | "refresh";
  jti?: string;
}

const ISSUER = "bun-hono-name";
const AUDIENCE = "bun-hono-users";

export const generateToken = async (userId: string) => {
  const access_token_secret = process.env.JWT_ACCESS_TOKEN;
  const refresh_token_secret = process.env.JWT_REFRESH_TOKEN;

  if (!access_token_secret || !refresh_token_secret) {
    throw new Error("JWT secrets are not set in environment variables");
  }

  const now = Math.floor(Date.now() / 1000);
  const accessExp = now + 60 * 5; // 5 mins
  const refreshExp = now + 60 * 60 * 24; // 1 day

  const accessPayload: DefineJWT = {
    sub: userId,
    iat: now,
    exp: accessExp,
    type: "access",
    iss: ISSUER,
    aud: AUDIENCE,
  }; // 5 mins
  const refreshPayload: DefineJWT = {
    sub: userId,
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
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax", // or Strict
  path: "/",
  maxAge: 300, // 5 mins
} as CookieOptions;

export const refreshTokenCookie = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax", // or Strict
  path: "/",
  maxAge: 60 * 60 * 24, // 1 day
} as CookieOptions;

export const verifyToken = async (token: string, secret: string) => {
  return (await verify(token, secret)) as DefineJWT;
};
