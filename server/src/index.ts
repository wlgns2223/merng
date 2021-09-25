import { ApolloServer,gql } from "apollo-server";

const typeDefs = gql`
    type Query{
        sayHi: String!
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

server.listen().then((res) => {
    console.log(`server is listening at ${res.url}... !!`);  
})