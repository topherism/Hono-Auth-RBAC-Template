//repository

import { prisma } from "@/lib/prisma";

export const TaskRepository = {
  findAll: () => prisma.task.findMany(),
  findById: (id: number) => prisma.task.findUnique({ where: { id } }),
  create: (data: { title: string }) => prisma.task.create({ data }),
  update: (id: number, data: Partial<{ title: string; completed: boolean }>) =>
    prisma.task.update({ where: { id }, data }),
  remove: (id: number) => prisma.task.delete({ where: { id } }),
};

//handlers
import { AppRouteHandler } from "@/lib/types";
import { TaskRepository } from "@/repositories/task.repo";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import {
  CreateRoute,
  GetOneListRoute,
  ListRoute,
  PatchRoute,
  RemoveRoute,
} from "./tasks.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await TaskRepository.findAll();
  return c.json(tasks, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const data = c.req.valid("json");
  const task = await TaskRepository.create(data);
  return c.json(task, HttpStatusCodes.CREATED);
};

export const getOneList: AppRouteHandler<GetOneListRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const task = await TaskRepository.findById(Number(id));

  if (!task) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(task, HttpStatusCodes.OK);
};
