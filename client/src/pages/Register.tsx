import React from "react";

interface RegisterProps {
    children? : React.ReactNode
}

const Register: React.FC<RegisterProps> = ({children}) => {

    return (
        <div>
            <h1> Register </h1>
        </div>
    );
}

export default Register;