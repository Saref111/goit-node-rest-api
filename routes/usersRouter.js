import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  userValidationSchema,
} from "../schemas/usersValidationSchemas.js";
import { register, login } from "../controllers/usersControllers.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(userValidationSchema), register);

usersRouter.post("/login", validateBody(userValidationSchema), login);

export default usersRouter;
