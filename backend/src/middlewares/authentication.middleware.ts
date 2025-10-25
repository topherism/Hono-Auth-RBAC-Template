// src/middleware/authentication.middleware.ts

import { MiddlewareHandler } from "hono";
import { verifyToken } from "@/utils/jwt";
import { AppError } from "@/lib/errors";
import * as HttpStatusCodes from "stoker/http-status-codes";
import envConfig from "@/env";

export const authenticationMiddleware: MiddlewareHandler = async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(HttpStatusCodes.UNAUTHORIZED, "Missing access token");
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT
    const payload = await verifyToken(token, envConfig.JWT_ACCESS_SECRET!);

    if (payload.type !== "access") {
      throw new AppError(HttpStatusCodes.UNAUTHORIZED, "Invalid token type");
    }

    // Attach user info to context for downstream handlers
    c.set("user", { id: payload.sub, role: payload.role });

    console.log(payload);

    return next();
  } catch (err: any) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      err.message || "Unauthorized"
    );
  }
};