import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import AppShell from "./AppShell";
import Providers from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Adjust path

export const metadata: Metadata = {
  title: "Memora",
  description: "Your personal digital vault",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body suppressHydrationWarning>
      <main>
        <Providers session={session}>
        <AppShell>
        {children}
        </AppShell>
        </Providers>
      </main>
      </body>
    </html>
  );
}
