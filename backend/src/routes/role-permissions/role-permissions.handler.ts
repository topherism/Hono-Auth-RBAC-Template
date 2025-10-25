// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  DenyRolePermissionRoute,
  GetAllRolePermissionRoute,
  GrantRolePermissionRoute,
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

export const grantRolePermission: AppRouteHandler<
  GrantRolePermissionRoute
> = async (c) => {
  const { role, permissions } = c.req.valid("json");

  if (!permissions || permissions.length === 0) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "You must provide at least one permission to add."
    );
  }

  const updatedRolePermissions =
    await RolePermissionsService.assignPermissionToRole(role, permissions);
  logger.info(
    `Assigned permissions to role '${role}': ${permissions.join(", ")}`
  );

  return c.json(updatedRolePermissions, HttpStatusCodes.OK);
};

export const denyRolePermission: AppRouteHandler<
  DenyRolePermissionRoute
> = async (c) => {
  const { role, permissions } = c.req.valid("json");

  if (!permissions || permissions.length === 0) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "You must provide at least one permission to remove."
    );
  }
  // 🔴 Handle removing permissions
  const updatedRolePermissions =
    await RolePermissionsService.unassignPermissionToRole(role, permissions);
  logger.info(
    `Removed permissions from role '${role}': ${permissions.join(", ")}`
  );

  return c.json(updatedRolePermissions, HttpStatusCodes.OK);
};
