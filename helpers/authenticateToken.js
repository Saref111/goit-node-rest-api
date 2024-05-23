import jwt from 'jsonwebtoken';
import usersService from "../services/usersServices.js";

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: "Not authorized" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "Not authorized" });
        const dbUser = await usersService.findUserById(user.id);
        if (!dbUser || dbUser.token !== token) return res.status(401).json({ message: "Not authorized" });
        req.user = dbUser;
        next();
    });
};
