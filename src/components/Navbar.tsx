"use client";

import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import SearchForm from "./SearchForm";
import { Folder } from "@/app/AppShell";
import Image from "next/image";
import icon from "../../public/icon.jpg";
import { useSession, signOut } from "next-auth/react";

export default function Navbar({
  open,
  setOpen,
  folders,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  folders: Folder[];
}) {
  const { data: session } = useSession();

  return (
    <>
      <nav className="relative flex items-center justify-between h-16 px-4 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={() => setOpen(true)}>
            <Menu size={24} className="cursor-pointer" />
          </button>
          <Link href="/" className="flex items-center gap-3">
            <Image src={icon} alt="icon" width={40} height={40} className="rounded" />
            <h3 className="text-2xl font-bold">Memora</h3>
          </Link>
        </div>

        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-full max-w-md">
          <SearchForm />
        </div>

        {/* Right side: User info or nothing */}
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">
                Hello, {session.user?.name || "User"}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <LogOut size={20} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : null}
        </div>
      </nav>

      {/* Sidebar overlay and aside remain the same */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-24"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-20 md:w-56 bg-white shadow-xl z-64 p-6 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={() => setOpen(false)} className="mb-6">
          <X size={24} className="cursor-pointer" />
        </button>

        <ul className="flex flex-col gap-4 text-lg font-medium">
          <li>
            <Link href="/gallery" onClick={() => setOpen(false)}>
              Gallery
            </Link>
          </li>

          <li>
            <div>
              <Link href="/album" className="text-lg font-medium">
                Albums
              </Link>
              <ul className="ml-4 mt-2 flex flex-col gap-2 text-sm text-gray-600">
                {folders.map((folder) => (
                  <li key={folder.path}>
                    <Link
                      href={`/album/${folder.path}`}
                      onClick={() => setOpen(false)}
                    >
                      {folder.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li>
            <Link href="/favourites" onClick={() => setOpen(false)}>
              Favourites
            </Link>
          </li>

          {session && (
            <li className="mt-8 pt-4 border-t">
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setOpen(false);
                }}
                className="text-red-600 flex items-center gap-2"
              >
                <LogOut size={20} />
                Logout
              </button>
            </li>
          )}
        </ul>
      </aside>
    </>
  );
}