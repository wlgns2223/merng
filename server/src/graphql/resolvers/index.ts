import { postResolver } from "./posts";
import { userResolver } from "./users";

const indexResolver = {
    Query: {
        ...postResolver.Query,
    },
    Mutation: {

        ...userResolver.Mutation,
        ...postResolver.Mutation,

    }
}

export default indexResolver;