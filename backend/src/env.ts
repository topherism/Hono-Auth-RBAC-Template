import { z, ZodError } from "zod";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "path";

expand(
  config({
    path: path.resolve(
      process.cwd(),
      process.env.NODE_ENV === "test" ? ".env.test" : ".env"
    ),
  })
);
// Load and expand environment variables from .env file
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  LOG_LEVEL: z.enum([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
    "silent",
  ]),
  PORT: z.coerce.number().default(9999),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
});

export type Env = z.infer<typeof envSchema>;

let envConfig: Env;
try {
  envConfig = envSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError;
  console.error("❌ Invalid environment variables:");
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export default envConfig;
