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
        }
   }
}