// src/routes/users/users-permissions.index.ts

import { createRouter } from "@/lib/create-app";

import * as handlers from "./users-permissions.handler";
import * as routes from "./users-permissions.routes";
import { authenticationMiddleware } from "@/middlewares/authentication.middleware";
import { authorizeMiddleware } from "@/middlewares/authorization.middleware";
import { ROLES } from "@/constants/roles";
import { PERMISSIONS } from "@/constants/permissions";
import { userRateLimiter } from "@/middlewares/rate-limit.middleware";

const router = createRouter();

//applied authentication middleware and rate limiter
router.use("/users/permissions/*", authenticationMiddleware, userRateLimiter);

router.use(
  routes.grantUserPermissions.path,
  authorizeMiddleware(
    ROLES.SUPERADMIN,
    ROLES.ADMIN,
    PERMISSIONS.GRANT_USER_PERMISSIONS
  )
);
router.openapi(routes.grantUserPermissions, handlers.grantUserPermissions);

router.use(
  routes.denyUserPermissions.path,
  authorizeMiddleware(
    ROLES.SUPERADMIN,
    ROLES.ADMIN,
    PERMISSIONS.DENY_USER_PERMISSIONS
  )
);
router.openapi(routes.denyUserPermissions, handlers.denyUserPermissions);

export default router;
