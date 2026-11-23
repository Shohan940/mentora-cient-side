import { coursesApi } from "@/lib/db";
import CourseCard from "./CourseCard";
import { Suspense } from "react";
import Link from "next/link";

const CoursesList = async () => {
  const data = await coursesApi();

  return (
<section className="mx-auto w-[90%] py-12">
  <div className="mb-8 flex items-center justify-between">
    <h2 className="text-3xl font-bold">Popular Courses</h2>

    <Link
      href="/courses"
      className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
    >
      View All Courses →
    </Link>
  </div>

  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {data.slice(0, 4).map((course) => (
      <CourseCard key={course._id} course={course} />
    ))}
  </div>
</section>
  );
};

const HomeCourses = async () => {
  return <Suspense fallback={<p>Loading...</p>}><CoursesList/></Suspense>
};

export default HomeCourses;
