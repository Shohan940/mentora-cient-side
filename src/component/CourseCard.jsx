import Link from "next/link";
import { Clock3, BookOpen } from "lucide-react";
import Image from "next/image";

export default function CourseCard({ course }) {
  const {_id, category, title, instructor, duration, price, thumbnail,totalLessons } = course;

  return (
    <div className="w-full max-w-[380px] overflow-hidden rounded-[24px] border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/50">
      {/* Course Image */}
      <div className="group relative h-[180px] overflow-hidden">
        <Image
          src={thumbnail}
          fill
          sizes="(max-width: 380px) 100vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          alt={title}
        />

        {/* Category Badge */}
        <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-slate-900 shadow-md">
          {category}
        </div>
      </div>

      {/* Course Details */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold leading-snug text-slate-900">
          {title}
        </h3>

        {/* Instructor */}
        <p className="mt-1 text-sm text-slate-500">
          By <span className="font-medium text-slate-900">{instructor}</span>
        </p>

        {/* Course Information */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <Clock3 size={17} strokeWidth={1.8} />
            {duration}
          </div>

          <div className="flex items-center gap-2">
            <BookOpen size={17} strokeWidth={1.8} />
            {totalLessons} Lessons
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-slate-100" />

        {/* Price & Button */}
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-[28px] font-extrabold text-blue-600">${price}</h4>

          <Link
            href={`/courses/${_id}`}
            className="rounded-lg px-3 py-2 text-sm font-bold text-slate-900 transition-colors hover:text-blue-600"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
}
