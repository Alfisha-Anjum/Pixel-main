"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "@/components/BlogCards";

export default function BlogSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  // ✅ Local data (ab koi conflict nahi)
  const blogData = [
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Edu",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
  ];

  return (
    <div className="relative w-[1240px] mx-10 md:mx-20 mb-10">
      {/* SLIDER */}
      <div>
        <h1 className="text-[28px] font-semibold text-black py-6">
          Related Blogs
        </h1>
        <p className="text-[16px] text-gray-600 pb-4">
          There are many variations of passages of Lorem Ipsum
        </p>
      </div>
      <div
        ref={sliderRef}
        className="flex overflow-x-auto gap-6 scroll-smooth [&::-webkit-scrollbar]:hidden"
      >
        {blogData.map((blog, index) => (
          <div key={index} className="flex-shrink-0 w-full md:w-[48%]">
            <BlogCard {...blog} />
          </div>
        ))}
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={scrollLeft}
        className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white border border-orange-500 rounded-full text-orange-500 w-10 h-10 flex items-center justify-center z-10"
      >
        <ChevronLeft />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={scrollRight}
        className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white border border-orange-500 rounded-full text-orange-500 w-10 h-10 flex items-center justify-center z-10"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
