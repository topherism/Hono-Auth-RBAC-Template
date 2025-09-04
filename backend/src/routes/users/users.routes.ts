import { RegisterSchema } from "@/schemas/auth.schema";
import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema, IdUUIDParamsSchema } from "stoker/openapi/schemas";

const tags = ["Users"];

export const getAllUser = createRoute({
  path: "/users",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(RegisterSchema,"Fetched all users"),
    [HttpStatusCodes.UNAUTHORIZED]: {
      description: "Invalid credentials",
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: {
      description: "Validation error",
    },
  },
});

// export const getOneList = createRoute({
//   path: "/users/{id}",
//   method: "get",
//   tags,
//   request: {
//     params: IdUUIDParamsSchema,
//   },
//   responses: {
//     [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, "The requested user"),
//     [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task Not Found"),
//     [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
//       createErrorSchema(IdUUIDParamsSchema),
//       "Invalid Id Error"
//     ),
//   },
// });

// Export route types for handlers
export type UserRoute = typeof getAllUser;