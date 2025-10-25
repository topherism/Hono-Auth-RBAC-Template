// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { GetAllUserRolePermissionsRoute } from "./users-role-permissions.routes";
import { logger } from "@/utils/logger";
import { UserRolePermissionsService } from "@/services/user-role-permission.service";

export const getAllUserRolePermissions: AppRouteHandler<
  GetAllUserRolePermissionsRoute
> = async (c) => {
  const user_role_permissions =
    await UserRolePermissionsService.getAllUserRolePermissions();
  logger.info("fetched all users with their role and permissions");

  return c.json(
    user_role_permissions,
    HttpStatusCodes.OK
  );
};