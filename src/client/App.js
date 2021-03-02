import axios from 'axios';
import React, { useState } from 'react';
import './app.css';
import Nav from './nav';
import Chart from './chart/Chart';
import Public from './Public';
import Protected from './Protected';
import Login from './auth/Login';
import Home from './home';
import PrivateRoute from './auth/privateRoute';


import { Route, Link } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <Nav />
      <div>
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
        <Route exact path="/" component={Home} />
        <Route path="/public" component={Public}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    </div>
  )
}






export default App;