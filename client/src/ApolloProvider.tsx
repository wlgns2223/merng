import {ApolloClient,InMemoryCache,createHttpLink,ApolloProvider}from "@apollo/client";
import React from "react";
import App from "./App";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

interface ChildrenProps  {
    children?: React.ReactNode
}

const AppWithApolloClient: React.FC<ChildrenProps> = ({children}) => {
    return (
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    )
}

export default AppWithApolloClient;

