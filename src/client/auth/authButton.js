import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
      isAuthenticated?
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button> :
    <button onClick={() => loginWithRedirect()}>
      Register / Log In
    </button>
  );
};

