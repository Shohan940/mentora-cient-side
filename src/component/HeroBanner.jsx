
"use client";

import '../app/globals.css'
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const slides = [
  {
    badge: "Trusted by 10,000+ Students Worldwide",
    title: "Master New Skills with",
    highlight: "Expert-Led",
    lastLine: "Courses",
    description:
      "Unlock your potential with over 1,000+ high-quality courses taught by industry professionals. Start your learning journey today.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85",
    button: "Explore Courses",
    community: "Join the community",
    enrollment: "500+ new enrollments today",
  },
  {
    badge: "Learn from Industry Professionals",
    title: "Build Your Future with",
    highlight: "Practical",
    lastLine: "Learning",
    description:
      "Develop in-demand skills with expert instructors, hands-on projects, and practical lessons designed for your success.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=85",
    button: "Start Learning",
    community: "Learn together",
    enrollment: "Join thousands of learners",
  },
  {
    badge: "Your Learning Journey Starts Here",
    title: "Turn Your Passion into",
    highlight: "Real-World",
    lastLine: "Skills",
    description:
      "Explore exciting courses, learn at your own pace, and gain the confidence to achieve your personal and professional goals.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=85",
    button: "Browse Courses",
    community: "Grow your skills",
    enrollment: "New courses added regularly",
  },
];

const avatars = [
  "https://i.pravatar.cc/100?img=12",
  "https://i.pravatar.cc/100?img=32",
  "https://i.pravatar.cc/100?img=11",
  "https://i.pravatar.cc/100?img=47",
];

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Next Slide
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  // Previous Slide
  const prevSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  // Automatic Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[activeSlide];

  return (
    <section className="relative w-full overflow-hidden bg-slate-50">

      {/* Main Container */}
      <div className="relative mx-auto max-w-[1600px] px-5 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left Content */}
          <div
            key={activeSlide}
            className="flex flex-col items-start animate-[fadeIn_0.7s_ease-in-out]"
          >

            {/* Trust Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-600 sm:text-base">

              <Star size={18} fill="currentColor" />

              {currentSlide.badge}

            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl md:text-6xl xl:text-7xl">

              {currentSlide.title}

              <span className="block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                {currentSlide.highlight}
              </span>

              {currentSlide.lastLine}

            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
              {currentSlide.description}
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-5">

              <Link
                href="/courses"
                className="group inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 font-bold text-white shadow-xl shadow-blue-200 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-blue-300"
              >
                {currentSlide.button}

                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/demo"
                className="group inline-flex items-center gap-3 rounded-full px-4 py-3 font-bold text-slate-800 transition-colors duration-300 hover:text-blue-600"
              >
                <Play size={19} fill="currentColor" />

                Watch Demo
              </Link>

            </div>

          </div>

          {/* Right Image */}
          <div
            key={`image-${activeSlide}`}
            className="relative mx-auto w-full max-w-[650px] animate-[fadeIn_0.7s_ease-in-out]"
          >

            {/* Image Container */}
            <div className="relative aspect-[4/4.1] overflow-hidden rounded-[35px] shadow-2xl shadow-blue-200/60 sm:aspect-[4/3.8] lg:aspect-[4/4.1]">

              <img
                src={currentSlide.image}
                alt="Students learning together"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Community Card */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/50 bg-white/80 p-4 shadow-xl backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8 sm:gap-4 sm:p-5">

                {/* Avatar Group */}
                <div className="flex shrink-0 items-center -space-x-3">

                  {avatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt="Community member"
                      className="h-10 w-10 rounded-full border-2 border-white object-cover sm:h-12 sm:w-12"
                    />
                  ))}

                </div>

                {/* Community Text */}
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-extrabold text-slate-900 sm:text-base">
                    {currentSlide.community}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    {currentSlide.enrollment}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Slider Indicators */}
        <div className="mt-10 flex items-center justify-center gap-3">

          {slides.map((slide, index) => (
            <button
              key={slide.badge}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "w-10 bg-blue-600"
                  : "w-2.5 bg-slate-300 hover:bg-blue-400"
              }`}
            />
          ))}

        </div>

      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-1 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:scale-110 md:flex lg:left-3"
      >
        <ChevronLeft size={42} strokeWidth={1.7} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-1 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:scale-110 md:flex lg:right-3"
      >
        <ChevronRight size={42} strokeWidth={1.7} />
      </button>

    </section>
  );
}
