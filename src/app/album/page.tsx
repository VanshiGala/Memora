
// import cloudinary from "cloudinary";
// import { AlbumCard } from "./album-card";
// import { Folder, ImageIcon } from "lucide-react";

// export type Folder = { name: string; path: string };

// export default async function AlbumPage() {
//   const { folders } = (await cloudinary.v2.api.root_folders()) as {
//     folders: Folder[];
//   };

//   const albumCount = folders.length;

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-6 py-12">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-12">
//           <div className="flex items-center gap-4">
//             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
//               <ImageIcon className="w-7 h-7 text-white" />
//             </div>

//             <div>
//               <h1 className="text-4xl font-extrabold text-gray-900">
//                 Albums
//               </h1>
//               <p className="text-gray-600 text-sm mt-1">
//                 {albumCount === 0
//                   ? "No albums created yet."
//                   : `${albumCount} ${
//                       albumCount === 1 ? "album" : "albums"
//                     } to relive your memories`}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Album Grid */}
//         {albumCount > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {folders.map((folder) => (
//               <AlbumCard key={folder.path} folder={folder} />
//             ))}
//           </div>
//         ) : (
//           /* Empty State */
//           <div className="flex flex-col items-center justify-center py-32 text-center rounded-3xl border-2 border-dashed border-gray-300 bg-white/60 backdrop-blur">
//             <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
//               <ImageIcon className="w-10 h-10 text-gray-400" />
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//               No albums yet
//             </h2>
//             <p className="text-gray-500 max-w-md">
//               Create your first album to start organizing and preserving your
//               memories.
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

import cloudinary from "cloudinary";
import Upload from "@/components/upload/Upload";
import { AlbumCard } from "./album-card";

export type Folder = { name: string; path: string };

export default async function AlbumPage() {
  // Fetch folders from Cloudinary
  const { folders } = (await cloudinary.v2.api.root_folders()) as { folders: Folder[] };
  const albumCount = folders.length;

  return (
    <main className="min-h-screen bg-black text-neutral-100">
      
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur px-6 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Albums</h1>
          <Upload />
        </div>
      </header>

      {/* ================= ALBUM GRID ================= */}
      <section className="mx-auto max-w-7xl px-6 py-10 animate-fade-in-up space-y-8">

        {albumCount === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center text-neutral-400">
            <div className="w-24 h-24 rounded-full bg-neutral-900 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-neutral-200 mb-2">No albums yet</h2>
            <p className="text-neutral-400 max-w-md">
              Create your first album to start organizing and preserving your memories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {folders.map((folder) => (
              <AlbumCard
                key={folder.path}
                folder={folder}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
