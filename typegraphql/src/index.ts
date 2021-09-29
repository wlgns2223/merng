import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import * as dotenv from "dotenv"
import { connect } from "mongoose";

import { buildSchema } from "type-graphql";
import { RegisterResolver } from "./modules/user/register";


const connectMongoDB = () => {
    const mongodbConnectURL = process.env.MONGODB as string;
    connect(mongodbConnectURL).then(()=>{
    console.log('mongodb connected');
    });
}

const main = async () => {
    dotenv.config();

    const schema = await buildSchema({
        resolvers: [RegisterResolver],
    });

    const apolloServer = new ApolloServer({schema});
    const app = Express();
    await apolloServer.start();

    apolloServer.applyMiddleware({app});

    connectMongoDB();
    app.listen(4000,()=>{
        console.log(`Server is running at ...!!`);
    });
}

main();