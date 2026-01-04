"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Folder } from "./AppShell";

export default function ClientLayout({
  children,
  folders,
}: {
  children: React.ReactNode;
  folders: Folder[];
}) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/" || pathname == "/signup" || pathname == "/login";
  const [open, setOpen] = useState(false);

  return (
    <div className={`transition-all duration-300 ${open ? "ml-40" : "ml-0"}`}>
      {!hideNavbar && (
        <Navbar open={open} setOpen={setOpen} folders={folders} />
      )}
      {children}
    </div>
  );
}

//ClientLayout -> manages "how the app behaves"