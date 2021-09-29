import { AuthenticationError } from "apollo-server-errors";

import PostModel from "../../model/Post";
import veryfyUser from "../../utils/authCheck";

export const postResolver = {
    Query: {
        getPosts: async (_,__,context) => {
            veryfyUser(context);
    
            try {
                const posts = await PostModel.find();
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        getPost: async(_, args) =>{
            
            const {postID} = args;
            
            try{
                const post = await PostModel.findById(postID);
                
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
           
           const user = veryfyUser(context);
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
           const user = veryfyUser(context);
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
       }
   }
}