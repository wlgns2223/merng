import React from "react";
import moment from "moment";

import { Card, Image,Button, Icon, Label } from "semantic-ui-react";
import {Link} from "react-router-dom";

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
        
    const onLikePost = () => {console.log("Like Post");}

    const onCommentPost = () => { console.log("Comment on Post");}
    

    return (
        <Card fluid>
            <Card.Content>
                <Image floated="right" size="mini" src="../images/profile.jpg" />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${_id}`}>{moment(parseInt(createdAt!)).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as="div" labelPosition="right" onClick={onLikePost}>
                    <Button color="teal" basic>
                        <Icon name="heart"/>
                    </Button>
                    <Label basic color="teal" pointing="left">
                        {likeCount}
                    </Label>
                </Button>
                <Button as="div" labelPosition="left" onClick={onCommentPost}>
                    <Button color="blue" basic>
                        <Icon name="comments"/>
                    </Button>
                    <Label basic color="blue" pointing="left">
                        {commentCount }
                    </Label>
                </Button>
            </Card.Content>
            
        </Card>       
    )
}

export default PostCard;