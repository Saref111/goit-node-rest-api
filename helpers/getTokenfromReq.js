export const getTokenfromReq = (req) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.replace("Bearer ", "");
    return token;
}
