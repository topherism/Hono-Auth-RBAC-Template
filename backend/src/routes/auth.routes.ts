import { Hono } from "hono";
import { registerValidator } from "@/schemas/auth.schema";
import {
  sendSuccess,
  sendError,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/utils/response";
import { AuthService } from "@/services/auth.service";

const authRoute = new Hono().post("/register", registerValidator, async (c) => {
  try {
    const { email, username, password } = c.req.valid("json");
    // ✅ Expected business errors
    if (await AuthService.findByEmail(email)) {
      return sendError(c, ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    if (username && (await AuthService.findByUsername(username))) {
      return sendError(
        c,
        ERROR_MESSAGES.BAD_REQUEST,
        [],
        "Username already exists"
      );
    } // ✅ Create user
    
    const user = await AuthService.register(email, password, username);

    return sendSuccess(c, SUCCESS_MESSAGES.USER_REGISTERED, { user });
  } catch (error: any) {
    return sendError(
      c,
      ERROR_MESSAGES.INTERNAL_ERROR,
      undefined,
      error.message ?? "Something went wrong"
    );
  }
});
// .login("/login", async (c) => {
// })

export default authRoute;
