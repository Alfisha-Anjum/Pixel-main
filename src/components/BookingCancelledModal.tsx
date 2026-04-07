"use client";

import { X, CheckCircle } from "lucide-react";

interface BookingCancelledModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
}

const BookingCancelledModal = ({ isOpen, onClose, booking }: BookingCancelledModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[16px] w-full max-w-sm shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F0F0F0]">
          <h2 className="text-xl font-bold text-[#222]">Booking Cancelled</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-orange-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 text-center">
          {/* Large Orange Circle with White Check */}
          <div className="w-24 h-24 bg-gradient-to-br from-[#FF8C42] to-[#FF6B00] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-[#222] mb-2">Booking Cancelled</h3>
          <p className="text-[#666] text-sm mb-6">
            Your booking has been cancelled successfully
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-[#FF8C42] to-[#FF6B00] text-white rounded-[10px] hover:from-[#FF7B20] hover:to-[#F55900] font-semibold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCancelledModal;