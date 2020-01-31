import React, {useState, useEffect} from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [requireAll, setRequireAll] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        setTasks(request);
      });
    chrome.runtime.sendMessage({action: "init"});
  });

  const handleSubmit = event => {
    event.preventDefault();
    const receivers = message.split(/,\s*/g).reduce((obj, name) => ({...obj, [name]: false}), {});

    const data = {
      "team": "symph",
      requireAll,
      message,
      receivers,
      "creator": "arnel",
      "resolved": false,
      "hidden": false,
      "createdDate": new Date(),
      "updateDate": new Date(),
  };
  console.log(data);
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
        {tasks.map((task, i) => (
          <li key={i}>
            <input type="checkbox"/>
            <p>{task.creator}: {task.message}</p>
            <button>x</button>
          </li>
        ))}
      </ul>
    </>
  );
}
