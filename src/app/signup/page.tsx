"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { CldUploadButton } from "next-cloudinary";
// import { Camera } from "lucide-react";
import { signupSchema } from "@/lib/authSchema";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // password match validation
    // if (formData.password !== formData.confirmPassword) {
    //   setError("Passwords do not match");
    //   return;
    // }

    // if (formData.password.length < 6) {
    //   setError("Password must be at least 6 characters");
    //   return;
    // }
    const parsed = signupSchema.safeParse(formData);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }


    setLoading(true);
    //api integration
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //passing data to backend
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        setSuccess("Account created successfully! Redirecting...");
        // Redirect after successful signup
        setTimeout(() => {
          router.push("/gallery");
        }, 2000);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-6">
    <div className="w-full max-w-md rounded-3xl bg-zinc-900/80 backdrop-blur-xl shadow-[0_0_60px_rgba(139,92,246,0.15)] p-8 border border-zinc-800">

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-white">
          Create account
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Start preserving your memories with Memora
        </p>
      </div>

      {/* ALERTS */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-900/40 bg-red-950/40 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-5 rounded-xl border border-emerald-900/40 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-400">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* FULL NAME */}
        <div>
          <label className="text-sm text-zinc-300">
            Full name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            placeholder="John Doe"
            required
          />
        </div>

        {/* PROFILE PHOTO */}
        <div>
          {/* <label className="text-sm text-zinc-300">
            Profile photo <span className="text-zinc-500">(optional)</span>
          </label> */}

          {/* <div className="mt-3 flex items-center gap-4"> */}
            {/* <div className="h-16 w-16 rounded-full border border-zinc-700 bg-zinc-800 overflow-hidden flex items-center justify-center">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Camera className="h-6 w-6 text-zinc-500" />
              )}
            </div> */}

            {/* {/* <CldUploadButton
              uploadPreset="photo-album"
              onSuccess={(result: any) => {
                if (result.event === "success") {
                  setProfilePic(result.info.secure_url);
                }
              }}
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition"
            >
              Upload photo
            </CldUploadButton> */}
           {/* </div> */}
         </div> 

        {/* EMAIL */}
        <div>
          <label className="text-sm text-zinc-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            placeholder="you@memora.app"
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="text-sm text-zinc-300">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-white font-semibold hover:opacity-90 transition disabled:opacity-60 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      {/* FOOTER */}
      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-purple-400 font-medium hover:underline"
        >
          Log in
        </Link>
      </p>

      <p className="mt-6 text-center text-xs text-zinc-500">
        Your memories stay private. Always.
      </p>
    </div>
  </div>
);
}