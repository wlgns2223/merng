import React, { useState } from "react";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../utils/graphqlQuery';
import MyPopup from "../utils/myPopup";

interface IDeleteButtonProp {
    postId?: string
    commentId?: string
    callback?: any
}

const DeleteButton: React.FC<IDeleteButtonProp> = ({postId, commentId,callback}) => {
  const [confirmOpen, setconFirmOpen ] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [ deletePostOrCommentMutation ] = useMutation(mutation,{
    update: (cache, result) => {
      setconFirmOpen(false);
      if(!commentId){
        const data:any = cache.readQuery({
          query: FETCH_POSTS_QUERY
        });
        const newData = data.getPosts.filter((post) => post._id !== postId);
        cache.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            ...data,
            getPosts: newData,
          }
        });
      }
      if(callback) callback()
    },
    variables: {
      postId,
      commentId
    }
  });

  return (
    <>
    <MyPopup content={commentId ? "Delete Comment" : "Delete Post"}>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={()=>setconFirmOpen(true)}
      >
        <Icon name="trash" style={{margin: 0}} />
      </Button>
    </MyPopup>
    <Confirm
      open={confirmOpen}
      onCancel={()=>setconFirmOpen(false)}
      onConfirm={()=>deletePostOrCommentMutation()}
    />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation ($postId: ID!){
    deletePost(postId: $postId){
      _id
      comments {
        _id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $commentId:ID!){
    deleteComment(postId:$postId, commentId: $commentId){
      _id
      comments {
        _id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;