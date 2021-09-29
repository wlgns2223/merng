import "reflect-metadata";
import {ObjectType,Field,ID} from "type-graphql";

// type User {
//     id: ID!
//     email: String!
//     token: String!
//     username: String!
//     createdAt: String!
// }

@ObjectType()
export class User {

    @Field(()=>ID)
    id: string;

    @Field()
    email: string;

    @Field()
    token: string

    @Field()
    username: string;

    @Field()
    createdAt: string;

}