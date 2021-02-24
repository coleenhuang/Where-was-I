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
    domain='dev-8nc46zea.us.auth0.com'
    clientId='8B7zEoiux7zKa3195rIE6LpmgtYnsGla'
    redirectUri={window.location.origin}
    >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </ Root>, document.querySelector('#root')
)