import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { IUser } from "../types/User";
import IPost from "../types/Post"
import { Button, Label, Icon } from "semantic-ui-react";
import MyPopup from "../utils/myPopup";


interface ILikeButtonProp {
    user : IUser
    post: IPost
}

const LikeButton: React.FC<ILikeButtonProp> = ({user, post}) => {
    const [ liked ,setLiked ] = useState(false);
    useEffect(()=>{
      
      if(user && post.likes){  
        const isMyLike = post.likes.find((like) => like.username === user.username);        
        if(isMyLike) setLiked(true)
        else setLiked(false);
      }

    },[user,post]);

    const [ onLikePost ] = useMutation(LIKE_POST_MUTATION,{
      variables: { postId: post._id },
    });

    const likeButtonOnLikedStatus = liked ? (
      <Button color="teal">
        <Icon name="heart"/>
      </Button>
    ): (
      <Button color="teal" basic>
        <Icon name="heart"/>
      </Button>
    );

    const buttonToLogin = (
      <Button as={Link} to="/login" color="teal" basic>
        <Icon name="heart"/>
      </Button>
    );

    const likeButton = user ? likeButtonOnLikedStatus : buttonToLogin;

    return (
      <Button as="div"  labelPosition="right" onClick={() => {onLikePost()}}>
        <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup>
        <Label basic color="teal" pointing="left">
          {post.likeCount}
        </Label>
      </Button>
    );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!){
    likePost(postId: $postId){
      _id
      likes {
        _id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;