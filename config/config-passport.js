import passport from "passport";
import passportJWT from "passport-jwt";
import { userSchema } from "../schemas/usersSchemas.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const secret = process.env.JWT_SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

const User = mongoose.model("User", userSchema);

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findOne({ _id: payload.id });
      if (!user) {
        return done(new Error("User not found"));
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);
