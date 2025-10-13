// src/middlewares/authorization.middleware.ts
import { Context, Next } from "hono";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { AppError } from "@/lib/errors";

type AllowedType = string; // role name or permission name

export const authorizeMiddleware =
  (...allowed: AllowedType[]) =>
  async (c: Context, next: Next) => {
    const user = c.get("user");

    console.log(user);

    if (!user)
      throw new AppError(HttpStatusCodes.UNAUTHORIZED, "Not authenticated");

    const hasRole = allowed.includes(user.role);
    // const hasPermission = user.permissions.some((p: string) =>
    //   allowed.includes(p)
    // );

    if (!hasRole) { //hasPermission
      throw new AppError(HttpStatusCodes.FORBIDDEN, "Access denied");
    }

    await next();
  };
