"use client";

import { X } from "lucide-react";

interface AMCDurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (duration: string) => void;
}

const amcOptions = [
  { duration: "1 Month", value: "1m" },
  { duration: "6 Month", value: "6m" },
  { duration: "12 Month", value: "12m", recommended: true },
];

export const AMCDurationModal: React.FC<AMCDurationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Select AMC Duration
        </h2>

        <div className="space-y-3 mb-6">
          {amcOptions.map((option) => (
            <div
              key={option.value}
              className="relative flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-orange-300"
              onClick={() => onConfirm(option.value)}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900">
                  {option.duration}
                </span>
                {option.recommended && (
                  <span
                    style={{ backgroundColor: "#22C55E" }}
                    className="text-white text-xs font-bold px-3 py-1 rounded-full"
                  >
                    Recommended
                  </span>
                )}
              </div>
              <button
                style={{ backgroundColor: "#FF6B00" }}
                className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Select
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{ backgroundColor: "#FF6B00" }}
          className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Done
        </button>
      </div>
    </div>
  );
};
