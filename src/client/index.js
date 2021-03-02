import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import App from './App';
import { Router } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./history";

const onRedirectCallback = (appState) => {
  // Use the router's history module to replace the url
  history.replace(appState?.returnTo || window.location.pathname);
};

ReactDOM.render(
  <Root>
    <Auth0Provider
    domain='dev-8nc46zea.us.auth0.com'
    clientId='8B7zEoiux7zKa3195rIE6LpmgtYnsGla'
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    >
      <Router history={history}>
        <App />
      </Router>
    </Auth0Provider>
    
  </ Root>, document.querySelector('#root')
)