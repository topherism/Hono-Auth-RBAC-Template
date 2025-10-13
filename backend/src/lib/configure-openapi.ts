// lib/configure-openapi.ts

import type { AppOpenAPI } from "./types";

import packageJSON from "../../package.json";
import { Scalar } from "@scalar/hono-api-reference";
import envConfig from "@/env";

export default function configureOpenAPI(app: AppOpenAPI) {

  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "TrackKIT API",
      description: `
        TrackKIT API documentation powered by Scalar.

        All secured endpoints require a valid Bearer JWT token.
        Use the 🔒 "Authorize" button to authenticate requests.
      `,
      contact: {
        name: "Christopher Jay S. Manubay",
        email: "christopherjay.manubay@gmail.com",
      }
    },
    security: [{BearerAuth: []}]
  });

  app.get(
    "/scalar",
    Scalar((c) => {
      return {
        url: "/doc",
        layout: "modern",
        theme: "deepSpace",
        //deepSpace
        //bluePlanet
        //mars
        //kepler
        //purple
        proxyUrl:
          envConfig.NODE_ENV === "development"
            ? "https://proxy.scalar.com"
            : undefined,
        defaultHttpClient: { targetKey: "js", clientKey: "axios" },
      };
    })
  );
}
