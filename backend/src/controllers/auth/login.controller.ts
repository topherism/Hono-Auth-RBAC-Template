import type { Context } from "hono"
// import * as userService from "@/services/users.service"
// import { createUserSchema, updateUserSchema } from "@/schemas/users.schema"
import { sendSuccess, sendError, ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/utils/response"


export async function login(c: Context) {

    try {
        
    } catch (error) {
        return sendError(c, ERROR_MESSAGES.INTERNAL_ERROR)
    }

}