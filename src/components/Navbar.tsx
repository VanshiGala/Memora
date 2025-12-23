"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import SearchForm from "./SearchForm";
import { Folder } from "@/app/AppShell";
import Image from "next/image";
import icon from "../../public/icon.jpg"

export default function Navbar({
  open,
  setOpen,
  folders,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  folders: Folder[];
}) {
  return (
    <>
      <nav className="relative flex items-center h-16 px-4 bg-white shadow-md gap-2">
        <button onClick={() => setOpen(true)} className="">
          <Menu size={24} className="cursor-pointer"/>
        </button>
        <Image src={icon} alt="icon" width={50} height={50}/>
        <h3 className="text-2xl font-bold">Memora</h3>

        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-full max-w-md">
          <SearchForm />
        </div>
      </nav>

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
          <X size={24} className="cursor-pointer"/>
        </button>

        <ul className="flex flex-col gap-4 text-lg font-medium">
          <Link href="/gallery" onClick={() => setOpen(false)}>
            Gallery
          </Link>

          <div>
            <Link href="/album" className="text-lg font-medium">Albums</Link>
            <ul className="ml-2 mt-2 flex flex-col gap-2 text-sm">
              {folders.map((folder) => (
                <Link
                  key={folder.path}
                  href={`/album/${folder.path}`}
                  onClick={() => setOpen(false)}
                >
                  {folder.name}
                </Link>
              ))}
            </ul>
          </div>

          <Link href="/favourites" onClick={() => setOpen(false)}>
            Favourite
          </Link>
        </ul>
      </aside>
    </>
  );
}