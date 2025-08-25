import { config } from "dotenv";
import { z } from "zod";
import { STAGES } from "./constants/env";

config(); // loads .env into process.env

export function isTest() {
  return process.env.NODE_ENV === "test";
}

const envSchema = z.object({
  APP_PORT: z.coerce.number().default(3000),
  // ✅ fixed: use z.enum for literal object values
  STAGE: z.enum([STAGES.Dev, STAGES.Prod]).default(STAGES.Dev),
  // DB_URL: z.string(),
  // TEST_DB_URL: z.string(),
  JWT_ACCESS_TOKEN: z.string(),
  JWT_REFRESH_TOKEN: z.string(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export const envConfig = envSchema.parse({
  APP_PORT: process.env.APP_PORT,
  STAGE: process.env.STAGE,
  // DB_URL: process.env.DB_URL,
  // TEST_DB_URL: process.env.TEST_DB_URL,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
  NODE_ENV: process.env.NODE_ENV,
});

export type EnvConfig = z.infer<typeof envSchema>;
