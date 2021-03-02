import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";


//Landing page for login
//Redirect to here when attempting to access
// a protected route when not logged in

export default () => {
    const {isAuthenticated} = useAuth0();
    
    return (
        <div>
            <h3>Home</h3>
        </div>
    )
}
