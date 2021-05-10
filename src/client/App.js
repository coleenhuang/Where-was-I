import axios from 'axios';
import React, { useState } from 'react';
import './app.css';
import Nav from './nav';
import Chart from './chart/Chart';
import Public from './Public';
import Protected from './Protected';
import { Switch } from 'react-router-dom';
import Home from './home';
import PrivateRoute from './auth/privateRoute';


import { Route, Link } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <Nav />
      <div>
        
        <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/chart" component={Chart} />
        </Switch>
      </div>
    </div>
  )
}






export default App;