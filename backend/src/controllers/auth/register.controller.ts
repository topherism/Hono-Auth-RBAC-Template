import type { Context } from "hono";
import type { z } from "zod";
import {
  sendSuccess,
  sendError,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/utils/response";
import { AuthService } from "@/services/auth.service";


export async function register(c: Context) {
  // try {
  //   // ✅ Type-safe now
  //   const { email, username, password } = c.req.valid("json") as RegisterInput;

  //   const result = await AuthService.register(email, password, username);

  //   return sendSuccess(c, SUCCESS_MESSAGES.USER_REGISTERED, {
  //     user: result,
  //   });
  // } catch (error: any) {
  //   return sendError(
  //     c,
  //     ERROR_MESSAGES.INTERNAL_ERROR,
  //     undefined,
  //     error.message ?? "Something went wrong"
  //   );
  // }
}
