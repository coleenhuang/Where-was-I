import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

//Landing page for login
//Redirect to here when attempting to access
// a protected route when not logged in

export default () => {
    
    return (
        <div>
            <h2>"Your word is a lamp to my feet and a light to my path."</h2>
            <Link to="/chart">Reading Plan</Link>
        </div>
    )
}
