// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { CreateUserRoute, GetAllUserRoute } from "./users.routes";
import { UserService } from "@/services/user.service";

export const createUser: AppRouteHandler<CreateUserRoute> = async (c) => {
  const input = c.req.valid("json");
  const user = await UserService.createUser(input);
  return c.json(user, HttpStatusCodes.CREATED);
};

// export const getAllUsers: AppRouteHandler<GetAllUserRoute> = async (c) => {
//   try {

//     // return c.json(user, HttpStatusCodes.CREATED);
//   } catch (err: any) {

//     return c.json(
//       { message: err.message ?? HttpStatusPhrases.INTERNAL_SERVER_ERROR },
//       HttpStatusCodes.INTERNAL_SERVER_ERROR
//     );
//   }
// }

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
