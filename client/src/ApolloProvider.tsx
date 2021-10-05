import { ApolloClient,
         InMemoryCache, 
         createHttpLink, 
         ApolloProvider, 
         ApolloLink,
         from }from "@apollo/client";
import React from "react";
import App from "./App";
import { JWT_TOKEN } from "./globalVar";

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({headers ={} }) => ({
        headers: {
            ...headers,
            authorization: localStorage.getItem(JWT_TOKEN) || null,
        }
    }));

    return forward(operation);
});

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

const client = new ApolloClient({
    link: from([authLink,httpLink] ) ,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

const AppWithApolloClient: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    )
}

export default AppWithApolloClient;

