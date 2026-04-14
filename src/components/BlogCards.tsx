import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";

type BlogCardProps = {
  category: string;
  date: string;
  title: string;
  description: string;
  image?: string; // optional
  href?: string;
};

export default function BlogCard({
  category,
  date,
  title,
  description,
  image,
  href = "#",
}: BlogCardProps) {
  return (
    <Link href={href}>
      <div className="group flex bg-white overflow-hidden cursor-pointer">
        {/* LEFT IMAGE */}
        <div className="relative w-[220px] h-[220px] flex-shrink-0">
          <Image
            src={image || "/img/officeview.png"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col justify-between bg-white p-5 flex-1">
          {/* TOP */}
          <div>
            <div className="flex items-center gap-3 mb-2 text-sm">
              <span className="text-orange-500 font-medium">{category}</span>
              <span className="text-gray-400">{date}</span>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600">
              {title}
            </h4>

            <p className="text-gray-600 text-lg">{description}</p>
          </div>

          {/* BOTTOM */}
          <div className="mt-4">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
              <span className="flex items-center gap-1">
                <ThumbsUp size={16} text-orange-500 /> 335 Like
              </span>
              <span className="flex items-center gap-1">
                <ThumbsDown size={16} text-orange-500 /> 30 Dislike
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={16} text-orange-500 /> 10 Comment
              </span>
            </div>

            <span className="text-orange-500 text-sm font-medium flont-underline group-hover:no-underline">
              Read More
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
