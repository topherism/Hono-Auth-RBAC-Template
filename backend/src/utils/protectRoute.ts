// src/utils/protect-route.ts
import { Context } from "hono";
import { authenticationMiddleware } from "@/middlewares/authentication.middleware";
import { authorizeMiddleware } from "@/middlewares/authorization.middleware";

export const protectRoute =
  (...allowed: string[]) =>
  <T extends (c: Context) => Promise<any>>(handler: T) =>
  async (c: Parameters<T>[0]) => {
    // Run authentication
    await authenticationMiddleware(c, async () => {});

    // Run authorization with roles/permissions
    await authorizeMiddleware(...allowed)(c, async () => {});

    // Call the actual route handler
    return handler(c);
  };
