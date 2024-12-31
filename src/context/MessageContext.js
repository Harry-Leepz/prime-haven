"use client";

import { useContext, createContext, useState, useEffect } from "react";

import { useSession } from "next-auth/react";

import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount(session.userId).then((count) => {
        console.log("count", count);
        setUnreadMessageCount(count);
      });
    }
  }, [session]);

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
