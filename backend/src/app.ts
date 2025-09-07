import configureOpenAPI from "./lib/configure-openapi";
import createApp from "./lib/create-app";
// import index from "@/routes/index.route";
import auth from "@/routes/auth/auth.index";
import users from "@/routes/users/users.index";

const app = createApp();


const routes = [auth, users];

configureOpenAPI(app);
routes.forEach((route) => {
  app.route("/api", route);
});

export default app;
