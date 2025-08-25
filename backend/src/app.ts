// import { serve } from '@hono/node-server'
// import { Hono } from 'hono'
// import { routes } from './controllers/routes'
// import { sendSuccess, SUCCESS_MESSAGES } from './utils/response';
// import { envConfig } from './env';

// const app = new Hono()

// app.get("/api/ping", (c) => {
//   return sendSuccess(c, SUCCESS_MESSAGES.HEALTH_CHECK);
// });

// routes.forEach((route) => {
//   app.route("/api", route);
// });

// serve({
//   fetch: app.fetch,
//   port: envConfig.APP_PORT
// }, (info) => {
//   console.log(`Server is running on http://localhost:${info.port}`)
// })
