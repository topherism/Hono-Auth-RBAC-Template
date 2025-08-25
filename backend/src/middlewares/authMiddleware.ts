import { verifyToken } from "@/utils/jwt";
import { envConfig } from "../env";
import { ERROR_MESSAGES } from "../constants/errors";
import  { sendError } from "../utils/response";
import type { Context, Next } from "hono";

export async function authMiddleware(c: Context, next: Next) {
  try {
    const authHeader = c.req.header("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(c, ERROR_MESSAGES.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1] || "";
    const payload = await verifyToken(token, envConfig.JWT_ACCESS_SECRET);

    if (!payload) {
      return sendError(c, ERROR_MESSAGES.UNAUTHORIZED);
    }

    // store JWT payload in context for downstream usage
    c.set("jwtPayload", payload);

    await next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    return sendError(c, ERROR_MESSAGES.UNAUTHORIZED);
  }
}
