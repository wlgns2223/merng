import { prop, getModelForClass } from "@typegoose/typegoose";

 export class User {

    @prop({required: true})
    username: string;

    @prop({required: true})
    password: string;

    @prop({required: true})
    email: string;
}

const UserModel = getModelForClass(User,{
    schemaOptions: {
        timestamps: true,
    }
});
export default UserModel;