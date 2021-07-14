import "./App.css";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

// no dot env
const socket = io.connect("http://localhost:5000");
const userName = nanoid(4);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <h2>USER : {userName}</h2>
      <header className="App-header">
        <h1>Chatty App</h1>
        {
          chat.map((payload, index) => (
            <p key={index}><span className={payload.userName===userName?"sender":"receiver"}>{payload.userName}</span> : {payload.message}</p>
          )
          )}
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="Type message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
