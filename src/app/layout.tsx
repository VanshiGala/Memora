import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import AppShell from "./AppShell";

export const metadata: Metadata = {
  title: "Memora",
  description: "Your personal digital vault",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
      <main>
        <AppShell>
        {children}
        </AppShell>
      </main>
      </body>
    </html>
  );
}
