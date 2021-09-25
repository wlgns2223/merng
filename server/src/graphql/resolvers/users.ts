import UserModel ,{User} from "../../model/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { BeAnObject, IObjectWithTypegooseFunction } from "@typegoose/typegoose/lib/types";
import { Document } from "mongoose";

interface ICustomDocument extends User, Document<any,BeAnObject,any>, IObjectWithTypegooseFunction{
    _doc?: any
}

export const userResolver = {
    Mutation: {
        register: async (_ ,args,context,info) => {
            // validate user data
            // Check if User does already exist
            // hash password and create an auth token
            const { registerInput } = args;
            let {username, password, email} = registerInput;
            password = await bcrypt.hash(password,12);

            const newUser = new UserModel({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            });

            const res:ICustomDocument = await newUser.save();
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username,
            }, process.env.SECRET_KEY as string,
            {
                expiresIn: '1h'
            });
                       
            
            return {
                ...res._doc,
                id: res._id,
                token,
            }
        }   
    }
}