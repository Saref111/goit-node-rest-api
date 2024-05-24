import mongoose from "mongoose"; 
import jwt from "jsonwebtoken";
import { userSchema, tokenBlacklistSchema } from "../schemas/usersSchemas.js";

const User = mongoose.model("User", userSchema);
const TokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

const blacklistToken = async (token) => {
  const blacklistedToken = new TokenBlacklist({ token });
  await blacklistedToken.save();
};

const isTokenBlacklisted = async (token) => {
    return await TokenBlacklist.findOne({ token }) !== null;
  };

const createUser = async (email, password) => {
  const newUser = new User({ email, password });
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

export default {
    createUser,
    findUserByEmail,
    createToken,
    updateToken,
    findUserById,
    blacklistToken,
    isTokenBlacklisted,
};
