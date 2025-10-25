// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { RolePermissionsService } from "@/services/role-permission.service";
import { logger } from "@/utils/logger";
import { AppError } from "@/lib/errors";
import { GetAllUserPermissionRoute } from "./user-permission.routes";

export const getAllUserPermissions: AppRouteHandler<
  GetAllUserPermissionRoute
> = async (c) => {
  const user_permissions = await RolePermissionsService.getAllRolePermissions();

  logger.info("fetched all role-permissions");

  return c.json(user_permissions, HttpStatusCodes.OK);
};
