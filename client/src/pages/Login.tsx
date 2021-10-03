import React,{useState,useContext} from "react";
import { Form,Button } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import useForm from "../utils/hooks/useForm";
import gql from "graphql-tag";

import "../scss/components/_Register.scss"

interface RegisterProps {}
interface ILoginInput {
    username?: string
    password?: string
}

const Login: React.FC<RegisterProps> = (props) => {
    const initialInput = {
        username: '',
        password: '',
    };
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState<ILoginInput>(initialInput);
    const [ values, onChange, onSubmit ] = useForm(loginUserCallback,initialInput);
       
    const history = useHistory();    
    const [ loginUser, { loading } ] = useMutation(LOGIN_USER_MUTATION,
                            {
                                update: (_,result)=>{
                                    const { data: {login: userData}} = result;                                    
                                    context.login(userData);
                                    history.push('/');                                    
                                },
                                onError: (error)=>{
                                    const errors = error.graphQLErrors[0].extensions!.errors;
                                    setErrors(errors);                                    
                                },
                                variables: values
                            });

    // Hoisting for adduser callback to useForm
    function loginUserCallback() {
        loginUser();
    }
    
    return (
        <div className="register-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : 'register'} >
                <div className="register__title">
                    <h2>Log In</h2>
                </div>
                <Form.Input
                    label="Username"
                    placeholder ="Username..."
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    error={errors.username ? true : false}
                />
                <Form.Input
                    label="Password"
                    placeholder ="Password..."
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    error={errors.password ? true : false}
                />
                
                <Button type="submit" color="blue" onClick={onSubmit} >Log in</Button>
            </Form>
            {
                Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul>
                    {
                    Object.keys(errors).map((value) => (
                        <li key={value}>{value}</li>
                    ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const LOGIN_USER_MUTATION = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
            
        ) {
            _id, username, createdAt, token, email
        }
    }
`

export default Login;