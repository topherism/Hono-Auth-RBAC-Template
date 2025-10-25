// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { PatchUserRoleRoute } from "./users-role.routes";
import { logger } from "@/utils/logger";
import { UserRoleService } from "@/services/user-role.service";

export const patchUserRole: AppRouteHandler<PatchUserRoleRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const { role } = c.req.valid("json");

  const updatedUserPermissions = await UserRoleService.patchUserRole(id, role);

  logger.info(`Updated role for user with ID '${id}' to '${role}'`);

  return c.json(updatedUserPermissions, HttpStatusCodes.OK);
};
