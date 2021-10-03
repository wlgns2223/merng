import UserModel from "../../model/User";
import bcrypt from "bcrypt"

import ICustomUser from "../../types/user/ICustomUser";
import {UserInputError} from "apollo-server";
import {validateRegisterInput,validateLoginInput} from "../../utils/validator";
import {generateToken} from "../../utils/generateToken";

export const userResolver = {
    Mutation: {

        login: async (_, args, context, info) => {
            const {username,password} = args;
            const {valid, errors} = validateLoginInput(username,password);
            const user = await UserModel.findOne({username}) as ICustomUser;

            if(!valid){
                throw new UserInputError('Invalid Input',{errors});
            }

            if(!user){
                throw new UserInputError('User Not Found',{
                    errors: {
                        username: 'User Not Found'
                    }
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                throw new UserInputError('Wrong Password',{
                    errors: {
                        password: 'Wrong Password'
                    }
                });
            }

            const token = generateToken(user);
            
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        register: async (_ ,args,context,info) => {
            // validate user data
            // Check if User does already exist
            // hash password and create an auth token
            const { registerInput } = args;
            let { username, password, email,confirmPassword } = registerInput;
            const {valid, errors} = validateRegisterInput(username,email,password,confirmPassword);
            if(!valid){
                throw new UserInputError('Invalid Inputs',{errors});
            }

            const user = await UserModel.findOne({username});
            if(user){
                throw new UserInputError('User is taken',{
                    errors: {
                        username: 'This username is taken',
                    },
                });
            }

            password = await bcrypt.hash(password,12);

            const newUser = new UserModel({
                username,
                password,
                email,
            }) as ICustomUser;

            const res = await newUser.save();
            const token = generateToken(res);
                    
            return {
                ...res._doc,
                id: res._id,
                token,
            }
        }   
    }
}