import { useEffect, useState } from "react";
import socket from "../socket";
import Message from "./Message";

export default function Chat() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("messageHistory", (data) => {
      setMessages(data);
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off();
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        username,
        message,
        time: new Date().toLocaleTimeString(),
      });
      setMessage("");
    }
  };

  if (!joined) {
    return (
      <div className="login">
        <h2>Welcome to Chat</h2>
        <input
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => username && setJoined(true)}>
          Join Chat
        </button>
      </div>
    );
  }

  return (
    <div className="chat-box">
      <h2>Real-Time Chat</h2>

      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} self={msg.username === username} />
        ))}
      </div>

      <div className="input-area">
        <input
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
