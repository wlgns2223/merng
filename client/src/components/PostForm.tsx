import React from "react";
import { Form, Button } from "semantic-ui-react";
import useForm from "../utils/hooks/useForm";

import { useMutation } from "@apollo/client";
import { CREATE_POST_MUTATION,FETCH_POSTS_QUERY } from "../utils/graphqlQuery";

const PostForm:React.FC = () => {

    const [values, onChange, onSubmit] = useForm(createPostCallback, { body: '' });
    
    const [ createPost, { error } ] = useMutation(CREATE_POST_MUTATION,{
        variables: values,
        update: (cache, result ) => {
            const data:any = cache.readQuery({
                query: FETCH_POSTS_QUERY
            });
            
            cache.writeQuery({ 
                query: FETCH_POSTS_QUERY,
                data:{
                    ...data,
                    getPosts: [result.data.createPost, ...data.getPosts],
            }});
            values.body = ''   
        }
    });

    if(error) console.error(error);
    

    function createPostCallback(){
        createPost();
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a Post</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Hi World...!!!"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}

export default PostForm;