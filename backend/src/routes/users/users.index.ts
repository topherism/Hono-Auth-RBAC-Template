// src/routes/users/users.index.ts

import { createRouter } from "@/lib/create-app";

import * as handlers from "./users.handlers";
import * as routes from "./users.routes";
import { authenticationMiddleware } from "@/middlewares/authentication.middleware";
import { authorizeMiddleware } from "@/middlewares/authorization.middleware";
import { ROLES } from "@/constants/roles";
import { PERMISSIONS } from "@/constants/permissions";

const router = createRouter();
// Public route

// Protected route → requires valid JWT
router.use(
  routes.getAllUser.path,
  authenticationMiddleware,
  authorizeMiddleware(ROLES.SUPERADMIN, ROLES.ADMIN)
);
router.openapi(routes.getAllUser, handlers.getAllUsers);
router.openapi(routes.createUser, handlers.createUser);
router.openapi(routes.getOneUser, handlers.getOneUser);
router.openapi(routes.patchUser, handlers.patchUser);

// Protected + role-based
// router.use("/users/:id", authorizeMiddleware(ROLES.ADMIN));
// router.openapi(routes.getOneUser, handlers.getOneUser);

//   .openapi(routes.register, handlers.register)
//   .openapi(routes.create, handlers.create)
//   .openapi(routes.getOneList, handlers.getOneList)
//   .openapi(routes.patch, handlers.patch)
//   .openapi(routes.remove, handlers.remove);

export default router;
