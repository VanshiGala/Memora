"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/"; // hide only on welcome page
  const [open, setOpen] = useState(false);

  return (
    <div className={`transition-all duration-300 ${open ? "ml-40" : "ml-0"}`}>
      {!hideNavbar && <Navbar open={open} setOpen={setOpen} />}
      {children}
    </div>
  );
}
