import { makeError } from "@/utils/errors";
import type { Context } from "hono";

export async function errorHandlerMiddleware(err: Error, c: Context) {
  const { error, statusCode } = makeError(err);
  console.error(error.message, error);
  // const errorContextData = {
  //   context: JSON.stringify(c, null, 2),
  //   statusCode: statusCode,
  //   error: error,
  // };
  // sentryClient.captureException(err, { contexts: { data: errorContextData } });
  return c.json(error, { status: statusCode } as any);
}
