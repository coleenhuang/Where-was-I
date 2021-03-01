import axios from 'axios';
import React, { useState } from 'react';
import './app.css';
import Chart from './chart/Chart';
import LoginButton from './loginButton';
import LogoutButton from './logoutButton';
import Public from './Public';
import Protected from './Protected';
import Login from './Login';
import PrivateRoute from './privateRoute';


import { Route, Link } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <LoginButton />
      <LogoutButton />
      <h1>Where was I?</h1>
      <div>
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>

        <Route path="/public" component={Public}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    </div>
  )
}






export default App;