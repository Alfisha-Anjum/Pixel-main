"use client";

import { Star } from "lucide-react";

interface BookingCardProps {
  service: string;
  subtitle: string;
  rating: number;
  reviews: number;
  date: string;
  time: string;
  status: "Pending" | "Completed" | "Cancelled";
  serviceImage?: string;
  onViewDetails?: () => void;
  onChat?: () => void;
  isCompleted?: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({
  service,
  subtitle,
  rating,
  reviews,
  date,
  time,
  status,
  serviceImage = "/ac.png",
  onViewDetails,
  onChat,
  isCompleted = false,
}) => {
  return (
    <div
      onClick={onViewDetails}
      className="bg-white py-5 rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-col w-full justify-between">
        <div className="flex justify-between w-full">
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={serviceImage}
              alt={service}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/service-ac.jpg";
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">
              {service}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

            <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
              <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
              <span>{rating}</span>
              <span className="text-gray-400">| {reviews} reviews</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-6">
            <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-md font-medium">
              {status}
            </span>

            <div className="flex gap-3 items-center justify-center">
              <img
                src="/chat.png"
                alt="chat"
                className="w-5 h-5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onChat?.();
                }}
              />

              <img
                src="/call.png"
                alt="call"
                className="w-5 h-5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </div>
          </div>
        </div>

        <div className="py-2">
          <div className="border-t border-gray-100 my-4"></div>

          <div className="flex justify-between text-xs text-gray-600">
            <span className="text-gray-400">Date & Time</span>
            <span className="font-medium text-gray-800">
              {date} | {time}
            </span>
          </div>
        </div>

        {isCompleted && (
          <>
            <div className="flex justify-between items-center text-sm my-2">
              <span className="text-gray-400">Warranty</span>
              <span className="bg-orange-100 text-orange-600 px-3 py-2 rounded-md text-xs font-medium">
                30 Days Remaining
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Create Rework clicked");
              }}
              className="w-full py-2 my-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium shadow-md hover:opacity-90 transition"
            >
              Create Rework
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
