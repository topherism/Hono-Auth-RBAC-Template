import { Hono } from "hono";
import { loginValidator, registerValidator } from "@/schemas/auth.schema";
import {
  sendSuccess,
  sendError,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/utils/response";
import { AuthService } from "@/services/auth.service";
import { generateToken } from "@/utils/jwt";
import { deleteCookie, setCookie, getCookie } from "hono/cookie";

const authRoute = new Hono()
  .post("/register", registerValidator, async (c) => {
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
  })
  .post("/login", loginValidator, async (c) => {
    try {
      const { emailUsername, password } = c.req.valid("json");

      const user = emailUsername.includes("@")
        ? await AuthService.findByEmail(emailUsername)
        : await AuthService.findByUsername(emailUsername);

      if (!user) {
        return sendError(c, ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      const isPasswordValid = await AuthService.verifyPassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return sendError(c, ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      const { accessToken, refreshToken, refreshTokenExp, jti } = await generateToken(
        user.id
      );

      await AuthService.insertRefreshToken(user.id, refreshTokenExp, jti);

      return sendSuccess(c, SUCCESS_MESSAGES.LOGIN_SUCCESSFUL, {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        tokens: { accessToken , refreshToken},
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
// .post("/refresh", async (c) => {
// try {
//   const token = getCookie("refreshToken"); // or from body/header
// if (!token) return sendError(c, ERROR_MESSAGES.UNAUTHORIZED);

// const payload = await verifyToken(token, process.env.JWT_REFRESH_SECRET!);

// // Check if jti exists in DB and not expired
// const stored = await AuthRepository.findRefreshToken(payload.jti!);
// if (!stored || stored.expiresAt < new Date()) {
//   return sendError(c, ERROR_MESSAGES.UNAUTHORIZED);
// }

// const { accessToken } = await generateToken(payload.sub);
// return sendSuccess(c, SUCCESS_MESSAGES.TOKEN_REFRESHED, { accessToken });
// } catch (error: any) {
// return sendError(c, ERROR_MESSAGES.UNAUTHORIZED, undefined, error.message);
// }
// });

export default authRoute;
