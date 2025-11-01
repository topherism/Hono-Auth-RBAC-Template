// src/routes/users/users.index.ts

import { createRouter } from "@/lib/create-app";

import * as handlers from "./role-permissions.handler";
import * as routes from "./role-permissions.routes";
import { authenticationMiddleware } from "@/middlewares/authentication.middleware";
import { authorizeMiddleware } from "@/middlewares/authorization.middleware";
import { ROLES } from "@/constants/roles";
import { PERMISSIONS } from "@/constants/permissions";
import { userRateLimiter } from "@/middlewares/rate-limit.middleware";
import { wrapWithMiddlewares } from "@/lib/wrapWithMiddleware";

const router = createRouter()
  .openapi(
    routes.getAllRolePermission,
    wrapWithMiddlewares(
      handlers.getAllRolePermissions,
      authenticationMiddleware,
      // userRateLimiter,
      authorizeMiddleware(
        ROLES.SUPERADMIN,
        ROLES.ADMIN,
        PERMISSIONS.VIEW_ROLE_PERMISSIONS
      )
    )
  )
  .openapi(
    routes.grantRolePermission,
    wrapWithMiddlewares(
      handlers.grantRolePermission,
      authenticationMiddleware,
      // userRateLimiter,
      authorizeMiddleware(
        ROLES.SUPERADMIN,
        ROLES.ADMIN,
        PERMISSIONS.PATCH_ROLE_PERMISSIONS
      )
    )
  )
  .openapi(routes.denyRolePermission, handlers.denyRolePermission);

export default router;
