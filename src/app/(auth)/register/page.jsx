
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const photoURL = formData.get("photoURL");
    const password = formData.get("password");

    const { data, error } = await authClient.signUp.email({
      name: fullName,
      email,
      password,
      image: photoURL,
      callbackURL: "/",
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Registration successful!");
    router.push("/");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-8">

      {/* Background Decorations */}
      <div className="absolute -left-40 -top-48 h-[450px] w-[450px] rounded-full border-[60px] border-blue-100/70" />

      <div className="absolute -bottom-56 -right-40 h-[500px] w-[500px] rounded-full border-[60px] border-blue-100/70" />

      {/* Register Card */}
      <section className="relative z-10 w-full max-w-[420px] rounded-[28px] border border-white bg-white/95 px-7 py-8 shadow-[0_20px_60px_rgba(30,64,175,0.15)] sm:px-8">

        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-2xl text-white shadow-lg">
            🛍️
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Create <span className="text-blue-600">Account</span>
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Join us and start your journey today
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              required
              className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Profile Image URL */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">
              Profile Image URL
            </label>

            <input
              type="url"
              name="photoURL"
              placeholder="Enter your profile image URL"
              required
              className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">
              Password
            </label>

            <div className="flex h-12 items-center rounded-xl border-2 border-slate-200 px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                minLength={6}
                className="w-full bg-transparent text-sm outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-slate-500"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
            <span className="text-xl">→</span>
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm font-medium text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-blue-600 hover:text-blue-800"
          >
            Sign in
          </Link>
        </p>

      </section>
    </main>
  );
}
