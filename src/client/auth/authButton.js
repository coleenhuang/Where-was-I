import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button'

export default () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
      isAuthenticated?
    <Button variant='contained' color='inherit' onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button> :
    <Button variant='contained' color='inherit' onClick={() => loginWithRedirect()}>
      Register / Log In
    </Button>
  );
};

