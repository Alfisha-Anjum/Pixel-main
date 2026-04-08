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
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-600";
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div
      onClick={onViewDetails}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition cursor-pointer"
    >
      {/* Image */}
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

      {/* Content */}
      <div className="flex-1">
        {/* Top Row */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">
              {service}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
          </div>

          <span
            className={`text-[10px] px-2.5 py-1 rounded-md font-medium ${getStatusColor(
              status,
            )}`}
          >
            {status}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
          <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
          <span>{rating}</span>
          <span className="text-gray-400">| {reviews} reviews</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-2"></div>

        {/* Date Time */}
        <div className="flex justify-between text-xs text-gray-600">
          <span className="text-gray-400">Date & Time</span>
          <span className="font-medium text-gray-800">
            {date} | {time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
