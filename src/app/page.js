import Benefits from "@/component/Benefits";
import CourseCard from "@/component/CourseCard";
import HeroBanner from "@/component/HeroBanner";
import HomeCourses from "@/component/HomeCourses";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <br /> <br />
      <HeroBanner />
      <br />
      <br />
        <HomeCourses/>
      <br />
      <br />
      <Benefits />
    </>
  );
}
