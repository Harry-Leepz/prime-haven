"use client";

import { SessionProvider } from "next-auth/react";

// https://next-auth.js.org/getting-started/example

export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
