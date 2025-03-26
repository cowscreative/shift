// src/Components/ChatDrawer.jsx
import { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import "../styles/ChatDrawer.css";

function ChatDrawer({ user, messages, onClose }) {
    const drawerRef = useRef();
    const [typing, setTyping] = useState(false);
  
    // Safeguard if props aren't ready
    if (!user || !messages) return null;
  
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }, []);
  
    useEffect(() => {
      drawerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages]);
  
    return (
      <div className="chat-drawer">
      <div className="chat-header">
        <div className="chat-user">
          <img src={user.avatar} alt={user.name} />
          <span>{user.name}</span>
        </div>
        <button onClick={onClose}><IoCloseOutline /></button>
      </div>

      <div className="chat-body">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-msg ${msg.sender === "user_morgan" ? "outgoing" : "incoming"}`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={drawerRef}></div>
      </div>

      <div className="chat-footer">
        <input type="text" placeholder="Type a message..." disabled />
        <button disabled>Send</button>
      </div>
    </div>
  );
}

export default ChatDrawer;
