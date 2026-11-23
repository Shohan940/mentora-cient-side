"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Email Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        alert(error.message || "Invalid email or password");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google Login failed:", error);
      alert("Google login failed!");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-6">
      {/* Background */}
      <div className="absolute -left-40 -top-48 h-[450px] w-[450px] rounded-full border-[60px] border-blue-100/70" />

      <div className="absolute -bottom-56 -right-40 h-[500px] w-[500px] rounded-full border-[60px] border-blue-100/70" />

      {/* Login Card */}
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
            Welcome <span className="text-blue-600">Back</span>
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Continue your learning journey today
          </p>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-800 transition hover:bg-blue-50"
        >
          <span className="text-xl font-bold text-blue-600">G</span>
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-xs font-bold text-slate-400">
            OR WITH EMAIL
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-bold text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
            <span className="text-xl">→</span>
          </button>
        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm font-medium text-slate-500">
          New to our website?{" "}
          <Link
            href="/register"
            className="font-bold text-blue-600 hover:text-blue-800"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
