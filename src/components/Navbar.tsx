// "use client";

// import { Menu, X, LogOut, Users } from "lucide-react";
// import Link from "next/link";
// import SearchForm from "./SearchForm";
// import { Folder } from "@/app/AppShell";
// import Image from "next/image";
// import icon from "../../public/icon.jpg";
// import { useSession, signOut } from "next-auth/react";

// export default function Navbar({
//   open,
//   setOpen,
//   folders,
// }: {
//   open: boolean;
//   setOpen: (v: boolean) => void;
//   folders: Folder[];
// }) {
//   const { data: session } = useSession();

//   return (
//     <>
//       <nav className="relative flex items-center justify-between h-16 px-4 bg-black shadow-md">
//         <div className="flex items-center gap-4">
//           <button onClick={() => setOpen(true)}>
//             <Menu size={24} className="cursor-pointer" />
//           </button>
//           <Link href="/" className="flex items-center gap-3">
//             <Image src={icon} alt="icon" width={40} height={40} className="rounded" />
//             <h3 className="text-2xl font-bold text-white">Memora</h3>
//           </Link>
//         </div>

//         <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-full max-w-md">
//           <SearchForm />
//         </div>

//         {/* Right side: User info or nothing */}
//         <div className="flex items-center gap-4">
//           {session ? (
//             <div className="flex items-center gap-4">
//               <span className="text-gray-700 font-medium">
//                 Hello, {session.user?.name || "User"}
//               </span>
//               <Link href="/groups">
//                 <button className="cursor-pointer"><Users/></button>
//               </Link>
//               <button
//                 onClick={() => signOut({ callbackUrl: "/" })}
//                 className="text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
//               >
//                 <LogOut size={20} />
//                 <span className="hidden md:inline">Logout</span>
//               </button>
//             </div>
//           ) : null}
//         </div>
//       </nav>

//       {/* Sidebar overlay and aside remain the same */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-24"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       <aside
//         className={`fixed top-0 left-0 h-full w-20 md:w-56 bg-white shadow-xl z-64 p-6 transition-transform ${
//           open ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <button onClick={() => setOpen(false)} className="mb-6">
//           <X size={24} className="cursor-pointer" />
//         </button>

//         <ul className="flex flex-col gap-4 text-lg font-medium">
//           <li>
//             <Link href="/gallery" onClick={() => setOpen(false)}>
//               Gallery
//             </Link>
//           </li>

//           <li>
//             <div>
//               <Link href="/album" className="text-lg font-medium">
//                 Albums
//               </Link>
//               <ul className="ml-4 mt-2 flex flex-col gap-2 text-sm text-gray-600">
//                 {folders.map((folder) => (
//                   <li key={folder.path}>
//                     <Link
//                       href={`/album/${folder.path}`}
//                       onClick={() => setOpen(false)}
//                     >
//                       {folder.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </li>

//           <li>
//             <Link href="/favourites" onClick={() => setOpen(false)}>
//               Favourites
//             </Link>
//           </li>

//           {session && (
//             <li className="mt-8 pt-4 border-t">
//               <button
//                 onClick={() => {
//                   signOut({ callbackUrl: "/" });
//                   setOpen(false);
//                 }}
//                 className="text-red-600 flex items-center gap-2"
//               >
//                 <LogOut size={20} />
//                 Logout
//               </button>
//             </li>
//           )}
//         </ul>
//       </aside>
//     </>
//   );
// }


"use client";

import { Menu, X, LogOut, Users } from "lucide-react";
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
      {/* ───────────── NAVBAR ───────────── */}
      <nav className=" top-0 z-50 h-16 bg-black  ">
        <div className="mx-auto max-w-7xl h-full px-4 grid grid-cols-[auto_1fr_auto] items-center">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-lg hover:bg-neutral-800"
            >
              <Menu size={22} className="text-white" />
            </button>

            <Link href="/" className="flex items-center gap-3">
              <Image src={icon} alt="Memora" width={36} height={36} className="rounded" />
              <span className="text-xl font-bold text-white">Memora</span>
            </Link>
          </div>

          {/* CENTER (TRUE CENTER) */}
          <div className="hidden md:flex justify-center">
            <div className="w-full max-w-md">
              <SearchForm />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 justify-end">
            {session && (
              <>
              <span className="text-gray-700 font-medium">
                 Hello, {session.user?.name || "User"}
             </span>
                <Link
                  href="/groups"
                  className="p-2 rounded-lg hover:bg-neutral-800"
                >
                  <Users size={20} className="text-white" />
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2 rounded-lg hover:bg-red-500/10"
                >
                  <LogOut size={20} className="text-white" />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ───────────── OVERLAY ───────────── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* ───────────── SIDEBAR ───────────── */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-neutral-950 border-r border-neutral-800
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex items-center justify-between">
          <span className="text-lg font-semibold text-white">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-neutral-800"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <nav className="px-6 space-y-6 text-white">
          <Link
            href="/gallery"
            onClick={() => setOpen(false)}
            className="block text-sm hover:text-purple-400"
          >
            Gallery
          </Link>

          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-neutral-500">
              Albums
            </p>
            <ul className="space-y-2">
              {folders.map((folder) => (
                <li key={folder.path}>
                  <Link
                    href={`/album/${folder.path}`}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  >
                    {folder.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/favourites"
            onClick={() => setOpen(false)}
            className="block text-sm hover:text-purple-400"
          >
            Favourites
          </Link>

          {session && (
            <div className="pt-6 border-t border-neutral-800">
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setOpen(false);
                }}
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
