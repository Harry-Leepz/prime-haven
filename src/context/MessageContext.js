"use client";

import { useContext, createContext, useState } from "react";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  return (
    <MessageContext.Provider
      value={{ unreadMessageCount, setUnreadMessageCount }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessageContext() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
}
