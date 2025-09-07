// lib/create-app.ts

import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { pinoLogger } from "@/middlewares/pino-logger";
import { AppBindings, AppOpenAPI } from "./types";
import { defaultHook } from "stoker/openapi";
import { AppError } from "./errors";
import { StatusCode } from "hono/utils/http-status";
import { csrf } from "hono/csrf";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook });
}

export default function createApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon("🚀"));
  app.use(pinoLogger());
  app.use("/api/*", csrf());

  app.notFound(notFound);
  app.onError((err, c) => {
    if (err instanceof AppError) {
      return c.json(err.toResponse(), err.statusCode as any);
    }
    return c.json({ message: "Internal Server Error" }, 500);
  });

  return app;
}

export function createTestApp(router: AppOpenAPI) {
  const testApp = createApp();
  testApp.route("/", router);
  return testApp;
}
