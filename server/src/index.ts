import { ApolloServer,gql } from "apollo-server";
import { connect } from "mongoose";
import * as dotenv from "dotenv";

import PostModel from "./model/Post"

dotenv.config();

const typeDefs = gql`

    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }

    type Query{
        getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        sayHi: () => 'Hello User !'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const mongodbConnectURL = process.env.MONGODB as string;
connect(mongodbConnectURL).then(()=>{
    console.log('mongodb connected');
    
})


server.listen().then((res) => {
    console.log(`server is listening at ${res.url}... !!`);  
})