import { OpenAPIHono } from "@hono/zod-openapi";
import auth from "@/routes/auth/auth.index";
import users from "@/routes/users/users.index";
import role_permissions from "@/routes/role-permissions/role-permissions.index";
import users_permissions from "@/routes/users-permissions/users-permissions.index";
import users_role from "@/routes/users-role/users-role.index";
import users_role_permissions from "@/routes/users-role-permissions/users-role-permissions.index";

const api = new OpenAPIHono()
  .route("/", auth)
  .route("/", role_permissions)
  .route("/", users_permissions)
  .route("/", users_role)
  .route("/", users_role_permissions)
  .route("/", users);

export default api;

// ✅ Wrap with `T extends infer R ? R : never` to prevent deep type instantiation
export type ApiRouter = typeof api extends infer R ? R : never;
