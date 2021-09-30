import { ObjectId } from "mongoose";

interface IUser {
    _id: ObjectId
    username: string
    email: string
    createdAt:Date
}

export default IUser;