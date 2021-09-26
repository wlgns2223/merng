import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, process.env.SECRET_KEY as string,
    {
        expiresIn: '1h'
    });
}