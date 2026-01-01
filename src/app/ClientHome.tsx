"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ClientHome() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (session) {
    // Logged in user sees a welcome back message
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-6">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {session.user?.name || "User"}
            </span>
            !
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            Your memories are waiting for you.
          </p>
          <Link href="/gallery">
            <button className="px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-xl hover:scale-105 transition">
              Go to Gallery
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Not logged in - show original landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="absolute inset-0 -z-10 opacity-20 bg-[url('https://images.unsplash.com/photo-1557682257-2f9c2566336e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center blur-xl"></div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 leading-tight mb-6">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Memora
          </span>
          <br />
          <span className="text-3xl md:text-5xl font-light text-gray-600">
            Your Personal Digital Vault
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
          Every memory deserves a place. Memora keeps your stories safe —
          beautifully organized, securely protected, and always with you.
          Capture photos, notes, and moments that matter.
        </p>

        <div className="flex gap-6 justify-center">
          <Link href="/signup">
            <button className="px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-xl hover:scale-105 transition">
              Sign Up
            </button>
          </Link>
          <Link href="/login">
            <button className="px-10 py-4 text-lg font-semibold text-purple-600 border-2 border-purple-600 rounded-full hover:bg-purple-50 transition">
              Login
            </button>
          </Link>
        </div>

        <p className="mt-12 text-sm text-gray-500">
          Secure • Private • Forever Yours
        </p>
      </div>
    </div>
  );
}