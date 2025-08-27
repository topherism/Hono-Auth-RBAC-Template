
import { Hono } from "hono"
import authRoutes from "@/routes/auth.routes"
// import usersRoutes from "@/routes/users.routes"
// import inventoryRoutes from "@/routes/inventory.routes"
import { sendSuccess, SUCCESS_MESSAGES } from "@/utils/response"

const app = new Hono()

// Health check
app.get("/api/ping", (c) => {
  return sendSuccess(c, SUCCESS_MESSAGES.HEALTH_CHECK)
})

// Mount routes
app.route("/api", authRoutes)
// app.route("/api", usersRoutes)
// app.route("/api", inventoryRoutes)

export default app

