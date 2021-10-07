import React ,{ useContext, useRef, useState }from "react";
import { RouteComponentProps } from "react-router-dom"
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks"
import moment from "moment";
import LikeButton from "./LinkButton";
import MyPopup from "../utils/myPopup";
import { AuthContext } from "../context/auth";
import {
  Button,
  Card,
  Grid,
  Image,
  Icon,
  Label,
  Form
} from "semantic-ui-react";
import DeleteButton from "./DeleteButton";

const SinglePost:React.FC<RouteComponentProps> = (props) => {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef<HTMLInputElement>(null);
    const [comment, setComment ] = useState('');

    const [ onSubmitComment ] = useMutation(SUBMIT_COMMENT_MUTATION,{
      variables: {
        postId,
        body: comment
      },
      update: (cache,result)=>{
        setComment('');
        commentInputRef.current!.blur();
      }
    })
    
    const { data: {getPost: post} = {} } = useQuery(FETCH_POST_QUERY,{
      variables: { postId },
    });

    if(!post) return <p>loading...</p>

    const { _id,
            body,
            createdAt,
            username,
            likes,
            likeCount,
            comments,
            commentCount,
          } = post;
    
    
    return (
    <Grid>
      <Grid.Column width={2}>
        <Image 
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          szie="small"
          float="right"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card fluid>
          <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>{moment(parseInt(createdAt)).fromNow()}</Card.Meta>
            <Card.Description>{body}</Card.Description>
          </Card.Content>
          <hr/>
          <Card.Content>
            <LikeButton user={user} post={{_id,likes,likeCount}}/>
            <MyPopup content="Comment on Post">
              <Button
                as="div"
                labelPosition="right"
                onClick={()=> console.log('Comment on Post')}
              >
                <Button basic color="blue">
                  <Icon name="comment" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
            </MyPopup>
            {
                  user && user.username === username && (
                      <DeleteButton postId={_id}  />
                  )}
            
          </Card.Content>
        </Card>
        {
          user && (
            <Card fluid>
              <Card.Content>
                <p>Post A Comment</p>
                <Form>
                  <div className="ui action input fluid">
                    <input 
                      type="text"
                      placeholder="Comment..."
                      name="comment"
                      value={comment}
                      onChange={(event)=>setComment(event.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type="submit"
                      className="ui button teal"
                      disabled={comment.trim() === ''}
                      onClick={()=> onSubmitComment()}
                    >
                      submit
                    </button>

                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {
            comments.map((comment) => (
              <Card fluid key={comment._id}>
                <Card.Content>
                  {
                  user && user.username === comment.username && (
                      <DeleteButton postId={_id} commentId={comment._id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(parseInt(comment.createdAt)).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))
          }
      </Grid.Column>
    </Grid>);
}

const FETCH_POST_QUERY = gql`

  query($postId: ID!){
    getPost(postId: $postId){
      _id
      body
      createdAt
      username
      likeCount
      likes{
        username
      }
      commentCount
      comments{
        _id
        username
        createdAt
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!,$body: String! ){
    createComment(postId: $postId, body: $body){
      _id
      comments {
        _id
        body
        createdAt
        username
      }
      commentCount
    }
  }

`

export default SinglePost;