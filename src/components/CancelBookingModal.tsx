"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: (reason: string) => void;
  booking: any;
}

const CancelBookingModal = ({ isOpen, onClose, onCancel, booking }: CancelBookingModalProps) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [customText, setCustomText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cancellationReasons = [
    "Changed my mind",
    "Found another service provider",
    "No longer need the service",
    "Budget constraints",
    "Schedule conflict",
    "Other reason"
  ];

  const handleSubmit = async () => {
    const reason = selectedReason === "Other reason" ? customText : selectedReason;
    
    if (!reason.trim()) {
      alert("Please select or enter a reason for cancellation");
      return;
    }

    setIsLoading(true);
    try {
      await onCancel(reason);
      onClose();
    } catch (error) {
      console.error("Cancellation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[16px] w-full max-w-sm shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F0F0F0]">
          <h2 className="text-xl font-bold text-[#222]">Cancel Booking</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-orange-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Cancellation Reason Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-[#222] mb-2">
              Cancellation Reason <span className="text-[#FF6B00]">*</span>
            </label>
            <select
              value={selectedReason}
              onChange={(e) => {
                setSelectedReason(e.target.value);
                if (e.target.value !== "Other reason") {
                  setCustomText("");
                }
              }}
              className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] bg-white"
            >
              <option value="">Select a reason</option>
              {cancellationReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

          {/* Textarea for Reason */}
          {selectedReason && (
            <div>
              <label className="block text-sm font-semibold text-[#222] mb-2">
                Please Enter Reason <span className="text-[#FF6B00]">*</span>
              </label>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Please provide more details about why you're cancelling..."
                rows={4}
                className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] resize-none"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-3 p-6 border-t border-[#F0F0F0] bg-[#F9F9F9]">
          <button 
            onClick={onClose}
            className="px-6 py-3 border border-[#DDD] rounded-[10px] text-[#333] font-semibold hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Keep Booking
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isLoading || !selectedReason || (selectedReason === "Other reason" && !customText.trim())}
            className="px-6 py-3 bg-gradient-to-r from-[#FF8C42] to-[#FF6B00] text-white font-semibold rounded-[10px] hover:from-[#FF7B20] hover:to-[#F55900] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? "Cancelling..." : "Cancel Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;