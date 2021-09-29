import PostModel from "../../model/Post";

export const postResolver = {
    Query: {
        getPosts: async () => {
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
                const post = await PostModel.findById({postId});
                if(post) return post;
                else throw new Error('Post Not Found');
            } catch (error){
                throw new Error(error);
            }
        }
   }
}