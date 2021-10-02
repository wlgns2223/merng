import React,{useState} from "react";
import { Form,Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import "../scss/components/_Register.scss"

interface RegisterProps {}
interface IInputError {
    username?: string
    password?: string
    confirmPassword?: string
    email?: string
}

const Register: React.FC<RegisterProps> = (props) => {
    const initialInput = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    };
    const [errors, setErrors] = useState<IInputError>(initialInput);
    const [ values,setValues ] = useState(initialInput);
    const onChange = (event) => {
        setValues({
            ...values,
            [event.target.name] : event.target.value
        });        
    }

    const res = useMutation(REGISTER_USER_MUTATION,
                            {
                                update(proxy,result){
                                    console.log(result);
                                },
                                onError(error){
                                    const errors = error.graphQLErrors[0].extensions!.errors;
                                    setErrors(errors);                                    
                                },
                                variables: values
                            });

    const [addUser , {loading}] = res;    
    
    
    const onSubmit = (event) => {
        event.preventDefault();
        setValues(initialInput);        
        addUser();
    }

    return (
        <div className="register-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : 'register'} >
                <div className="register__title">
                    <h2>Register</h2>
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
                <Form.Input
                    label="Confirm Password"
                    placeholder ="Confirm Password..."
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                    error={errors.confirmPassword ? true : false}
                />
                <Form.Input
                    label="E-Mail"
                    placeholder ="E-Mail..."
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    error={errors.email ? true : false}
                />
                <Button type="submit" color="blue" onClick={onSubmit} >Register</Button>
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

const REGISTER_USER_MUTATION = gql`
    mutation register(
        $username: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
    ) {
        register(
            registerInput: {
                username: $username
                password: $password
                confirmPassword: $confirmPassword
                email: $email

            }
        ) {
            _id, username, createdAt, token
        }
    }
`

export default Register;