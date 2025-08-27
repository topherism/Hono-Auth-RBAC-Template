import app from "./app"
import { envConfig } from "./env"

const port = envConfig.APP_PORT || 3000

console.log(`🚀 Running on Bun at PORT: ${port}`)

export default {
  port,
  fetch: app.fetch,
}
