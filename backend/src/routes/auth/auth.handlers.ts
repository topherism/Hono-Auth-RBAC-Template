// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { LoginRoute } from "./auth.routes";
import { AuthService } from "@/services/auth.service";
import { refreshTokenCookie } from "@/utils/jwt";

import { setCookie } from "hono/cookie";

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const { emailOrUsername, password } = c.req.valid("json");
  const result = await AuthService.login(emailOrUsername, password);

  setCookie(
    c,
    "auth_refresh_token",
    result.tokens.refreshToken,
    refreshTokenCookie
  );

  return c.json(result, HttpStatusCodes.OK);
};

// export const refresh: AppRouteHandler<any> = async (c) => {
//   // Get refresh token from cookie
//   const refreshToken = c.req.cookie("auth_refresh_token");
//   if (!refreshToken) {
//     return c.json({ message: "No refresh token" }, HttpStatusCodes.UNAUTHORIZED);
//   }

//   // Find token in DB
//   const tokenRecord = await AuthRepository.findRefreshToken(refreshToken);
//   if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
//     return c.json({ message: "Invalid or expired refresh token" }, HttpStatusCodes.UNAUTHORIZED);
//   }

//   // Generate new access token (and optionally new refresh token)
//   const { accessToken, refreshToken: newRefreshToken, jti, refreshTokenExp } = 
//     await generateToken(tokenRecord.userId);

//   // Save new refresh token and delete old one
//   await AuthRepository.deleteRefreshToken(refreshToken);
//   await AuthRepository.createRefreshToken(tokenRecord.userId, refreshTokenExp, jti);

//   // Set new refresh token in cookie
//   setCookie(c, "auth_refresh_token", newRefreshToken, refreshTokenCookie);

//   // Return new access token
//   return c.json({ accessToken: accessToken }, HttpStatusCodes.OK);
// };