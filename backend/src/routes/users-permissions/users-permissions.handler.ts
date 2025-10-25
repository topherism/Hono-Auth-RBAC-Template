// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  GrantUserPermissionsRoute,
  DenyUserPermissionsRoute,
} from "./users-permissions.routes";
import { logger } from "@/utils/logger";
import { AppError } from "@/lib/errors";
import { UserPermissionsService } from "@/services/user-permission.service";

export const grantUserPermissions: AppRouteHandler<
  GrantUserPermissionsRoute
> = async (c) => {
  const { id } = c.req.valid("param");
  const { permissions } = c.req.valid("json");

  const updatedUserRolePermissions =
    await UserPermissionsService.grantUserPermissions(id, permissions);

  logger.info(
    `Granted permissions to user ID '${id}:' ${permissions.join(", ")}`
  );

  return c.json(updatedUserRolePermissions, HttpStatusCodes.OK);
};

export const denyUserPermissions: AppRouteHandler<
  DenyUserPermissionsRoute
> = async (c) => {
  const { id } = c.req.valid("param");
  const { permissions } = c.req.valid("json");

  const updatedUserPermissions =
    await UserPermissionsService.denyUserPermissions(id, permissions);

  logger.info(
    `Denied permissions to user ID '${id}:' ${permissions.join(", ")}`
  );

  return c.json(updatedUserPermissions, HttpStatusCodes.OK);
};
