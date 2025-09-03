import pino from "pino";

// Check if the environment is development (not production)
const isDev = process.env.NODE_ENV !== "production";

/**
 * Pino logger instance
 * - Dev: human-readable colored logs using pino-pretty
 * - Prod: structured JSON logs suitable for log aggregation
 * - LOG_LEVEL env var controls log verbosity
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
  transport: isDev
    ? {
        target: "pino-pretty", // Pretty-print logs in dev
        options: { colorize: true }, // Add color for readability
      }
    : undefined,              // Keep JSON logs in production
});
