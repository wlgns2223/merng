import { ObjectId } from "mongoose";

interface IUser {
    _id?: ObjectId
    username?: String
    email?: String
    createdAt?:Date
}

export default IUser;