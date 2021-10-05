import { ApolloServer } from "apollo-server";
import { connect } from "mongoose";
import * as dotenv from "dotenv";

import { typeDefs } from "./graphql/typeDefs"
import indexResolver from "./graphql/resolvers/index"

dotenv.config();


const server = new ApolloServer({
    typeDefs,
    resolvers: indexResolver,
    context: ({req}) => ({req}),
});

const mongodbConnectURL = process.env.MONGODB as string;
connect(mongodbConnectURL).then(() => {
    console.log('mongodb connected');
});

server.listen().then((res) => {
    console.log(`server is listening at ${res.url}...!`);
});