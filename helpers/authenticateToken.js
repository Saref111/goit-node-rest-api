import passport from "passport";
import usersServices from "../services/usersServices.js";
import { getTokenfromReq } from "./getTokenfromReq.js";

export const authenticateToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (err || !user || await usersServices.isTokenBlacklisted(getTokenfromReq(req))) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};
