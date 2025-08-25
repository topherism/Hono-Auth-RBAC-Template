import { Hono } from "hono";
import { routes } from "./controllers/routes";
import { sendSuccess, SUCCESS_MESSAGES } from "./utils/response";

const app = new Hono();

app.get("/api/ping", (c) => {
  return sendSuccess(c, SUCCESS_MESSAGES.HEALTH_CHECK);
});

routes.forEach((route) => {
  app.route("/api", route);
});

export default app;
