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
    },
  });

  app.get(
    "/scalar",
    Scalar((c) => {
      return {
        url: "/doc",
        layout: "classic",
        theme: "kepler",
        proxyUrl:
          envConfig.NODE_ENV === "development"
            ? "https://proxy.scalar.com"
            : undefined,
        defaultHttpClient: { targetKey: "js", clientKey: "axios" },
      };
    })
  );
}
