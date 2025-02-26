import React from "react";
import { useChat } from "../context/ChatContext";

function ChatWindow() {
  const { messages, isLoading } = useChat();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.sender === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-200 text-black rounded-lg p-3">
            AI is typing...
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
