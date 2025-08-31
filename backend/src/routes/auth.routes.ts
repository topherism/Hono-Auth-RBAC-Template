import { Hono } from "hono";
import { registerValidator } from "@/schemas/auth.schema";
import {
  sendSuccess,
  sendError,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/utils/response";
import { AuthService } from "@/services/auth.service";
const authRoute = new Hono();

authRoute.post("/register", registerValidator, async (c) => {
  try {
    const { email, username, password } = c.req.valid("json");

    const result = await AuthService.register(email, password, username);

    return sendSuccess(c, SUCCESS_MESSAGES.USER_REGISTERED, {
      user: result,
    });
  } catch (error: any) {
    return sendError(
      c,
      ERROR_MESSAGES.INTERNAL_ERROR,
      undefined,
      error.message ?? "Something went wrong"
    );
  }
});

export default authRoute;
