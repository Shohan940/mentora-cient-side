
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


import {
  BookOpen,
  Home,
  GraduationCap,
  PlusCircle,
  LayoutDashboard,
  UserRound,
  LogOut,
  Settings,
  MoreVertical,
  X,
  ChevronDown,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useRouter();

  // Better Auth Session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const isLoggedIn = !!user;

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Courses", href: "/courses", icon: GraduationCap },
    { name: "Add Course", href: "/add-course", icon: PlusCircle },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
  ];

  // Close Menus
  const closeMenus = () => {
    setMobileOpen(false);
    setProfileOpen(false);
  };

  // Logout
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      closeMenus();
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Profile Image
  const profileImage = (
    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-blue-500 bg-blue-50">
      {user?.image ? (
        <img
          src={user.image}
          alt={user.name || "Profile"}
          className="h-full w-full object-cover"
        />
      ) : (
        <UserRound size={23} className="text-blue-600" />
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-xl">

      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="group flex shrink-0 items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200 transition-transform duration-500 group-hover:rotate-[30deg]">
            <BookOpen size={24} strokeWidth={2.2} />
          </div>

          <span className="text-3xl font-extrabold tracking-tight text-slate-950">
            Mentora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">

          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-lg font-semibold text-slate-700 transition-colors duration-300 hover:text-blue-600"
              >
                <Icon size={21} />
                {link.name}
              </Link>
            );
          })}

        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-5 lg:flex">

          {/* Not Logged In */}
          {!isPending && !isLoggedIn && (
            <>
              <Link
                href="/login"
                className="font-semibold text-slate-700 transition-colors hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-blue-500 px-5 py-2 font-bold text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:bg-blue-700"
              >
                Join Free
              </Link>
            </>
          )}

          {/* Logged In */}
          {isLoggedIn && (
            <div className="relative">

              {/* Profile Button */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 rounded-full border border-gray-100 bg-white p-2 transition hover:bg-gray-50"
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
              >
                {profileImage}

                <span className="max-w-28 truncate font-semibold text-slate-700">
                  {user?.name}
                </span>

                <ChevronDown
                  size={18}
                  className={`text-blue-600 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-4 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">

                  {/* User Info */}
                  <div className="flex items-center gap-3 border-b border-gray-100 p-5">
                    {profileImage}

                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-slate-900">
                        {user?.name}
                      </h3>

                      <p className="truncate text-sm text-slate-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Menu Links */}
                  <div className="space-y-1 p-3">

                    <Link
                      href="/dashboard"
                      onClick={closeMenus}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <LayoutDashboard size={21} />
                      Dashboard
                    </Link>

                    <Link
                      href="/settings"
                      onClick={closeMenus}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Settings size={21} />
                      Settings
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50"
                    >
                      <LogOut size={21} />
                      Log Out
                    </button>

                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-800 transition-colors duration-300 hover:bg-blue-50 hover:text-blue-600 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={27} /> : <MoreVertical size={27} />}
        </button>

      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="absolute left-0 top-full z-50 w-full border-t border-gray-100 bg-white shadow-xl lg:hidden">

          {/* Mobile Navigation Links */}
          <div className="space-y-1 px-5 py-4 sm:px-8">

            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenus}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 text-base font-semibold text-slate-700 transition-colors hover:text-blue-600"
                >
                  <Icon size={21} />
                  {link.name}
                </Link>
              );
            })}

          </div>

          <div className="mx-5 border-t border-gray-200 sm:mx-8" />

          {/* Mobile Account Section */}
          <div className="px-5 py-5 sm:px-8">

            {/* Not Logged In */}
            {!isPending && !isLoggedIn && (
              <div className="space-y-2">

                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:text-blue-600"
                >
                  <UserRound size={21} />
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700"
                >
                  Join Free
                </Link>

              </div>
            )}

            {/* Logged In */}
            {isLoggedIn && (
              <div className="space-y-3">

                {/* Mobile Profile */}
                <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
                  {profileImage}

                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-slate-900">
                      {user?.name}
                    </h3>

                    <p className="truncate text-sm text-slate-500">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={closeMenus}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-blue-50"
                >
                  <LayoutDashboard size={21} />
                  Dashboard
                </Link>

                <Link
                  href="/settings"
                  onClick={closeMenus}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-blue-50"
                >
                  <Settings size={21} />
                  Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-4 rounded-xl px-4 py-3 font-semibold text-red-500 transition hover:bg-red-50"
                >
                  <LogOut size={21} />
                  Logout
                </button>

              </div>
            )}

          </div>
        </div>
      )}

    </header>
  );
}
