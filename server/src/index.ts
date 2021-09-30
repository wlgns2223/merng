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
        req.headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTNmYWZiMmY0NTZkNmQzZmUxMGFiMyIsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2MzI4OTQ2MTd9.MlstUBiUfpwJ3XVLY9sSp4uUKBAvRlSgoAykAMXmp_8"

        return { req };
    },
});

const mongodbConnectURL = process.env.MONGODB as string;
connect(mongodbConnectURL).then(() => {
    console.log('mongodb connected');

})

server.listen().then((res) => {
    console.log(`server is listening at ${res.url}...!`);
})