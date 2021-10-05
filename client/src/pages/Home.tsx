import React,{ useContext } from "react";

import "../scss/components/_Home.scss";

import { useQuery } from "@apollo/react-hooks"
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm"
import { FETCH_POSTS_QUERY } from "../utils/graphqlQuery";


const Home: React.FC = (props) => {
    const {loading, data: {getPosts: posts} = {} } = useQuery(FETCH_POSTS_QUERY);
    const { user } = useContext(AuthContext);
        
    return (
        <Grid columns={3}>
            <Grid.Row className="GridTitle">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row >
                {
                    user && (
                        <Grid.Column>
                            <PostForm/>
                        </Grid.Column>
                    )
                }
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

export default Home;