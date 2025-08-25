import {
  createUserData,
  deleteUserData,
  getUserData,
  getUsersData,
  updateUserData,
} from "@/data/user";
import {
  ERROR_MESSAGES,
  sendError,
  sendSuccess,
  SUCCESS_MESSAGES,
} from "@/utils/response";
import { Hono, type Context } from "hono";

export function getUsersController(c: Context) {
  const users = getUsersData();

  return sendSuccess(c, SUCCESS_MESSAGES.RESOURCE_FETCHED, users);
}
export function getUserController(c: Context) {
  const { id } = c.req.param();

  const user = getUserData(Number(id));

  if (!user) {
    return sendError(c, ERROR_MESSAGES.USER_NOT_FOUND);
  }

  return sendSuccess(c, SUCCESS_MESSAGES.RESOURCE_FETCHED, user);
}

export async function createUserController(c: Context) {
  const body = await c.req.json();

  const user = createUserData(body);

  return sendSuccess(c, SUCCESS_MESSAGES.RESOURCE_CREATED, user);
}

export function deleteUserController(c: Context) {
  const { id } = c.req.param();

  const deletedUser = deleteUserData(Number(id));

  return sendSuccess(c, SUCCESS_MESSAGES.RESOURCE_DELETED, deletedUser);
}

export async function updateUserController(c: Context) {
  const { id } = c.req.param();
  const body = await c.req.json();

  const updatedUser = updateUserData(Number(id), body);

  return sendSuccess(c, SUCCESS_MESSAGES.RESOURCE_UPDATED, updatedUser);
}
