import envConfig from "@/env";
import { pinoLogger as logger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

export function pinoLogger() {
  return logger({
    pino: pino(
      // Customize the log level shown based on the environment variable
      { level: envConfig.LOG_LEVEL || "info" }, // default to 'info' if LOG_LEVEL is not set
      envConfig.NODE_ENV === "production" ? undefined : pretty()
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
