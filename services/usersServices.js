import mongoose from "mongoose";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import { userSchema, tokenBlacklistSchema } from "../schemas/usersSchemas.js";
import { v4 as uuid } from "uuid";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const User = mongoose.model("User", userSchema);
const TokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

const blacklistToken = async (token) => {
  const blacklistedToken = new TokenBlacklist({ token });
  await blacklistedToken.save();
};

const isTokenBlacklisted = async (token) => {
  return (await TokenBlacklist.findOne({ token })) !== null;
};

const createUser = async (email, password) => {
  const avatarURL = gravatar.url(email, { s: "250" }, true);
  const verificationToken = uuid();
  const newUser = new User({ email, password, avatarURL, verificationToken });
  await newUser.save();
  return newUser;
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (id) => {
  return await User.findOne({ _id: id });
};

const createToken = async (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  await User.updateOne({ _id: user._id }, { token });
  return token;
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateSubscription = async (id, subscription) => {
  return await User.findByIdAndUpdate(id, { subscription }, { new: true });
};

const updateAvatar = async (id, avatarURL) => {
  return await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
};

const findUserByVerificationToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

const sendEmail = async (user) => {
  const msg = {
    to: user.email,
    from: process.env.SENDGRID_EMAIL,
    subject: "Verify your email",
    text: "Click to verify your email",
    html: `
      <a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  await sgMail.send(msg);
};

const verifyUser = async (user) => {
  return await User.findByIdAndUpdate(user._id, { verify: true }, { new: true });
};

export default {
  createUser,
  findUserByEmail,
  createToken,
  updateToken,
  findUserById,
  blacklistToken,
  isTokenBlacklisted,
  updateSubscription,
  updateAvatar,
  findUserByVerificationToken,
  sendEmail,
  verifyUser,
};
