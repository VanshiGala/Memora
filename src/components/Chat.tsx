"use client";

import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";

/** Message shape */
interface ChatMessage {
  text: string;
  user: string;
  time: string;
}

/** Props */
interface ChatProps {
  username: string;
}

export default function Chat({ username }: ChatProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    let activeSocket: Socket;

    async function initSocket() {
      activeSocket = await getSocket();
      setSocket(activeSocket);

      activeSocket.on("receive-message", (msg: ChatMessage) => {
        setMessages((prev) => [...prev, msg]);
      });
    }

    initSocket();

    return () => {
      activeSocket?.disconnect();
    };
  }, []);

  const sendMessage = (): void => {
    if (!message.trim() || !socket) return;

    const msg: ChatMessage = {
      text: message,
      user: username,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send-message", msg);
    setMessages((prev) => [...prev, msg]);
    setMessage("");
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded">
      <div className="h-64 overflow-y-auto mb-3 border p-2">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.user}</strong>: {msg.text}
            <div className="text-xs text-gray-500">{msg.time}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
