import { serve } from "@hono/node-server";
import app from "./app";
import envConfig from "./env";

const port = Number(envConfig.PORT) || 3000;

console.log(`Server is running on port http://localhost:${port}`);
console.log(`📖 Docs available at http://localhost:${port}/scalar`);

serve({
  fetch: app.fetch,
  port,
});
