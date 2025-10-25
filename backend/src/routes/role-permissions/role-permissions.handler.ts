// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  GetAllRolePermissionRoute,
  PatchRolePermissionRoute,
} from "./role-permissions.routes";
import { RolePermissionsService } from "@/services/role-permission.service";
import { logger } from "@/utils/logger";
import { AppError } from "@/lib/errors";

export const getAllRolePermissions: AppRouteHandler<
  GetAllRolePermissionRoute
> = async (c) => {
  const role_permissions = await RolePermissionsService.getAllRolePermissions();
  logger.info("fetched all role-permissions");

  return c.json(role_permissions, HttpStatusCodes.OK);
};

export const patchRolePermission: AppRouteHandler<
  PatchRolePermissionRoute
> = async (c) => {
  const { role, add, remove } = c.req.valid("json");

  let updatedRolePermissions;

  if (add && add.length > 0) {
    updatedRolePermissions =
      await RolePermissionsService.assignPermissionToRole(role, add);
    logger.info(`Assigned permissions to role '${role}': ${add.join(", ")}`);
  }

  // 🔴 Handle removing permissions
  if (remove && remove.length > 0) {
    updatedRolePermissions =
      await RolePermissionsService.unassignPermissionToRole(role, remove);
    logger.info(
      `Removed permissions from role '${role}': ${remove.join(", ")}`
    );
  }

  if ((!add || add.length === 0) && (!remove || remove.length === 0)) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "You must provide at least one permission to add or remove."
    );
  }

  return c.json(updatedRolePermissions, HttpStatusCodes.OK);
};
