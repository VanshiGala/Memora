// "use client";

// import Link from "next/link";
// import { useSession } from "next-auth/react";

// export default function ClientHome() {
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   }

//   if (session) {
//     // Logged in user sees a welcome back message
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-6">
//             Welcome back,{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
//               {session.user?.name || "User"}
//             </span>
//             !
//           </h1>
//           <p className="text-xl text-gray-700 mb-12">
//             Your memories are waiting for you.
//           </p>
//           <Link href="/gallery">
//             <button className="px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-xl hover:scale-105 transition">
//               Go to Gallery
//             </button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Not logged in - show original landing page
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-6">
//       <div className="max-w-4xl mx-auto text-center relative">
//         <div className="absolute inset-0 -z-10 opacity-20 bg-[url('https://images.unsplash.com/photo-1557682257-2f9c2566336e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center blur-xl"></div>

//         <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 leading-tight mb-6">
//           Welcome to{" "}
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
//             Memora
//           </span>
//           <br />
//           <span className="text-3xl md:text-5xl font-light text-gray-600">
//             Your Personal Digital Vault
//           </span>
//         </h1>

//         <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
//           Every memory deserves a place. Memora keeps your stories safe —
//           beautifully organized, securely protected, and always with you.
//           Capture photos, notes, and moments that matter.
//         </p>

//         <div className="flex gap-6 justify-center">
//           <Link href="/signup">
//             <button className="px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-xl hover:scale-105 transition">
//               Sign Up
//             </button>
//           </Link>
//           <Link href="/login">
//             <button className="px-10 py-4 text-lg font-semibold text-purple-600 border-2 border-purple-600 rounded-full hover:bg-purple-50 transition">
//               Login
//             </button>
//           </Link>
//         </div>

//         <p className="mt-12 text-sm text-gray-500">
//           Secure • Private • Forever Yours
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ClientHome() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-full border-4 border-neutral-700 border-t-purple-500 animate-spin" />
          <p className="text-sm tracking-wide text-neutral-400">
            Preparing your memories…
          </p>
        </div>
      </div>
    );
  }

  /* ───────────────────────── LOGGED IN ───────────────────────── */

  if (session) {
    return (
      <main className="relative min-h-screen bg-neutral-950 text-neutral-100 overflow-hidden">
        {/* Ambient gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]" />

        <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <div className="max-w-3xl text-center space-y-8 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              Welcome back,
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                {session.user?.name || "User"}
              </span>
            </h1>

            <p className="text-lg text-neutral-400">
              Everything you’ve saved — exactly where you left it.
            </p>

            <Link href="/gallery">
              <button className="group relative inline-flex items-center justify-center rounded-xl bg-purple-600 px-8 py-4 text-base font-medium shadow-lg transition-all hover:bg-purple-500 hover:shadow-purple-500/30 active:scale-95">
                Open Gallery
                <span className="absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition" />
              </button>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /* ───────────────────────── LOGGED OUT ───────────────────────── */

  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-100 overflow-hidden">
      {/* Soft background depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.12),transparent_55%)]" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-4xl text-center space-y-10 animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight">
            Memora
          </h1>

          <p className="text-xl sm:text-2xl text-neutral-400">
            A calm space for your thoughts, moments, and memories.
          </p>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-neutral-500 leading-relaxed">
            Store photos and memories securely — beautifully
            organized and always accessible.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
            <Link href="/signup">
              <button className="w-full sm:w-auto rounded-xl bg-purple-600 px-8 py-4 text-base font-medium shadow-lg transition hover:bg-purple-500 hover:shadow-purple-500/30 active:scale-95">
                Create Account
              </button>
            </Link>

            <Link href="/login">
              <button className="w-full sm:w-auto rounded-xl border border-neutral-700 px-8 py-4 text-base font-medium text-neutral-300 transition hover:border-neutral-500 hover:text-white active:scale-95">
                Sign In
              </button>
            </Link>
          </div>

          <p className="pt-10 text-sm text-neutral-500">
            Private · Secure · Designed for clarity
          </p>
        </div>
      </section>
    </main>
  );
}
