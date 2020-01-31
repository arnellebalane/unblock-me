import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const div = document.createElement('div');
div.id = 'unblockme-root';
document.body.appendChild(div);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log(request);
  });

chrome.runtime.sendMessage({action: "init"}, function(response) {
  console.log(response);
});

ReactDOM.render(
  <App />,
  div
);
