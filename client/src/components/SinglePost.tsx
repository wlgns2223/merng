import React from "react";
import { RouteComponentProps } from "react-router-dom"
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks"

const SinglePost:React.FC<RouteComponentProps> = (props) => {
    const postId = props.match.params.postid;

    const { data : { getPost }} = useQuery(FETCH_POST_QUERY,{
      variables: { postId },
    });




    return null;
}

const FETCH_POST_QUERY = gql`

  query($postId: ID!){
    getPost(postId: $postId){
      id
      body
      createdAt
      username
      likeCount
      likes{
        username
      }
      commentCount
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;