// src/routes/users/users.index.ts

import { createRouter } from "@/lib/create-app";

import * as handlers from "./users.handlers";
import * as routes from "./users.routes";
import { authenticationMiddleware } from "@/middlewares/authentication.middleware";
import { authorizeMiddleware } from "@/middlewares/authorization.middleware";
import { ROLES } from "@/constants/roles";
import { PERMISSIONS } from "@/constants/permissions";
import { userRateLimiter } from "@/middlewares/rate-limit.middleware";

const router = createRouter();
// Public route

//applied authentication middleware and rate limiter
router.use("/users/*", authenticationMiddleware, userRateLimiter);

router.use(
  routes.createUser.path,
  authorizeMiddleware(ROLES.SUPERADMIN, ROLES.ADMIN, PERMISSIONS.VIEW_USER)
);
router.openapi(routes.getAllUser, handlers.getAllUsers);

router.use(
  routes.createUser.path,
  authorizeMiddleware(ROLES.SUPERADMIN, ROLES.ADMIN, PERMISSIONS.CREATE_USER)
);
router.openapi(routes.createUser, handlers.createUser);

router.use(
  routes.patchUser.path,
  authorizeMiddleware(ROLES.SUPERADMIN, ROLES.ADMIN, PERMISSIONS.PATCH_USER)
);
router.openapi(routes.patchUser, handlers.patchUser);

router.use(
  routes.getOneUser.path,
  authorizeMiddleware(ROLES.SUPERADMIN, ROLES.ADMIN, PERMISSIONS.VIEW_ONE_USER)
);
router.openapi(routes.getOneUser, handlers.getOneUser);

export default router;
