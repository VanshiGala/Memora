import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Navbar({ open, setOpen }: any) {
  return (
    <>
      <nav
        className={`relative flex items-center h-16 px-4 bg-white shadow-md gap-2`}
      >
        <button onClick={() => setOpen(true)} className="p-2 cursor-pointer">
          <Menu size={24} />
        </button>

        <h3 className="text-2xl font-bold">Memora</h3>

        <div className="absolute left-1/2 ml-6 transform -translate-x-1/2 w-full max-w-md">
          <div className="flex items-center border rounded-full overflow-hidden shadow-md bg-white">
            <button className="p-3 bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
              <Search />
            </button>
            <input
              type="text"
              placeholder="Search photos"
              className="flex-`grow` p-3 outline-none"
            />
          </div>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 bg-opacity-40 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-40 bg-white shadow-xl z-40 p-6 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={() => setOpen(false)} className="mb-6">
          <X size={24} className="cursor-pointer" />
        </button>

        <ul className="flex flex-col gap-4 text-lg font-medium">
          <Link href="/gallery">
            <li>Gallery</li>
          </Link>
          <Link href="/album">
            <li>Album</li>
          </Link>
          <Link href="/favourites">
            <li>Favourite</li>
          </Link>
        </ul>
      </div>
    </>
  );
}
