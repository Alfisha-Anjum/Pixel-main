"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface SelectDateTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (date: string, time: string, notes: string) => void;
}

const timeSlots = [
  "9:00 AM - 12:00 PM",
  "12:00 PM - 3:00 PM",
  "3:00 PM - 6:00 PM",
  "6:00 PM - 9:00 PM",
];

export const SelectDateTimeModal: React.FC<SelectDateTimeModalProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onContinue(selectedDate, selectedTime, notes);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative max-h-96 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Select Date & Time
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Time Slot
            </label>
            <div className="space-y-2">
              {timeSlots.map((slot) => (
                <label
                  key={slot}
                  className="flex items-center p-3 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-orange-500 transition-colors"
                  style={{
                    borderColor:
                      selectedTime === slot ? "#FF6B00" : "#E5E7EB",
                    backgroundColor:
                      selectedTime === slot ? "#FFF4E6" : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    name="time"
                    value={slot}
                    checked={selectedTime === slot}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-semibold text-gray-900">
                    {slot}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Special Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests or notes..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 resize-none"
              rows={3}
            />
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          style={{
            backgroundColor:
              selectedDate && selectedTime ? "#FF6B00" : "#D1D5DB",
          }}
          className="w-full text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
