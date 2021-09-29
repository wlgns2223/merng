import {prop, getModelForClass} from "@typegoose/typegoose"
import { ObjectId } from "mongoose";
import ICommentType from "../types/post/commentType";
import ILikesType from "../types/post/likesType";

class Post {

    @prop({required: true})
    body: string;
    
    @prop({required: true})
    username: string;

    @prop({required: true})
    comments: ICommentType[]

    @prop({required: true})
    likes: ILikesType[]

    @prop({required: true,ref: 'User'})
    user: ObjectId
}

const PostModel = getModelForClass(Post,{
    schemaOptions: {
        timestamps: true
    }
});
export default PostModel;