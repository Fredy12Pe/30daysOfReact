import React, { createContext, useState, useContext } from "react";

const ChatContext = createContext();

// Fix the API URL construction
const API_URL = "http://localhost:3000/api/chat"; // Direct URL instead of using env variable

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (messageText) => {
    try {
      setIsLoading(true);
      console.log("Sending to:", API_URL); // Debug log

      // Add user message immediately
      const userMessage = {
        id: Date.now(),
        text: messageText,
        sender: "user",
      };
      setMessages((prev) => [...prev, userMessage]);

      // Use the environment variable URL
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        text: data.message,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, there was an error processing your message.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export default ChatContext;
