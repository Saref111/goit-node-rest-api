import mongoose from "mongoose"; 
import jwt from "jsonwebtoken";
import { userSchema } from "../schemas/usersSchemas.js";

const User = mongoose.model("User", userSchema);

const createUser = async (email, password) => {
  const newUser = new User({ email, password });
  await newUser.save();
  return newUser;
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const createToken = async (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    await User.updateOne({ _id: user._id }, { token });
    return token;
};
export default {
    createUser,
    findUserByEmail,
    createToken,
};
