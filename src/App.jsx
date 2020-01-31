import React from 'react';

export default function App() {
  return (
    <>
      <form>
        <textarea></textarea>
        <label>
          <input type="checkbox"/>
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
