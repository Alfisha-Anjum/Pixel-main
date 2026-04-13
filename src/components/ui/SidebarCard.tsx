"use client";

import Image from "next/image";

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

export default function SidebarCard({
  title,
  description,
  buttonText,
  onClick,
  variant = "gray",
  image,
  buttonClassName,
  imageClassName,
}: SidebarCardProps) {
  const baseStyles =
    "relative w-[381px] h-[421px] p-5 overflow-hidden flex flex-col justify-between";

  const variants = {
    orange: "bg-orange-200",
    gray: "bg-gray-200",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]}`}>
      {/* 🔥 Static Logo */}
      <div className="absolute top-0 left-4">
        <Image
          src="/tas.logo.png" // static logo
          alt="logo"
          width={122}
          height={50}
        />
      </div>

      {/* 🔥 Content */}
      <div className="z-10 mt-10 py-20">
        <h4 className="font-semibold text-[25px] text-lg max-w-[180px]">
          {title}
        </h4>
        {buttonText && (
          <button
            onClick={onClick}
            className={`mt-3 px-4 py-2 text-sm rounded ${
              buttonClassName || "bg-orange-500 text-white"
            }`}
          >
            {buttonText}
          </button>
        )}
      </div>

      {/* 🔥 Dynamic Image (right side) */}
      {image && (
        <div
          className={`absolute bottom-0 right-0 ${imageClassName || "w-[50%] h-[80%]"}`}
        >
          <Image
            src={image}
            alt="card-img"
            width={250}
            height={420}
            className="object-bottom"
          />
        </div>
      )}
    </div>
  );
}
