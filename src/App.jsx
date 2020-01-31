import React, {useState} from 'react';

export default function App() {
  const [message, setMessage] = useState('');
  const [requireAll, setRequireAll] = useState(false);

  const handleSubmit = event => {
    const data = {
      "team": "symph",
      requireAll,
      message,
      "creator": "arnel",
      "receivers": {
          "albert": true,
          "nicole": false,
      },
      "resolved": false,
      "hidden": false,
      "createdDate": new Date(),
      "updateDate": new Date(),
  };
    chrome.runtime.sendMessage({action: "submit", data}, function(response) {
      console.log(response);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea value={message} onChange={e => setMessage(e.target.value)}></textarea>
        <label>
          <input type="checkbox" checked={requireAll} onChange={e => setRequireAll(e.target.checked)} />
          Require everyone?
        </label>
        <button>Unblock me!</button>
      </form>

      <ul>
        <li>
          <input type="checkbox"/>
          <p>albert: @arnelle do this</p>
          <button>x</button>
        </li>
        <li>
          <input type="checkbox"/>
          <p>albert: @arnelle do this</p>
          <button>x</button>
        </li>
      </ul>
    </>
  );
}
