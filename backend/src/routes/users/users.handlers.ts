// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  CreateUserRoute,
  GetAllUserRoute,
  GetOneUserRoute,
  PatchRoute,
} from "./users.routes";
import { UserService } from "@/services/user.service";

export const createUser: AppRouteHandler<CreateUserRoute> = async (c) => {
  const input = c.req.valid("json");
  const user = await UserService.createUser(input);
  return c.json(user, HttpStatusCodes.CREATED);
};
export const getAllUsers: AppRouteHandler<GetAllUserRoute> = async (c) => {
  const users = await UserService.getAllUsers();
  return c.json(users, HttpStatusCodes.OK);
};

export const getOneUser: AppRouteHandler<GetOneUserRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const user = await UserService.getOneUser(id);

  return c.json(user, HttpStatusCodes.OK);
};

export const patchUser: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

  const patchedUser = await UserService.patchUser(id, updates);

  return c.json(patchedUser, HttpStatusCodes.OK);
};
