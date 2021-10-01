import React from "react";

interface LoginProps {
    children? : React.ReactNode
}

const Login: React.FC<LoginProps> = ({children}) => {

    return (
        <div>
            <h1> Login </h1>
        </div>
    );
}
export default Login;
