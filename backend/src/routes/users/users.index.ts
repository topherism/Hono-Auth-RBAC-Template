// src/routes/users/users.index.ts

import { createRouter } from "@/lib/create-app";

import * as handlers from "./users.handlers";
import * as routes from "./users.routes";

const router = createRouter()
.openapi(routes.createUser, handlers.createUser)
// .openapi(routes.getAllUser, handlers.getAllUser);
//   .openapi(routes.register, handlers.register)
//   .openapi(routes.create, handlers.create)
//   .openapi(routes.getOneList, handlers.getOneList)
//   .openapi(routes.patch, handlers.patch)
//   .openapi(routes.remove, handlers.remove);

export default router;
