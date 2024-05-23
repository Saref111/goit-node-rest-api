import usersService from "../services/usersServices.js";

export const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await usersService.findUserByEmail(email);
    if (user) {
        return res.status(409).json({ message: "Email in use" });
    }
    const newUser = await usersService.createUser(email, password);
    return res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription } });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await usersService.findUserByEmail(email);
    if (!user || !user.comparePassword(password)) {
        return res.status(401).json({ message: "Email or password is wrong" });
    }
    const token = await usersService.createToken(user);
    return res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
};
