
import {
  Users,
  Award,
  Play,
} from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      id: 1,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with real-world experience.",
      icon: Users,
    },
    {
      id: 2,
      title: "Verified Certificates",
      description:
        "Earn certificates that are recognized by top companies worldwide.",
      icon: Award,
    },
    {
      id: 3,
      title: "Lifetime Access",
      description:
        "Learn at your own pace with lifetime access to all your courses.",
      icon: Play,
    },
  ];

  return (
    <section className="w-full bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

      <div className="mx-auto max-w-[1600px]">

        {/* Section Heading */}
        <div className="mb-14 text-center sm:mb-16">

          <p className="mb-5 text-sm font-extrabold tracking-[0.15em] text-blue-600 sm:text-base">
            OUR BENEFITS
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Why Choose Mentora?
          </h2>

        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-10">

          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.id}
                className="group flex min-h-[320px] flex-col items-center justify-center rounded-[32px] border border-slate-200 bg-white px-6 py-10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 sm:min-h-[350px] sm:px-10"
              >

                {/* Icon */}
                <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-[24px] bg-blue-50 text-slate-900 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">

                  <Icon
                    size={42}
                    strokeWidth={2}
                  />

                </div>

                {/* Title */}
                <h3 className="mb-7 text-xl font-bold text-slate-900 sm:text-2xl">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="max-w-[400px] text-base leading-8 text-slate-500 sm:text-lg">
                  {benefit.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}
