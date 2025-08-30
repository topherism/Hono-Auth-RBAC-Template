import { Hono } from "hono";
import { registerValidator } from "@/schemas/auth.schema";
import { register } from "@/controllers/auth/register.controller";

const authRoutes = new Hono().post(
  "/auth/register",
  registerValidator, // ✅ runs schema validation first
  register
);

// .post("/auth/login", authController.login)
// .post("/auth/refresh", authController.refreshToken)

export default authRoutes;
