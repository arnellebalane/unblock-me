import React from 'react';
import ReactDOM from 'react-dom';

const div = document.createElement('div');
div.id = 'unblockme-root';
document.body.appendChild(div);

ReactDOM.render(
  <h1>Hello World</h1>,
  div
);
