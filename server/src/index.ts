import { ApolloServer } from "apollo-server";
import { connect } from "mongoose";
import * as dotenv from "dotenv";

import { typeDefs } from "./graphql/typeDefs"
import indexResolver from "./graphql/resolvers/index"

dotenv.config();


const server = new ApolloServer({
    typeDefs,
    resolvers: indexResolver,
    context: ({req}) => {
        req.headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUzZmFmYjJmNDU2ZDZkM2ZlMTBhYjMiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNjMzMjM1MjU0LCJleHAiOjE2MzMyNzEyNTR9.4HTGWlRuNjfJTo6kM4LzZjxOejWCEzkJZLLA4mEnEJs"
        return {req};
    },
});

const mongodbConnectURL = process.env.MONGODB as string;
connect(mongodbConnectURL).then(() => {
    console.log('mongodb connected');

})

server.listen().then((res) => {
    console.log(`server is listening at ${res.url}...!`);
})