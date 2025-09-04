// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { LoginRoute, RegisterRoute } from "./auth.routes";

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const { emailOrUsername, password } = c.req.valid("json");
  //   const task =

  return c.json(HttpStatusCodes.OK);
};

export const register: AppRouteHandler<RegisterRoute> = async (c) => {
  const { email, username, password } = c.req.valid("json");
  //   const task =

  return c.json(HttpStatusCodes.CREATED);
};


// export const patch: AppRouteHandler<PatchRoute> = async (c) => {
//   const { id } = c.req.valid("param");
//   const updates = c.req.valid("json");
//   const [task] = await db
//     .update(tasks)
//     .set(updates)
//     .where(eq(tasks.id, id))
//     .returning();

//   if (!task) {
//     return c.json(
//       {
//         message: HttpStatusPhrases.NOT_FOUND,
//       },
//       HttpStatusCodes.NOT_FOUND
//     );
//   }
//   return c.json(task, HttpStatusCodes.OK);
// };
