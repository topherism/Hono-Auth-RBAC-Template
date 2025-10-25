import { notFoundSchema } from "@/lib/constants";
import {
  PatchRolePermissionSchema,
  PermissionInputSchema,
  RoleInputSchema,
  RolePermissionListSchema,
  RolePermissionSchema,
} from "@/schemas/roles-permissions";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  jsonContent,
  jsonContentOneOf,
  jsonContentRequired,
} from "stoker/openapi/helpers";
import {
  createErrorSchema,
  createMessageObjectSchema,
  IdParamsSchema,
  IdUUIDParamsSchema,
} from "stoker/openapi/schemas";

const tags = ["User-Permissions"];

export const getAllUserPermission = createRoute({
  path: "/user-permissions",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      RolePermissionListSchema,
      "Fetched all user with their effective permissions"
    ),
  },
});

export type GetAllUserPermissionRoute = typeof getAllUserPermission;