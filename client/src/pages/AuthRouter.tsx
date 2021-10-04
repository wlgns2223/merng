import {  useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

const AuthRoute = ({ component:Component, ...rest } ) => {
    const { user } = useContext(AuthContext);
    if(user) return <Redirect to="/"/>

    return (
        <Route 
            {...rest}
            render={(props) => <Component {...props} />}
        />
    );
}

export default AuthRoute;