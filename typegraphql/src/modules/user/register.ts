import {Query, Resolver, Mutation } from "type-graphql";

@Resolver()
export class RegisterResolver {
    @Query(()=>String)
    async hello() {
        return "hello";
    }

    @Mutation(()=> String)
    async register() {
        return "World";
    }
}