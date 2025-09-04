import configureOpenAPI from "./lib/configure-openapi";
import createApp from "./lib/create-app";
// import index from "@/routes/index.route";
import auth from "@/routes/auth/auth.index";
const app = createApp();

const routes = [auth];

configureOpenAPI(app);
routes.forEach((route) => {
  app.route("/api", route);
});

export default app;
