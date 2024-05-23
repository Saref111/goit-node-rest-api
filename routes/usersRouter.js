import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  userValidationSchema,
} from "../schemas/usersValidationSchemas.js";
import { register, login, logout, getCurrentUser } from "../controllers/usersControllers.js";
import { authenticateToken } from "../helpers/authenticateToken.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(userValidationSchema), register);

usersRouter.post("/login", validateBody(userValidationSchema), login);

usersRouter.get("/logout", authenticateToken, logout);

usersRouter.get("/current", authenticateToken, getCurrentUser);

export default usersRouter;
