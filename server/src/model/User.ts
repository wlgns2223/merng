import { prop, getModelForClass } from "@typegoose/typegoose";

 export class User {

    @prop({required: true})
    username: string;

    @prop({required: true})
    password: string;

    @prop({required: true})
    email: string;

    @prop({required: true,default: Date.now})
    createdAt: string
}

// date.now 말고 time stamp option으로 주자
const UserModel = getModelForClass(User);
export default UserModel;