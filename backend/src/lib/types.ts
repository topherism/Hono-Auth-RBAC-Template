// lib/types.ts

import { PermissionInputList, RoleInput } from "@/schemas/roles-permissions";
import { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    jwtPayload?: any;
    user?: {
      id: string;
      role: RoleInput;
      permissions: PermissionInputList;
    };
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
