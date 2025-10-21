import { OpenAPIHono } from "@hono/zod-openapi";
import auth from "./auth/auth.index";
import users from "./users/users.index";

const api = new OpenAPIHono();

api.route("/", auth);
api.route("/", users);

export default api;

// ✅ Wrap with `T extends infer R ? R : never` to prevent deep type instantiation
export type ApiRouter = typeof api extends infer R ? R : never;
