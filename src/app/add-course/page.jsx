
"use client";

import { useRouter } from "next/navigation";

export default function AddCourse() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const courseData = {
      title: formData.get("title"),
      category: formData.get("category"),
      instructor: formData.get("instructor"),
      description: formData.get("description"),
      level: formData.get("level"),
      price: Number(formData.get("price")),
      duration: formData.get("duration"),
      thumbnail: formData.get("thumbnail"),
      totalLessons: Number(formData.get("totalLessons")),
      totalStudents: Number(formData.get("totalStudents")),
      language: formData.get("language"),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      const data = await res.json();

      if (res.ok && data.acknowledged) {
        alert("Course added successfully!");

        form.reset();
        router.refresh();
        router.push("/courses");
      } else {
        alert("Failed to add course!");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-6">

      {/* Background */}
      <div className="absolute -left-40 -top-48 h-[450px] w-[450px] rounded-full border-[60px] border-blue-100/70" />

      <div className="absolute -bottom-56 -right-40 h-[500px] w-[500px] rounded-full border-[60px] border-blue-100/70" />

      {/* Add Course Card */}
      <section className="relative z-10 w-full max-w-[620px] rounded-[28px] border border-white bg-white/95 px-7 py-8 shadow-[0_20px_60px_rgba(30,64,175,0.15)] sm:px-8">

        <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
          Add New Course
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* First Column */}
            <div className="space-y-4">

              {/* Title */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter course title"
                  required
                  className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  placeholder="Enter course category"
                  required
                  className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Instructor */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Instructor
                </label>
                <input
                  type="text"
                  name="instructor"
                  placeholder="Enter course instructor"
                  required
                  className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter course description"
                  required
                  rows={3}
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Level */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Level
                </label>
                <input
                  type="text"
                  name="level"
                  placeholder="Enter course level"
                  required
                  className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Price */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter course price"
                  required
                  min="0"
                  className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

            </div>

            {/* Second Column */}
            <div className="space-y-4">

              {/* Duration */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  placeholder="Enter course duration"
                  required
                  className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Image */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Image
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  placeholder="Enter course image url"
                  required
                  className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Total Lessons */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Total Lessons
                </label>
                <input
                  type="number"
                  name="totalLessons"
                  placeholder="Enter course lesson number"
                  required
                  min="0"
                  className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Total Students */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Total Students
                </label>
                <input
                  type="number"
                  name="totalStudents"
                  placeholder="Enter course student"
                  required
                  min="0"
                  className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Language */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Language
                </label>
                <input
                  type="text"
                  name="language"
                  placeholder="Enter course language"
                  required
                  className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            Submit
          </button>

        </form>
      </section>
    </main>
  );
}
