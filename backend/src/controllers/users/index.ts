import {
  createUserData,
  deleteUserData,
  getUserData,
  getUsersData,
  updateUserData,
} from "@/data/user";
import { NotFoundError } from "@/utils/errors";
import { Hono, type Context } from "hono";
import { StatusCodes } from "http-status-codes";

export function getUsersController(c: Context) {
  const users = getUsersData();

  return c.json(users, StatusCodes.OK);
}

export function getUserController(c: Context) {
  const { id } = c.req.param();

  const user = getUserData(Number(id));

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return c.json(user, StatusCodes.OK);
}

export async function createUserController(c: Context) {
  const body = await c.req.json();

  const user = createUserData(body);

  return c.json(user, StatusCodes.CREATED);
}

export function deleteUserController(c: Context) {
  const { id } = c.req.param();

  const deletedUser = deleteUserData(Number(id));

  return c.json(deletedUser, StatusCodes.OK);
}

export async function updateUserController(c: Context) {
  const { id } = c.req.param();
  const body = await c.req.json();

  const updatedUser = updateUserData(Number(id), body);

  return c.json(updatedUser, StatusCodes.OK);
}
