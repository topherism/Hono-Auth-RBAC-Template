// lib/create-app.ts

import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { pinoLogger } from "@/middlewares/pino-logger";
import { AppBindings, AppOpenAPI } from "./types";
import { defaultHook } from "stoker/openapi";
import { AppError } from "./errors";
import { StatusCode } from "hono/utils/http-status";
import { csrf } from "hono/csrf";
import { cors } from "hono/cors"; // ✅ ADD THIS

export function createRouter() {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });

  // Register the bearer security scheme in the OpenAPI components
  // This is the supported/observed pattern in hono/zod-openapi examples.
  app.openAPIRegistry.registerComponent(
    "securitySchemes",
    "BearerAuth", // the component name you will reference in route.security
    {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      description: "Provide `Bearer <token>`",
    }
  );

  return app;
}

export default function createApp() {
  const app = createRouter();

  app.use(
    cors({
      origin: ["http://localhost:5173"], // or specify frontend URL e.g. "http://localhost:5173"
      allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      credentials: true, // enable if using cookies
    })
  );
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
