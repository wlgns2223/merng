import React from "react";
import gql from "graphql-tag"

import "../scss/components/_Home.scss";

import {useQuery} from "@apollo/react-hooks"
import {Grid} from "semantic-ui-react";
import PostCard from "src/components/PostCard";


interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    const {loading, data: {getPosts: posts} = {} } = useQuery(FETCH_POSTS_QUERY);
        
    
    return (
        <Grid columns={3}>
            <Grid.Row className="GridTitle">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row >
                {loading 
                    ? ( <h2> Loading Posts... </h2> )
                    : posts.map((post) => {
                        const {body,
                               createdAt, 
                               username,
                               _id,
                               likeCount,
                               commentCount} = post;
                        return (
                            <Grid.Column className="GridColumn" key={_id}>
                                <PostCard _id={_id} 
                                          body={body} 
                                          createdAt={createdAt} 
                                          username={username}
                                          likeCount={likeCount}
                                          commentCount={commentCount}
                                />
                            </Grid.Column>
                        )
                    })
                }
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
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
`

export default Home;