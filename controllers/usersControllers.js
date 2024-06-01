import Jimp from "jimp";
import path from "path";
import { getTokenfromReq } from "../helpers/getTokenfromReq.js";
import usersService from "../services/usersServices.js";
import fs from "fs/promises";

export const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.findUserByEmail(email);
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  const newUser = await usersService.createUser(email, password);
  await usersService.sendEmail(newUser);

  return res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.findUserByEmail(email);
  if (!user || !user.validPassword(password)) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  if (!user.verify) {
    return res.status(400).json({ message: "Email is not verified" });
  }

  const token = await usersService.createToken(user);
  return res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

export const logout = async (req, res) => {
  const user = await usersService.findUserById(req.user._id);
  const token = getTokenfromReq(req);
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  await usersService.blacklistToken(token);
  await usersService.updateToken(user._id, null);
  return res.status(204).json();
};

export const getCurrentUser = async (req, res) => {
  const user = await usersService.findUserById(req.user._id);
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  return res.status(200).json({
    email: user.email,
    subscription: user.subscription,
    avararURL: user.avatarURL,
  });
};

export const updateSubscription = async (req, res) => {
  const user = await usersService.findUserById(req.user._id);
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const updatedUser = await usersService.updateSubscription(
    user._id,
    req.body.subscription
  );
  return res
    .status(200)
    .json({ email: updatedUser.email, subscription: updatedUser.subscription });
};

export const updateAvatar = async (req, res) => {
  const user = await usersService.findUserById(req.user._id);
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }

  const newAvatarPath = path
    .join("public", "avatars", req.file.filename + ".jpg")
    .replace(/\\/g, "/");

  const newAvatar = await Jimp.read(req.file.path);
  await newAvatar.cover(250, 250).writeAsync(newAvatarPath);

  const updatedUser = await usersService.updateAvatar(
    user._id,
    newAvatarPath.replace("public", "")
  );

  await fs.unlink(req.file.path);

  return res.status(200).json({ avatarURL: updatedUser.avatarURL });
};

export const verifyEmail = async (req, res) => {
  const user = await usersService.findUserByVerificationToken(
    req.params.verificationToken
  );
  if (!user || user.verify) {
    return res.status(404).json({ message: "User not found" });
  }

  await usersService.verifyUser(user._id);
  return res.status(200).json({ message: "Verification successful" });
};

export const sendVerificationEmail = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "missing required field email" });
  }
  const user = await usersService.findUserByEmail(req.body.email);
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.verify) {
    return res.status(400).json({ message: "Verification has already been passed" });
  }

  await usersService.sendEmail(user);
  return res.status(200).json({ message: "Verification email sent" });
};
