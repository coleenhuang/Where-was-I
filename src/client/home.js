import React from 'react';
import LoginButton from './auth/loginButton';


//Landing page for login
//Redirect to here when attempting to access
// a protected route when not logged in

export default () => {
    return (
        <div>
            <h3>Home</h3>
            <LoginButton />
        </div>
    )
}
