import type { Context } from "hono";
import {
  sendSuccess,
  sendError,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/utils/response";
import { AuthService } from "@/services/auth.service";

export async function register(c: Context) {
  try {
    const { email, username, password } = await c.req.json();

    if (!email || !password) {
      return sendError(
        c,
        ERROR_MESSAGES.BAD_REQUEST,
        undefined,
        "Email and password are required"
      );
    }
    // Call the service to register the user
    const user = await AuthService.register(email, password, username);

    return sendSuccess(c, SUCCESS_MESSAGES.USER_REGISTERED, { user });
  } catch (error) {}
}
