import { postResolver } from "./posts";
import { userResolver } from "./users";

const indexResolver = {
    Query: {
        ...postResolver.Query,
    },
    Mutation: {

        ...userResolver.Mutation,

    }
}

export default indexResolver;