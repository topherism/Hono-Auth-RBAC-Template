import { Hono } from "hono";
import authRoutes from "./routes/auth.routes";

const app = new Hono();

app.get("/", (c) => c.text("Hello, TrackKIT 👋"));
app.route("/auth", authRoutes);

export default app;
