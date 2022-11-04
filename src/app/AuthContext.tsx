"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import React from "react";

interface AuthContextProps {
  children: ReactNode;
}

export function AuthContext({ children }: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
