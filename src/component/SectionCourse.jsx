
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  SlidersHorizontal,
  X,
} from "lucide-react";

import CourseCard from "@/component/CourseCard";

const SectionCourse = ({ courses = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  // Dynamic Category তৈরি
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        courses
          .map((course) => course.category)
          .filter(Boolean)
      ),
    ];
  }, [courses]);

  // Search এবং Category Filter
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const search = searchTerm.toLowerCase().trim();

      const matchCategory =
        selectedCategory === "All" ||
        course.category === selectedCategory;

      const matchSearch =
        !search ||
        course.title?.toLowerCase().includes(search) ||
        course.category?.toLowerCase().includes(search) ||
        course.instructor?.toLowerCase().includes(search);

      return matchCategory && matchSearch;
    });
  }, [courses, searchTerm, selectedCategory]);

  return (
    <main>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

        <div className="max-w-[1100px] mx-auto text-center">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
            Explore Our Premium Courses
          </h1>

          <p className="text-gray-500 text-base sm:text-lg mt-5 max-w-2xl mx-auto">
            Discover new skills, learn from industry experts,
            and take your career to the next level.
          </p>

          {/* Search Bar */}
          <div className="max-w-[1000px] mx-auto mt-10">

            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white rounded-[24px] border border-gray-200 p-3 shadow-md">

              <div className="flex items-center gap-3 flex-1 w-full px-4">

                <Search className="text-gray-400 shrink-0" size={22} />

                <input
                  type="text"
                  placeholder="Search for courses (e.g. Next.js, Web Design...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 outline-none text-gray-700 bg-transparent"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="text-gray-400 hover:text-gray-700"
                    aria-label="Clear search"
                  >
                    <X size={20} />
                  </button>
                )}

              </div>

              <button
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                <Search size={18} />
                Search
              </button>

            </div>
          </div>

        </div>
      </section>


      {/* ================= COURSES SECTION ================= */}
      <section className="border-t border-gray-100 bg-slate-50 px-5 py-12 sm:px-8 lg:px-12">

        <div className="max-w-[1200px] mx-auto">

          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <div className="flex items-center gap-3">

              <div className="bg-blue-100 p-3 rounded-xl">
                <BookOpen className="text-blue-600" size={25} />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  All Courses
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Showing {filteredCourses.length} of {courses.length} courses
                </p>
              </div>

            </div>

            {/* Filter Button */}
            <button
              type="button"
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl border font-medium transition ${
                filterOpen
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-500"
              }`}
            >
              <SlidersHorizontal size={19} />
              Filters

              {filterOpen ? (
                <X size={18} />
              ) : null}
            </button>

          </div>


          {/* ================= FILTER PANEL ================= */}
          {filterOpen && (
            <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filter by Category
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Select a category to explore courses.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setFilterOpen(false)}
                  className="text-gray-400 hover:text-gray-700"
                  aria-label="Close filters"
                >
                  <X size={22} />
                </button>

              </div>

              {/* Category Buttons */}
              <div className="flex flex-wrap gap-3">

                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition ${
                      selectedCategory === category
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-600 hover:text-blue-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}

              </div>

              {/* Reset Filter */}
              <div className="flex justify-end mt-5 pt-4 border-t border-gray-100">

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchTerm("");
                  }}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Reset Filters
                </button>

              </div>

            </div>
          )}


          {/* ================= COURSE CARDS ================= */}
          <div className="mt-8">

            {filteredCourses.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                  />
                ))}

              </div>

            ) : (

              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">

                <BookOpen
                  size={45}
                  className="mx-auto text-gray-300 mb-4"
                />

                <h3 className="text-xl font-bold text-gray-800">
                  No Courses Found!
                </h3>

                <p className="text-gray-500 mt-2">
                  Try another search term or category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
};

export default SectionCourse;
