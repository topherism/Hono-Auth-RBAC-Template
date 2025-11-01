import { createRouter } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

const router = createRouter()
  .openapi(
    createRoute({
      tags: ["Index"],
      method: "get",
      path: "/",
      responses: {
        [HttpStatusCodes.OK]: jsonContent(
          createMessageObjectSchema("Tasks API"),
          "Tasks API Index"
        ),
      },
    }),
    (c) => {
      return c.json(
        {
          message: "Tasks API",
        },
        HttpStatusCodes.OK
      );
    }
  )
  .openapi(
    createRoute({
      tags: ["Index"],
      method: "get",
      path: "/health",
      responses: {
        [HttpStatusCodes.OK]: jsonContent(
          createMessageObjectSchema("OK"),
          "Health Check"
        ),
      },
    }),
    (c) => c.json({ message: "OK" }, HttpStatusCodes.OK)
  );

export default router;
