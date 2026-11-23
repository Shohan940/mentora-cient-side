
import React, { Suspense } from "react";
import SectionCourse from "@/component/SectionCourse";
import { coursesApi } from "@/lib/db";

const CoursesList = async () => {
  const data = await coursesApi();

  return <SectionCourse courses={data} />;
};

const Courses = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading courses...</p>}>
        <CoursesList />
      </Suspense>
    </div>
  );
};

export default Courses;
