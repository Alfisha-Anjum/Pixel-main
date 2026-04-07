"use client";

import { Star, MessageCircle, Phone, Calendar, Clock, MapPin } from "lucide-react";

interface BookingCardProps {
  service: string;
  subtitle: string;
  rating: number;
  reviews: number;
  date: string;
  time: string;
  status: "Pending" | "Completed" | "Cancelled";
  technicianImage?: string;
  onChat?: () => void;
  onCall?: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
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
  technicianImage = "/placeholder-user.jpg",
  onChat,
  onCall,
  onReschedule,
  onCancel,
  onViewDetails,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return { bg: "bg-orange-100", text: "text-orange-600" };
      case "Completed":
        return { bg: "bg-green-100", text: "text-green-600" };
      case "Cancelled":
        return { bg: "bg-red-100", text: "text-red-600" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-600" };
    }
  };

  const statusColors = getStatusColor(status);

  return (
    <div className="bg-white rounded-[20px] shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* LEFT: Technician Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-3xl overflow-hidden bg-pink-100 flex items-center justify-center">
            <img
              src={technicianImage}
              alt="Technician"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-user.jpg";
              }}
            />
          </div>
        </div>

        {/* RIGHT: Content Column */}
        <div className="flex-1">
          {/* Top Row: Title + Status Badge */}
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-base font-bold text-gray-900">{service}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${statusColors.bg} ${statusColors.text}`}>
              {status}
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-gray-500 mb-2">{subtitle}</p>

          {/* Third Row: Rating + Icons */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="text-sm text-gray-700">
                {rating} | {reviews.toLocaleString()} reviews
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onChat}
                className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={onCall}
                className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-3" />

          {/* Bottom Row: Date & Time */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Date & Time</p>
              <p className="text-sm font-bold text-gray-900">
                {date} | {time}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {onReschedule && (
                <button
                  onClick={onReschedule}
                  className="px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reschedule
                </button>
              )}
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="px-3 py-2 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Cancel
                </button>
              )}
              {onViewDetails && (
                <button
                  onClick={onViewDetails}
                  style={{ backgroundColor: "#FF6B00" }}
                  className="px-3 py-2 text-xs font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
