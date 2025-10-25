// src/routes/users/users.index.ts

import { createRouter } from "@/lib/create-app";

import * as handlers from "./users-role-permissions.handler";
import * as routes from "./users-role-permissions.routes";
import { authenticationMiddleware } from "@/middlewares/authentication.middleware";
import { authorizeMiddleware } from "@/middlewares/authorization.middleware";
import { ROLES } from "@/constants/roles";
import { PERMISSIONS } from "@/constants/permissions";
import { userRateLimiter } from "@/middlewares/rate-limit.middleware";

const router = createRouter();

//applied authentication middleware and rate limiter
router.use(
  "/users/role-permissions/*",
  authenticationMiddleware,
  userRateLimiter
);

router.use(
  routes.getAllUserRolePermissions.path,
  authorizeMiddleware(
    ROLES.SUPERADMIN,
    ROLES.ADMIN,
    PERMISSIONS.VIEW_USER_ROLE_PERMISSIONS
  )
);
router.openapi(
  routes.getAllUserRolePermissions,
  handlers.getAllUserRolePermissions
);

export default router;
