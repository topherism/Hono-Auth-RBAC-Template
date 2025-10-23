// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  AssignPermissionToRoleRoute,
  GetAllRolePermissionRoute,
} from "./role-permission.routes";
import { RolePermissionsService } from "@/services/role-permission.service";
import { logger } from "@/utils/logger";

export const getAllRolePermissions: AppRouteHandler<
  GetAllRolePermissionRoute
> = async (c) => {
  const role_permissions = await RolePermissionsService.getAllRolePermissions();
  logger.info("fetched all role-permissions");

  return c.json(role_permissions, HttpStatusCodes.OK);
};

export const assignPermissionToRole: AppRouteHandler<
  AssignPermissionToRoleRoute
> = async (c) => {
  const { role, add, remove } = c.req.valid("json");


  const role_permissions = await RolePermissionsService.getAllRolePermissions();
  logger.info("fetched all role-permissions");

  // return c.json(role_permissions, HttpStatusCodes.OK);
};
