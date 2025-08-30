import type { Context } from "hono"
// import * as userService from "@/services/users.service"
// import { createUserSchema, updateUserSchema } from "@/schemas/users.schema"
import { sendSuccess, sendError, ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/utils/response"
import { AuthService } from "@/services/auth.service";


export async function login(c: Context) {
    try {
        const { emailOrUsername, password } = await c.req.json();

        if (!emailOrUsername || !password) {
            return sendError(c, ERROR_MESSAGES.BAD_REQUEST, undefined, "Email/Username and password are required")
        };

        // Call the service to login the user
        // const user = await AuthService.login(emailOrUsername, password);


        return sendSuccess(c, SUCCESS_MESSAGES.LOGIN_SUCCESSFUL)
        
    } catch (error) {
        return sendError(c, ERROR_MESSAGES.INTERNAL_ERROR)
    }

}