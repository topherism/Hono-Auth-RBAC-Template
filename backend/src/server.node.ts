import app from "./app"
import { serve } from "@hono/node-server"
import { envConfig } from "./env"

const port = envConfig.APP_PORT || 3000

console.log(`🚀 Running on Node at PORT: ${port}`)

serve({
  fetch: app.fetch,
  port,
})
