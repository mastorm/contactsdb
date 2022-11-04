"use client";

import { useSession } from "next-auth/react";
import React from "react";

export function Greetings() {
  const session = useSession();
  return <>{session.status}</>;
}
