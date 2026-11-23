
import { getIdCoursesApi } from "@/lib/db";
import {
  Clock3,
  BookOpen,
  Users,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import Image from "next/image";
import EnrollmetCard from "./EnrollmetCard";

const CourseDetailsPage = async ({ id,token }) => {
  const course = await getIdCoursesApi(id,token);

  const {
    category,
    level,
    title,
    instructor,
    description,
    duration,
    price,
    thumbnail,
    totalLessons,
    totalStudents,
  } = course;

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-7 md:px-6 lg:px-10">

      {/* Top Section */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* Course Image */}
        <div className="group relative h-[260px] overflow-hidden rounded-2xl bg-gray-900 shadow-md sm:h-[350px] lg:col-span-2 lg:h-[410px]">

          <Image
            src={thumbnail}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            alt={title}
          />

          <span className="absolute left-5 top-5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-gray-900 shadow">
            {category}
          </span>
        </div>

        {/* Price Card */}
        <aside className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-md">
            <EnrollmetCard instructor={instructor} price={price} course= {course} />
        </aside>
      </section>

      {/* Course Information */}
      <section className="mt-9 max-w-5xl">

        <h1 className="text-2xl font-extrabold leading-tight text-gray-900 md:text-3xl">
          {title}
        </h1>

        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500 md:text-base">
          {description}
        </p>

        <hr className="my-7 border-slate-200" />

        {/* Course Statistics */}
        <div className="flex flex-wrap gap-3">

          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <Clock3 size={19} className="text-blue-600" />
            <span className="text-sm font-semibold text-slate-700">
              {duration}
            </span>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <ChartNoAxesColumnIncreasing size={19} className="text-blue-600" />
            <span className="text-sm font-semibold text-slate-700">
              {level}
            </span>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <BookOpen size={19} className="text-blue-600" />
            <span className="text-sm font-semibold text-slate-700">
              {totalLessons} Lessons
            </span>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <Users size={19} className="text-blue-600" />
            <span className="text-sm font-semibold text-slate-700">
              {totalStudents} Students
            </span>
          </div>

        </div>

        {/* Last Enrolled */}
        <div className="mt-8">
          <p className="text-xs font-medium italic text-slate-400">
            Last enrolled:
          </p>
        </div>

      </section>
    </main>
  );
};

export default CourseDetailsPage;
