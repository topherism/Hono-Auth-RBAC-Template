// src/routes/users/users.index.ts

import { createRouter } from "@/lib/create-app";

import * as handlers from "./role-permissions.handler";
import * as routes from "./role-permissions.routes";
import { authenticationMiddleware } from "@/middlewares/authentication.middleware";
import { authorizeMiddleware } from "@/middlewares/authorization.middleware";
import { ROLES } from "@/constants/roles";
import { PERMISSIONS } from "@/constants/permissions";
import { userRateLimiter } from "@/middlewares/rate-limit.middleware";
import { Hono } from "hono";
import { AppBindings } from "@/lib/types";

const router = createRouter()
  .openapi(routes.grantRolePermission, handlers.grantRolePermission)
  .openapi(routes.denyRolePermission, handlers.denyRolePermission)
  .openapi(routes.getAllRolePermission, handlers.getAllRolePermissions);

// router
//   .use("/role-permissions/*", authenticationMiddleware, userRateLimiter)
//   .use(
//     routes.getAllRolePermission.path,
//     authorizeMiddleware(
//       ROLES.SUPERADMIN,
//       ROLES.ADMIN,
//       PERMISSIONS.VIEW_ROLE_PERMISSIONS
//     )
//   )
//   .use(
//     routes.grantRolePermission.path,
//     authorizeMiddleware(
//       ROLES.SUPERADMIN,
//       ROLES.ADMIN,
//       PERMISSIONS.PATCH_ROLE_PERMISSIONS
//     )
//   )
//   .use(
//     routes.denyRolePermission.path,
//     authorizeMiddleware(
//       ROLES.SUPERADMIN,
//       ROLES.ADMIN,
//       PERMISSIONS.PATCH_ROLE_PERMISSIONS
//     )
//   )

export default router;
