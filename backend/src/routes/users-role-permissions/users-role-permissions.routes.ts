import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { UserRolePermissionsListResponseSchema } from "@/schemas/user-role-permissions";

const tags = ["User-Role-Permissions"];

export const getAllUserRolePermissions = createRoute({
  path: "/users/role-permissions",
  method: "get",
  tags,
  summary: "Get all users-role-permissions",
  description: `
    This endpoint retrieves all users along with their assigned role and permissions
  `,
  operationId: "getAllUserRolePermissions",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      UserRolePermissionsListResponseSchema,
      "Fetched all users with their assigned role and permissions"
    ),
  },
});

// Export route types for handlers
export type GetAllUserRolePermissionsRoute = typeof getAllUserRolePermissions;
