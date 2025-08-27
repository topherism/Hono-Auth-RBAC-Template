import { Hono } from "hono"
// import * as authController from "@/controllers/auth/auth.controller"

const authRoutes = new Hono()
//   .post("/auth/login", authController.login)
//   .post("/auth/register", authController.register)
//   .post("/auth/refresh", authController.refreshToken)

export default authRoutes
