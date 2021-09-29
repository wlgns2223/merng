import jwt from "jsonwebtoken";
import IUser from "../types/user/User";


export const generateToken = (user:IUser) => {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        username: user.username,
    }, process.env.SECRET_KEY!);
}
