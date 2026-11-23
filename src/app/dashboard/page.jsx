import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

import { Button } from "@heroui/react";

async function DashboardContent() {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user) {
    redirect("/login");
  }

  const { token } = await auth.api.getToken({
    headers: requestHeaders,
  });

  if (!token) {
    redirect("/login");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/enrollments/${session.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch enrollments");
  }

  const enrollments = await res.json();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Welcome back, {session.user.name?.split(" ")[0]}!
          </h1>
          <p className="text-slate-500 mt-2">Continue your learning journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={110}
                    height={110}
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-50"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
                    {session.user.name?.charAt(0)}
                  </div>
                )}

                <h2 className="text-xl font-bold text-slate-900 mt-4">
                  {session.user.name}
                </h2>

                <p className="text-sm text-slate-500 mt-1 break-all">
                  {session.user.email}
                </p>

                <div className="mt-5 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                  Student Account
                </div>
              </div>

              <div className="border-t border-slate-100 mt-6 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Enrolled Courses
                  </span>

                  <span className="font-bold text-slate-900">
                    {enrollments.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <BookOpen className="text-blue-600" size={24} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Total Enrollments</p>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {enrollments.length}
                  </h3>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <GraduationCap className="text-purple-600" size={26} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Learning Status</p>
                  <h3 className="text-xl font-bold text-slate-900">
                    Active Student
                  </h3>
                </div>
              </div>
            </div>

            {/* Courses Section */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    My Enrolled Courses
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Manage and continue your courses.
                  </p>
                </div>

                <Link
                  href="/courses"
                  className="text-blue-600 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Explore Courses
                  <ArrowRight size={17} />
                </Link>
              </div>

              {enrollments.length === 0 ? (
                <div className="py-16 px-5 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-5">
                    <BookOpen size={30} className="text-blue-600" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800">
                    No courses enrolled yet!
                  </h3>

                  <p className="text-slate-500 text-sm mt-2 mb-6">
                    Start learning today by exploring our courses.
                  </p>

                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    Browse Courses
                    <ArrowRight size={18} />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {enrollments.map((enrollment) => (
                    <div
                      key={enrollment._id}
                      className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition"
                    >
                      <div className="relative w-full h-44 bg-slate-100">
                        <Image
                          src={enrollment.thumbnail}
                          alt={enrollment.courseTitle}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-lg text-slate-900 line-clamp-2">
                          {enrollment.courseTitle}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-3">
                          <CalendarDays size={16} />
                          {new Date(enrollment.enrolledAt).toDateString()}
                        </div>

                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                          <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold">
                            Active
                          </span>

                          {/* Cancel Enrollment Button */}
                          <Button
                            color="danger"
                            variant="light"
                            size="sm"
                            className="font-medium cursor-pointer  transition-all duration-200 hover:bg-red-100 hover:text-red-700 p-1 rounded-full active:scale-95"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Page
export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-slate-500">Loading Dashboard...</p>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
