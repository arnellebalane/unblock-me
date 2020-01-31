import React, {useState, useEffect} from 'react';

export default function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [hasUser, setHasUser] = useState(Boolean(currentUser));

  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [requireAll, setRequireAll] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        setTasks(request);
      });
    chrome.runtime.sendMessage({action: "init"});

    chrome.storage.sync.get(['currentUser'], function(result) {
      setCurrentUser(result.currentUser || '');
      setHasUser(Boolean(result.currentUser));
    });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    const mentions = message.match(/@\S+/g);
    const receivers = mentions
      ? mentions.map(username => username.substring(1)).reduce((obj, name) => ({...obj, [name]: false}), {})
      : {};

    const data = {
      "team": "symph",
      requireAll,
      message,
      receivers,
      "creator": currentUser,
      "resolved": false,
      "hidden": false,
      "createdDate": new Date(),
      "updateDate": new Date(),
    };
    chrome.runtime.sendMessage({action: "submit", data});
  };
  const resolveTask = task => {
    chrome.runtime.sendMessage({action: "resolve", data: { task: task.id, user: currentUser }});
  };
  const hideTask = task => {
    chrome.runtime.sendMessage({action: 'hide', data: { task: task.id }});
  };
  const handleCurrentUser = () => {
    chrome.storage.sync.set({currentUser}, function() {
      setHasUser(Boolean(currentUser));
    });
  };

  const currentUserForm = (
    <form onSubmit={handleCurrentUser}>
      <input type="text" value={currentUser} onChange={e => setCurrentUser(e.target.value)} />
      <button>Set</button>
    </form>
  );

  const messageForm = (
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
        {tasks.map(task => (
          <li key={task.id}>
            <input type="checkbox" checked={task.receivers[currentUser]} onChange={() => resolveTask(task)} />
            <p>{task.creator}: {task.message}</p>
            <button onClick={() => hideTask(task)}>x</button>
          </li>
        ))}
      </ul>
    </>
  );



  return (
    <>
      {hasUser ? messageForm : currentUserForm}
    </>
  );
}
