import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { buildSchema } from "type-graphql";
import { RegisterResolver } from "./modules/user/register";
import { LoginResolver } from "./modules/user/login";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cors from "cors";

const connectMongoDB = () => {
  const mongodbConnectURL = process.env.MONGODB as string;
  connect(mongodbConnectURL).then(() => {
    console.log("mongodb connected");
  });
};

const main = async () => {
  dotenv.config();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
  });
  const app = Express();
  await apolloServer.start();
  const redis = new Redis();
  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: "qid",
      secret: "asdfasdf",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    })
  );

  apolloServer.applyMiddleware({ app });

  connectMongoDB();
  app.listen(4000, () => {
    console.log(`Server is running at ...!!`);
  });
};

main();
