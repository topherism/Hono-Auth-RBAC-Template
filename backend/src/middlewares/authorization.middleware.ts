// src/middlewares/authorization.middleware.ts
import { Context, Next } from "hono";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { AppError } from "@/lib/errors";
import { logger } from "@/utils/logger";

type AllowedType = string; // role name or permission name

export const authorizeMiddleware =
  (...allowed: AllowedType[]) =>
  async (c: Context, next: Next) => {
    const user = c.get("user");

    if (!user)
      throw new AppError(
        HttpStatusCodes.UNAUTHORIZED,
        "You are not authorized"
      );

    const hasRole = allowed.includes(user.role);
    const hasPermission =
      Array.isArray(user.permissions) &&
      user.permissions.some((p: string) => allowed.includes(p));

    logger.info(
      `Authorization check - User Role: ${
        user.role
      } & User Permissions: [${user.permissions.join(
        ", "
      )}], Has Role: ${hasRole}, Has Permission: ${hasPermission}`,
      user.permissions
    );

    if (!hasRole && !hasPermission) {
      //hasPermission
      throw new AppError(
        HttpStatusCodes.FORBIDDEN,
        "You do not have permission to access this resource"
      );
    }

    await next();
  };
