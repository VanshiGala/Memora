//wraps entire appln to provide NextAuth session context to all child components

"use client";

import { SessionProvider } from "next-auth/react"; //manages authentication state
import { Session } from "next-auth";

export default function Providers({
  children, //appln component that need access to auth state
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}