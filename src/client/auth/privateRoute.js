import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const {isAuthenticated} = useAuth0();
    return <Route {...rest} render={(props) => (
        isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />}

export default PrivateRoute;