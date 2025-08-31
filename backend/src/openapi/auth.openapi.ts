import { createRoute } from "@hono/zod-openapi";
import { RegisterSchema } from "../schemas/auth.schema";

export const authOpenApiRoutes = [
  createRoute({
    method: "post",
    path: "/api/auth/register",
    tags: ["Auth"],
    description: "Register a new user",
    request: { body: { content: { "application/json": { schema: RegisterSchema } } } },
    responses: {
      200: { description: "User successfully registered" },
      400: { description: "Validation failed" },
    },
  }),
];
