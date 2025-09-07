// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  CreateUserRoute,
  GetAllUserRoute,
  GetOneUserRoute,
} from "./users.routes";
import { UserService } from "@/services/user.service";

export const createUser: AppRouteHandler<CreateUserRoute> = async (c) => {
  const input = c.req.valid("json");
  const user = await UserService.createUser(input);
  return c.json(user, HttpStatusCodes.CREATED);
};
export const getAllUsers: AppRouteHandler<GetAllUserRoute> = async (c) => {
  const users = await UserService.getAllUsersWithInfo();
  return c.json(users, HttpStatusCodes.OK);
};

export const getOneUser: AppRouteHandler<GetOneUserRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const user = await UserService.getOneUser(id);

  return c.json(user, HttpStatusCodes.OK);
};

// export const patchUser: AppRouteHandler<PatchRoute> = async (c) => {
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
