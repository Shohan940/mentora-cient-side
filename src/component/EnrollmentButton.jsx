"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { GraduationCap, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function EnrollmentButton({ course }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (!session?.user) {
      toast.error("Please login to enroll in this course");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);

      const { data: jwtData, error: tokenError } = await authClient.token();

      const token = jwtData?.token;

      if (tokenError || !token) {
        toast.error("Authentication failed. Please login again.");
        return;
      }

      const enrollmentData = {
        userId: session.user.id,
        studentName: session.user.name,
        studentEmail: session.user.email,
        courseId: course?._id,
        courseTitle: course?.title,
        thumbnail: course?.thumbnail,
        category: course?.category,
        price: course?.price,
        enrolledAt: new Date().toISOString(),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/enrollments/${course._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(enrollmentData),
        },
      );

      const result = await res.json();

      console.log("Backend Response:", result);

      if (!res.ok) {
        toast.error(data.message || "Enrollment failed!");
        return;
      }

      toast.success("Successfully enrolled in this course!");

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Enrollment Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      color="primary"
      size="lg"
      isDisabled={loading}
      onPress={handleEnroll}
      className="group relative w-full h-14 mt-4 overflow-hidden
      rounded-xl font-bold text-base text-white
      bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600
      shadow-lg shadow-indigo-500/25
      hover:shadow-xl hover:shadow-indigo-500/40
      hover:-translate-y-0.5
      active:translate-y-0
      transition-all duration-300
      disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          Processing Enrollment...
        </>
      ) : (
        <>
          <GraduationCap size={21} />
          Enroll Now
          <ArrowRight
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </>
      )}
    </Button>
  );
}
