import { OpenAPIHono } from "@hono/zod-openapi";
import auth from "@/routes/auth/auth.index";
import users from "@/routes/users/users.index";
import role_permissions from "@/routes/role-permission/role-permission.index";

const api = new OpenAPIHono();

api.route("/", auth);
api.route("/", users);
api.route("/", role_permissions);

export default api;

// ✅ Wrap with `T extends infer R ? R : never` to prevent deep type instantiation
export type ApiRouter = typeof api extends infer R ? R : never;
