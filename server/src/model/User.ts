import { prop, getModelForClass } from "@typegoose/typegoose";

 class User {

    @prop({required: true})
    username: string;

    @prop({required: true})
    password: string;

    @prop({required: true})
    email: string;

    @prop({required: true,default: Date.now})
    createdAt: string
}
const UserModel = getModelForClass(User);
export default UserModel;