import { serve } from '@hono/node-server'
import app from './app'
import 'dotenv/config'

const port = Number(process.env.PORT) || 3000
console.log(`🚀 TrackKIT API running at http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
