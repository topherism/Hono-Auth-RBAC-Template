import configureOpenAPI from "./lib/configure-openapi";
import createApp from "./lib/create-app";
import routers from "@/routes/index";

const app = createApp();

configureOpenAPI(app);
app.route("/api", routers);

export type AppType = typeof app;
export default app;
