"use client";

import { useEffect, useRef, useState } from "react";
import { getSocket } from "@/lib/socket";
import type { Socket } from "socket.io-client";
import { Send } from "lucide-react";

interface GroupChatProps {
  groupId: string;
  userId: string;
  username: string;
}

interface Message {
  _id?: string;
  text: string;
  username: string;
  time: string;
}

export default function GroupChat({
  groupId,
  userId,
  username,
}: GroupChatProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let s: Socket;

    async function init() {
      const res = await fetch(`/api/groups/${groupId}/chat`);
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);

      s = await getSocket();
      setSocket(s);

      s.emit("join-group", groupId);

      // s.on("receive-group-message", (msg: Message) => {
      //   setMessages((prev) => [...prev, msg]);
      // });
      s.on("receive-group-message", (msg: Message) => {
  setMessages((prev) => {
    // prevent duplicate _id insertion
    if (msg._id && prev.some((m) => m._id === msg._id)) {
      return prev;
    }
    return [...prev, msg];
  });
});

    }

    init();

    return () => {
      s?.off("receive-group-message");
    };
  }, [groupId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim() || !socket) return;

    socket.emit("send-group-message", {
      groupId,
      text: message,
      userId,
      username,
    });

    setMessage("");
  };

  return (
    <div className="flex flex-col h-full bg-transparent text-white">
      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-zinc-700">
        {messages.map((msg, i) => {
          const isMe = msg.username === username;

          return (
            <div
              key={`${msg._id}-${msg.time}`}

              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm
                  ${
                    isMe
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
                      : "bg-zinc-800 text-zinc-200"
                  }`}
              >
                {!isMe && (
                  <p className="text-xs text-zinc-400 mb-1">
                    {msg.username}
                  </p>
                )}
                <p>{msg.text}</p>
                <p className="text-[10px] mt-1 text-zinc-400 text-right">
                  {msg.time}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="border-t border-zinc-800 p-3 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share a memory..."
          className="flex-1 bg-zinc-900 border border-zinc-800
            rounded-xl px-4 py-2 text-sm text-white
            placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-600"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-br from-purple-600 to-indigo-600
            p-2 rounded-xl hover:opacity-90 transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
