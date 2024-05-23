import mongoose from "mongoose"; 
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

export default {
    createUser,
    findUserByEmail,
};
