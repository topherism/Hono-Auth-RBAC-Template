// src/routes/tasks/

import { createRouter } from "@/lib/create-app";

import * as handlers from "./auth.handlers";
import * as routes from "./auth.routes";
import { ipRateLimiter, tokenRateLimiter } from "@/middlewares/rate-limit.middleware";

const router = createRouter();

//middleware 
router.use(routes.login.path, ipRateLimiter);
router.use(routes.refresh.path, tokenRateLimiter);

router.openapi(routes.login, handlers.login);
router.openapi(routes.refresh, handlers.refresh);
router.openapi(routes.logout, handlers.logout);
router.openapi(routes.logout_all, handlers.logout_all);

export default router;
