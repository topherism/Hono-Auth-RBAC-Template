// src/routes/tasks/

import { createRouter } from "@/lib/create-app";

import * as handlers from "./auth.handlers";
import * as routes from "./auth.routes";
import {
  ipRateLimiter,
  tokenRateLimiter,
} from "@/middlewares/rate-limit.middleware";
import { authenticationMiddleware } from "@/middlewares/authentication.middleware";

const router = createRouter();

//middleware
router.use(routes.login.path, ipRateLimiter);
router.openapi(routes.login, handlers.login);

router.use(routes.refresh.path, authenticationMiddleware, tokenRateLimiter);
router.openapi(routes.refresh, handlers.refresh);

router.use("/auth/logout/*", authenticationMiddleware);
router.openapi(routes.logout, handlers.logout);
router.openapi(routes.logout_all, handlers.logout_all);

export default router;
