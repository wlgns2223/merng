import jwt from "jsonwebtoken";
import ICustomUser from "../types/user/ICustomUser";


export const generateToken = (user:ICustomUser) => {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        username: user.username,
    }, process.env.SECRET_KEY!,{
        expiresIn: "10h"
    });
}
