// src/routes/users/users-role.index.ts

import { createRouter } from "@/lib/create-app";

import * as handlers from "./users-role.handler";
import * as routes from "./users-role.routes";
import { authenticationMiddleware } from "@/middlewares/authentication.middleware";
import { authorizeMiddleware } from "@/middlewares/authorization.middleware";
import { ROLES } from "@/constants/roles";
import { PERMISSIONS } from "@/constants/permissions";
import { userRateLimiter } from "@/middlewares/rate-limit.middleware";

const router = createRouter();

//applied authentication middleware and rate limiter
router.use("/users/role/*", authenticationMiddleware, userRateLimiter);

router.use(
  routes.patchUserRole.path,
  authorizeMiddleware(
    ROLES.SUPERADMIN,
    ROLES.ADMIN,
    PERMISSIONS.PATCH_USER_ROLE
  )
);
router.openapi(routes.patchUserRole, handlers.patchUserRole);

export default router;
