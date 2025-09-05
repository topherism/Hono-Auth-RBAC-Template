// src/routes/tasks/tasks.handlers.ts

import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { LoginRoute, RegisterRoute } from "./auth.routes";
import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const { emailOrUsername, password } = c.req.valid("json");
  //   const task =
  // const result = await UserService.findByEmailOrUsername(emailOrUsername);

  return c.json(
    {
      accessToken: "fake_access_token",
      refreshToken: "fake_refresh_token",
    },
    HttpStatusCodes.OK
  );
};

// export const register: AppRouteHandler<RegisterRoute> = async (c) => {
//   const { email, username, password, first_name, middle_name, last_name } =
//     c.req.valid("json");

  
//   //   //   const task =

//   //   return c.json(HttpStatusCodes.CREATED);
// };
