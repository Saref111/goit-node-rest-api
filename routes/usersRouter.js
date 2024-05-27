import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  userValidationSchema,
  subscriptionValidationSchema,
} from "../schemas/usersValidationSchemas.js";
import {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
} from "../controllers/usersControllers.js";
import { authenticateToken } from "../helpers/authenticateToken.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(userValidationSchema), register);

usersRouter.post("/login", validateBody(userValidationSchema), login);

usersRouter.post("/logout", authenticateToken, logout);

usersRouter.get("/current", authenticateToken, getCurrentUser);

usersRouter.patch(
  "/",
  authenticateToken,
  validateBody(subscriptionValidationSchema),
  updateSubscription
);

export default usersRouter;
