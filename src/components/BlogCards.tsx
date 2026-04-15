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
  onReadMore?: () => void;
};

export default function BlogCard({
  category,
  date,
  title,
  description,
  image,
  href = "#",
  onReadMore,
}: BlogCardProps) {
  return (
    <Link href={href}>
      <div className="group flex bg-#F9F9F9 overflow-hidden cursor-pointer m-4">
        {/* LEFT IMAGE */}
        <div className="relative w-[242px] h-[237px] flex-shrink-0">
          <Image
            src={image || "/img/officeview.png"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col justify-between bg-[#F9F9F9] p-5 flex-1">
          {/* TOP */}
          <div>
            <div className="flex items-center gap-3 mb-2 text-sm">
              <span className="font-medium bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent">
                {category}
              </span>
              <span className="text-gray-400">{date}</span>
            </div>

            <h4 className="text-[14px] font-semibold text-gray-900 mb-2 group-hover:text-orange-600">
              {title}
            </h4>

            <p className="text-gray-600 text-[16px]">{description}</p>
          </div>

          {/* BOTTOM */}
          <div className="mt-4">
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-2">
              {/* LIKE */}
              <span className="flex items-center gap-2 group cursor-pointer">
                <img
                  src="/like.png"
                  alt="like"
                  className="w-4 h-4 bg-white p-[2px]"
                />
                <span className="">335 Like</span>
              </span>

              {/* DISLIKE */}
              <span className="flex items-center gap-2 group cursor-pointer">
                <img
                  src="/unlike.png"
                  alt="dislike"
                  className="w-4 h-4 bg-white p-[2px]"
                />

                <span className="">30 Dislike</span>
              </span>

              {/* COMMENT */}
              <span className="flex items-center gap-2 group cursor-pointer">
                <img
                  src="/comment.png"
                  alt="comment"
                  className="w-4 h-4 bg-white p-[2px]"
                />

                <span className="">10 Comment</span>
              </span>
            </div>

            <button
              onClick={onReadMore}
              className="text-sm font-medium underline bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent group-hover:no-underline"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
