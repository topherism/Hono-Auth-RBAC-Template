import app from "./app";
import { serve } from "@hono/node-server";
import { envConfig } from "./env";

const PORT = envConfig.APP_PORT || 3000;

/**
 * Bun automatically provides `Bun.serve`, while Node needs @hono/node-server.
 * We check which runtime we’re in.
 */
if (typeof Bun !== "undefined") {
  // Running in Bun
  console.log(`🚀 Server running in Bun at http://localhost:${PORT}`);
  Bun.serve({
    fetch: app.fetch,
    port: PORT,
  });
} else {
  // Running in Node
  console.log(`🚀 Server running in Node at http://localhost:${PORT}`);
  serve({
    fetch: app.fetch,
    port: PORT,
  });
}
