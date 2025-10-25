// src/routes/auth/auth.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";

import {
  LoginRoute,
  LogoutAllRoute,
  LogoutRoute,
  RefreshRoute,
} from "./auth.routes";
import { AuthService } from "@/services/auth.service";
import { refreshTokenCookie } from "@/utils/jwt";

import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { AppError } from "@/lib/errors";

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const { emailOrUsername, password } = c.req.valid("json");
  const result = await AuthService.login(emailOrUsername, password);

  setCookie(
    c,
    "auth_refresh_token",
    result.tokens.refreshToken,
    refreshTokenCookie
  );

  return c.json(
    { user: result.user, accessToken: result.tokens.accessToken },
    HttpStatusCodes.OK
  );
};

export const logout: AppRouteHandler<LogoutRoute> = async (c) => {
  const refreshToken = getCookie(c, "auth_refresh_token");

  if (refreshToken) {
    try {
      await AuthService.logout(refreshToken);
    } catch (err) {
      console.log("Failed to revoke refresh token:", err);
      // Still continue to clear cookie
    }
  }

  deleteCookie(c, "auth_refresh_token", {
    path: refreshTokenCookie.path,
    secure: refreshTokenCookie.secure,
    sameSite: refreshTokenCookie.sameSite,
  });

  return c.json({ message: "Logged out" }, HttpStatusCodes.OK);
};

export const logout_all: AppRouteHandler<LogoutAllRoute> = async (c) => {
  const refreshToken = getCookie(c, "auth_refresh_token");

  if (refreshToken) {
    try {
      await AuthService.logout_all(refreshToken);
    } catch (err) {
      console.log("Failed to revoke refresh token:", err);
      // Still continue to clear cookie
    }
  }

  deleteCookie(c, "auth_refresh_token", {
    path: refreshTokenCookie.path,
    secure: refreshTokenCookie.secure,
    sameSite: refreshTokenCookie.sameSite,
  });

  return c.json({ message: "Logged out" }, HttpStatusCodes.OK);
};

export const refresh: AppRouteHandler<RefreshRoute> = async (c) => {
  // Get refresh token from cookie
  const refreshToken = getCookie(c, "auth_refresh_token");

  if (!refreshToken) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "Invalid or expired refresh token"
    );
  }

  const tokens = await AuthService.refresh(refreshToken);
  console.log(tokens, "got tokens");

  // Set new refresh token in cookie
  setCookie(c, "auth_refresh_token", tokens.refreshToken, refreshTokenCookie);

  // Return new access token
  return c.json({ accessToken: tokens.accessToken }, HttpStatusCodes.OK);
};
