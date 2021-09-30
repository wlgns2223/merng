import { postResolver } from "./posts";
import { userResolver } from "./users";
import { commentResolver } from "./comment";

const indexResolver = {

    Post: {
        likeCount: (parent) =>  parent.likes.length,
        commentCount: (parent) => parent.comments.length,
    },
    Query: {
        ...postResolver.Query,
    },
    Mutation: {
        ...userResolver.Mutation,
        ...postResolver.Mutation,
        ...commentResolver.Mutation,

    }
}

export default indexResolver;