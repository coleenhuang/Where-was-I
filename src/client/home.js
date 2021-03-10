import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";


//Landing page for login
//Redirect to here when attempting to access
// a protected route when not logged in

export default () => {
    
    return (
        <div>
            <h2>Where was I?</h2>
            <h3>A bible reading tracker that helps you keep track of what you've read and reach your bible reading goals.</h3>
        </div>
    )
}
