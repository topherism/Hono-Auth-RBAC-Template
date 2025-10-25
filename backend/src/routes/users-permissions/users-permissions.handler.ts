// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  GrantUserPermissionsRoute,
  DenyUserPermissionsRoute,
} from "./users-permissions.routes";
import { logger } from "@/utils/logger";
import { UserPermissionsService } from "@/services/user-permission.service";
import { UserRepository } from "@/repositories/user.repository";

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

  // force logout by incrementing token version
  await UserRepository.incrementTokenVersion(id);
  // user permissions has been updated, so user has been forced to logout
  logger.info(
    `Incremented token version for user with ID '${id} to force logout'`
  );

  logger.info(
    `Denied permissions to user ID '${id}:' ${permissions.join(", ")}`
  );

  return c.json(updatedUserPermissions, HttpStatusCodes.OK);
};
