import configureOpenAPI from "./lib/configure-openapi";
import createApp from "./lib/create-app";
import index from "@/routes/index.route";
import auth from "@/routes/auth/auth.index";
import users from "@/routes/users/users.index";
import role_permissions from "@/routes/role-permissions/role-permissions.index";
import users_permissions from "@/routes/users-permissions/users-permissions.index";
import users_role from "@/routes/users-role/users-role.index";
import users_role_permissions from "@/routes/users-role-permissions/users-role-permissions.index";

const app = createApp();

const routes = [
  auth,
  role_permissions,
  //   users,
  //   users_permissions,
  //   users_role,
  //   users_role_permissions,
] as const;

configureOpenAPI(app);
routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
