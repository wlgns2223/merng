import "reflect-metadata";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";

import session from "express-session";

import { RegisterResolver } from "./modules/user/register";
import { LoginResolver } from "./modules/user/login";
import { MeResolver } from "./modules/user/me";
import { MyContext } from "./types/types";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import redisSingletone from "./utils/redis";

const connectMongoDB = () => {
  const mongodbConnectURL = process.env.MONGODB as string;
  connect(mongodbConnectURL).then(() => {
    console.log("mongodb connected");
  });
};

const main = async () => {
  dotenv.config();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }): MyContext => ({ req }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  const app = Express();
  const RedisStore = connectRedis(session);
  await apolloServer.start();

  app.use(
    session({
      store: new RedisStore({
        client: redisSingletone as any,
      }),
      name: "qid",
      secret: "asdfasdf",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
        sameSite: "strict",
      },
    })
  );

  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "http://localhost:3000",
    },
  });

  connectMongoDB();
  app.listen(5000, () => {
    console.log(`Server is running at 5000...!!`);
  });
};

main();
