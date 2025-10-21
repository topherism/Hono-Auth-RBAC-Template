import { hc } from "hono/client";
import type { AppType } from "@backend/app";

type Flatten<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? T[K] : never
};

type ApiRouter = Flatten<AppType>;

export const apiClient = hc<ApiRouter>(
  import.meta.env.VITE_API_URL || "http://localhost:3000/api"
);
