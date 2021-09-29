import {getModelForClass,prop} from "@typegoose/typegoose"

export class User {

    @prop()
    firstname: string;

    @prop()
    lastName: string;

    @prop()
    password: string; 
    
    @prop({unique: true})
    email: string; 
}

const UserModel = getModelForClass(User);

export default UserModel;