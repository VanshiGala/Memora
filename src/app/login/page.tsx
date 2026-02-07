"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/gallery");
      router.refresh();
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-6">
    <div className="w-full max-w-md rounded-3xl bg-zinc-900/80 backdrop-blur-xl shadow-[0_0_60px_rgba(139,92,246,0.15)] p-8 border border-zinc-800">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Log in to continue to Memora
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-900/40 bg-red-950/40 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* EMAIL */}
        <div>
          <label className="text-sm text-zinc-300">
            Email
          </label>
          <input
            type="email"
            placeholder="you@memora.app"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-zinc-300">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-white font-semibold hover:opacity-90 transition shadow-[0_0_20px_rgba(139,92,246,0.4)]"
        >
          Log in
        </button>
      </form>

      {/* FOOTER */}
      <p className="mt-6 text-center text-sm text-zinc-400">
        Don’t have an account?{" "}
        <a
          href="/signup"
          className="text-purple-400 font-medium hover:underline"
        >
          Create one
        </a>
      </p>

      <p className="mt-6 text-center text-xs text-zinc-500">
        Your memories stay private. Always.
      </p>
    </div>
  </div>
);

}