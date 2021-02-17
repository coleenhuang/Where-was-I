import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ Root>, document.querySelector('#root')
)