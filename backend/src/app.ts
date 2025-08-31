import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { sendSuccess, SUCCESS_MESSAGES } from "@/utils/response";
import { responseTimer } from "./middlewares/responseTimer";
import authRoutes from "@/routes/auth.routes";
import { swaggerUI } from "@hono/swagger-ui";
import { Scalar } from "@scalar/hono-api-reference";
// import usersRoutes from "@/routes/users.routes"
// import inventoryRoutes from "@/routes/inventory.routes"

const app = new Hono();

app.get("/doc", (c) =>
  c.json({
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Dynamic docs from Zod schemas",
    },
    paths: {}, // Scalar will populate automatically
    components: {}, // Scalar reads your schemas automatically
  })
);

app.get("/ui", swaggerUI({ url: "/doc" }));

app.get(
  "/scalar",
  Scalar({ url: "/doc", theme: "purple", proxyUrl: "https://proxy.scalar.com" })
);

// Global middlewares
app.use(
  "/api/*",
  cors({
    origin: (origin, c) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://yourdomain.com",
      ];
      return origin && allowedOrigins.includes(origin) ? origin : "null";
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use("*", responseTimer);
app.use("/api/*", csrf());

// Health check
app.get("/api/health", (c) => {
  return sendSuccess(c, SUCCESS_MESSAGES.HEALTH_CHECK);
});

// Mount routes
app.route("/api/auth", authRoutes);
// app.route("/api", usersRoutes)
// app.route("/api", inventoryRoutes)

export default app;
