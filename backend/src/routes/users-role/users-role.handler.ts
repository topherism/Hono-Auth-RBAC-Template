// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { PatchUserRoleRoute } from "./users-role.routes";
import { logger } from "@/utils/logger";
import { UserRoleService } from "@/services/user-role.service";
import { UserRepository } from "@/repositories/user.repository";

export const patchUserRole: AppRouteHandler<PatchUserRoleRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const { role } = c.req.valid("json");

  const updatedUserRole = await UserRoleService.patchUserRole(id, role);


  // force logout by incrementing token version
  await UserRepository.incrementTokenVersion(id);
  // user permissions has been updated, so user has been forced to logout
  logger.info(
    `Incremented token version for user with ID '${id} to force logout'`
  );

  logger.info(`Updated role for user with ID '${id}' to '${role}'`);

  return c.json(updatedUserRole, HttpStatusCodes.OK);
};
