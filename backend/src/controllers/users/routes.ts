import { Hono } from "hono";
import {
  createUserController,
  deleteUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from "./index.js";
import { authenticationMiddleware } from "@/middlewares/authentication.middleware";

const routes = new Hono()
  .get("/users", authenticationMiddleware, getUsersController)
  .post("/users", authenticationMiddleware, createUserController)
  .get("/users/:id", authenticationMiddleware, getUserController)
  .delete("/users/:id", authenticationMiddleware, deleteUserController)
  .put("/users/:id", authenticationMiddleware, updateUserController);
  
export default routes;
