import axios from 'axios';
import React, { useState } from 'react';
import './app.css';
import Chart from './chart/Chart';
import LoginButton from './loginButton';
import LogoutButton from './logoutButton';
import Profile from './profile';

const App = () => {
  return (
    <div>
      <LoginButton />
      <LogoutButton />
      <h1>Where was I?</h1>
      <Chart />
      <Profile />
    </div>
  )
}






export default App;