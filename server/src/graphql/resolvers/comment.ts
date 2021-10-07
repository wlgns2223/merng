import { UserInputError, AuthenticationError } from "apollo-server-errors";
import PostModel from "../../model/Post";
import verifyUser from "../../utils/authCheck";

import {ObjectId } from "mongodb"

export const commentResolver = {
    Mutation: {
        createComment : async( _, {postId,body},context) => {            

            const user = verifyUser(context);
            if(body.trim() === '' ){
                throw new UserInputError('Empty Content', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                });
            }

            const post = await PostModel.findById(postId);
            if(post) {
                post.comments.unshift({
                    _id: (new ObjectId()).toString(),
                    body,
                    username: user.username as string,
                    createdAt: Date.now().toString(), 
                });

                await post.save();
                return post;
            } else throw new UserInputError('Post Not Found');
        },
        deleteComment: async (_, {postId, commentId}, context) => {
            
            const {username} = verifyUser(context);
            const post = await PostModel.findById(postId);
            
            if(post){
                const commentIdx = post.comments.findIndex((comment) => comment._id === commentId);
                if(post.comments[commentIdx].username === username){
                    post.comments.splice(commentIdx,1);
                    await post.save();
                    return post;
                } else {
                    throw new AuthenticationError('Action Not Allowed')
                }
            } else {
                throw new UserInputError('Post Not Found');
            }
        },
    },
}