import { AuthenticationError, UserInputError } from "apollo-server-errors";
import { ObjectId } from "mongodb"

import PostModel from "../../model/Post";
import verifyUser from "../../utils/authCheck";

export const postResolver = {
    Query: {
        getPosts: async (_,__,context) => {
            
            verifyUser(context);
    
            try {
                const posts = await PostModel.find();
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        getPost: async(_, args) =>{
            
            const {postId} = args;
            
            
            try{
                const post = await PostModel.findById(postId);
                
                if(post) return post;
                else throw new Error('Post Not Found');
            } catch (error){
                throw new Error(error);
            }
        }
   },
   Mutation: {
       createPost: async (_ , args, context) => {
           
           const {body} = args;

           if(body.trim() === '') throw new Error('Body Must Not Be Empty');
           
           const user = verifyUser(context);
           const newPost = new PostModel({
               body,
               user: user.id,
               username: user.username,
           });

           const post = await newPost.save();

           return post;
       },
       async deletePost(_, args, context){
        const {postId } = args;
           const user = verifyUser(context);
           try {
               const post = await PostModel.findById(postId);
               if(user.username === post?.username){
                   await post?.delete();
                   return "Successfully deleted";
               } else {
                   throw new AuthenticationError('Action Not Allowed');
               }

           } catch(error){
               throw new Error(error);
           }
       },
       likePost: async (_, { postId },context) => {
        const { username } = verifyUser(context);
        
        const post = await PostModel.findById(postId);
        
        if(post){

            if(post.likes.find((like) => like.username === username)){
                post.likes = post.likes.filter((like) => like.username !== username);
            } else {
                post.likes.push({
                    _id: (new ObjectId()).toString(),
                    username,
                    createdAt: new Date().toISOString(),
                });
            }
            post.save();
            return post;
        } 
        
        throw new UserInputError('Post Not Found');
    }
   },
}