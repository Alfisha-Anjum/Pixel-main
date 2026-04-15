"use client";

import Image from "next/image";
import BlogSlider from "./ui/BlogSlider";
import SidebarCard from "./ui/SidebarCard";

type SidebarCardProps = {
  title: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
  variant?: "orange" | "gray";
  image?: string;
  buttonClassName?: string;
  imageClassName?: string;
};

export default function BlogDetail({ blog, onBack }) {
  if (!blog) return null;
  const sidebarData: SidebarCardProps[] = [
    {
      title: "Looking Job for Technician",
      buttonText: "Apply Now",
      variant: "orange",
      image: "/electrician.png",
      buttonClassName: "bg-orange-500 hover:bg-orange-600 text-white",
      imageClassName: "w-[100%] h-[75%] rounded-t-md",
    },
    {
      title: "Looking for any service?",
      buttonText: "Visit Site",
      variant: "gray",
      image: "/img/advgirl.png",
      imageClassName: "w-[280px] h-[600px] rounded-t-md",
      buttonClassName: "bg-black hover:bg-gray-800 text-white",
    },
  ];

  return (
    <div className="w-full p-4 md:p-6">
      <p className="text-orange-500 text-sm font-semibold uppercase">Learn</p>

      <h1 className="text-[32px] font-semibold mt-2">
        Remote Collaboration: best Practices,Challenges, and tools
      </h1>

      <div className="flex gap-10 mt-4">
        <span className="flex gap-2 whitespace-nowrap">
          <img src="/pen.png" />
          By Admin
        </span>
        <span className="flex gap-2 whitespace-nowrap">
          <img src="/Calendar.png" /> {blog.date}
        </span>
      </div>

      {/* CONTENT */}
      <div className="mt-6 max-w-[780px] space-y-4 text-[16px]">
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form variations of
          passages of Lorem Ipsum available There are many variations of
          passages of Lorem Ipsum available...
        </p>

        <Image
          src="/img/girlworking.png"
          alt=""
          width={780}
          height={450}
          className=""
        />

        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form variations of
          passages of Lorem Ipsum available There are many variations of
          passages of Lorem Ipsum available...
        </p>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form variations of
          passages of Lorem Ipsum available There are many variations of
          passages of Lorem Ipsum available There are many variations of
          passages of Lorem Ipsum available, but the majority have suffered
          alteration in some form variations of passages of Lorem Ipsum
          available There are many variations of passages of Lorem Ipsum
          available...
        </p>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form variations of
          passages of Lorem Ipsum available There are many variations of
          passages of Lorem Ipsum available...
        </p>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form variations of
          passages of Lorem Ipsum available There are many variations of
          passages of Lorem Ipsum available There are many variations of
          passages of Lorem Ipsum available, but the majority have suffered
          alteration in some form variations of passages of Lorem Ipsum
          available There are many variations of passages of Lorem Ipsum
          available...
        </p>
      </div>

      {/* REACTIONS */}
      <div className="flex items-center gap-6 bg-white p-4">
        <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <span>
            <img src="/like.png" alt="" />
          </span>
          <span>335 Likes</span>
        </div>
        <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <span>
            <img src="/unlike.png" alt="" />
          </span>
          <span>30 Dislikes</span>
        </div>
        <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <span>
            <img src="/comment.png" alt="" />
          </span>
          <span>10 Comments</span>
        </div>
      </div>

      {/* BACK */}
      <button onClick={onBack} className="mt-8 text-orange-500 underline">
        ← Back to Blogs
      </button>
    </div>
  );
}
