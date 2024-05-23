import passport from "passport";

export const authenticateToken = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: "Not authorized" });
        }
        req.user = user;
        next();
    })(req, res, next);
};
