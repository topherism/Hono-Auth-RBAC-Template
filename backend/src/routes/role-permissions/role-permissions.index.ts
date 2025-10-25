// src/routes/users/users.index.ts

import { createRouter } from "@/lib/create-app";

import * as handlers from "./role-permissions.handler";
import * as routes from "./role-permissions.routes";
import { authenticationMiddleware } from "@/middlewares/authentication.middleware";
import { authorizeMiddleware } from "@/middlewares/authorization.middleware";
import { ROLES } from "@/constants/roles";
import { PERMISSIONS } from "@/constants/permissions";
import { userRateLimiter } from "@/middlewares/rate-limit.middleware";

const router = createRouter();
// Public route
router.use("/role-permissions/*", authenticationMiddleware, userRateLimiter);

router.use(
  routes.getAllRolePermission.path,
  authorizeMiddleware(ROLES.SUPERADMIN, ROLES.ADMIN)
);
router.openapi(routes.getAllRolePermission, handlers.getAllRolePermissions);

router.openapi(routes.patchRolePermission, handlers.patchRolePermission);

export default router;
