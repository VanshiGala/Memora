import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

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
        <ClientLayout>
        {children}
        </ClientLayout>
      </main>
      </body>
    </html>
  );
}
