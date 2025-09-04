// src/routes/tasks/

import { createRouter } from "@/lib/create-app";

import * as handlers from "./auth.handlers";
import * as routes from "./auth.routes";

const router = createRouter()
  .openapi(routes.login, handlers.login)
  .openapi(routes.register, handlers.register)
//   .openapi(routes.create, handlers.create)
//   .openapi(routes.getOneList, handlers.getOneList)
//   .openapi(routes.patch, handlers.patch)
//   .openapi(routes.remove, handlers.remove);

export default router;
