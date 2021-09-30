import { gql } from "apollo-server";

export const typeDefs = gql`

    type Post {
        _id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }

    type Comment {
        _id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type Like {
        _id: ID!
        username: String!
        createdAt: String!
    }
    

    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type User {
        _id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    type Query{
        getPosts: [Post]
        getPost(postId: ID!): Post
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!):User!
        createPost(body: String!): Post!
        deletePost(postId: ID!,commentId: ID!): Post!
        likePost(postId: ID!): Post!
        createComment(postId: ID!, body: String): Post!
        deleteComment(postId: ID!, commentId: ID! ): Post!
    }
`

