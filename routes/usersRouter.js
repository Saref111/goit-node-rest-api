import express from "express";
import multer from "multer";
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
  updateAvatar,
  verifyEmail,
  sendVerificationEmail,
} from "../controllers/usersControllers.js";
import { authenticateToken } from "../helpers/authenticateToken.js";

const upload = multer({dest: 'tmp'})

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

usersRouter.patch(
  "/avatars",
  authenticateToken,
  upload.single("avatar"),
  updateAvatar
);

usersRouter.get("/verify/:verificationToken", verifyEmail);
usersRouter.post("/verify", sendVerificationEmail);

export default usersRouter;
