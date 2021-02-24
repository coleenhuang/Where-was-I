import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Root>
    <BrowserRouter>
    <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    redirectUri={window.location.origin}
    audience={process.env.REACT_APP_AUDIENCE}
    scope="read:current_user update:current_user_metadata"
    >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </ Root>, document.querySelector('#root')
)