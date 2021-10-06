import React,{ useContext } from "react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import { Card, Image,Button, Icon, Label } from "semantic-ui-react";
import {Link} from "react-router-dom";
import LikeButton from "../components/LinkButton";
import IPost from "../types/Post"

interface ILike {
    _id?: string
    username?: string
    createdAt?: string
}

interface IComment {
    _id?: string
    body?: string
    username?: string
    createdAt?: string
}

interface IPostCardProps {
    _id?: string
    body?: string
    createdAt?: string
    username?: string
    likeCount?: number
    commentCount?: number
    likes?: ILike[]
    comments?: IComment[]
}

const PostCard: React.FC<IPostCardProps> = ({_id,body,createdAt,username,likeCount,commentCount,likes,comments}) => {  

    const { user } = useContext(AuthContext);
    const isMyPost = user && user.username === username;
    
    const post = {
        _id ,
        likes,
        likeCount
    } as IPost
    
    return (
        <Card fluid>
            <Card.Content>
                <Image floated="right" size="mini" src="../images/profile.jpg" />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${_id}`}>{moment(parseInt(createdAt!)).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={post} />
                <Button labelPosition="right" as={Link} to={`/posts/${_id}`} >
                    <Button color="blue" basic>
                        <Icon name="comments"/>
                    </Button>
                    <Label basic color="blue" pointing="left">
                        {commentCount }
                    </Label>
                </Button>
                {
                    isMyPost && (
                        <Button as="div"
                                color="red"
                                onClick={() => {console.log('delete')}}
                                floated="right"
                        >
                            <Icon name="trash" style={{margin: 0}} />
                        </Button>
                    )
                }
            </Card.Content>
        </Card>       
    )
}

export default PostCard;