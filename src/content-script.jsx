import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const div = document.createElement('div');
div.id = 'unblockme-root';
document.body.appendChild(div);

ReactDOM.render(
  <App />,
  div
);
