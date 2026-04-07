"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface SelectCapacityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (capacity: string) => void;
}

const capacities = [
  { capacity: "1 Ton", price: 3500 },
  { capacity: "1.5 Ton", price: 4200 },
  { capacity: "2 Ton", price: 5000 },
  { capacity: "2.5 Ton", price: 5800 },
];

export const SelectCapacityModal: React.FC<SelectCapacityModalProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [customCapacity, setCustomCapacity] = useState("");

  if (!isOpen) return null;

  const handleContinue = () => {
    if (selectedCapacity || customCapacity) {
      onContinue(customCapacity || selectedCapacity!);
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
          Select AC Capacity
        </h2>

        <div className="space-y-3 mb-6">
          {capacities.map((item) => (
            <div
              key={item.capacity}
              className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all"
              style={{
                borderColor:
                  selectedCapacity === item.capacity ? "#FF6B00" : "#E5E7EB",
                backgroundColor:
                  selectedCapacity === item.capacity
                    ? "#FFF4E6"
                    : "transparent",
              }}
              onClick={() => {
                setSelectedCapacity(item.capacity);
                setCustomCapacity("");
              }}
            >
              <span className="font-semibold text-gray-900">
                {item.capacity}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-green-600 font-bold">₹{item.price}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCapacity(item.capacity);
                    setCustomCapacity("");
                  }}
                  style={{ backgroundColor: "#FF6B00" }}
                  className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Manual Capacity Input
          </label>
          <input
            type="text"
            placeholder="Enter custom capacity"
            value={customCapacity}
            onChange={(e) => {
              setCustomCapacity(e.target.value);
              if (e.target.value) setSelectedCapacity(null);
            }}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
          />
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedCapacity && !customCapacity}
          style={{
            backgroundColor:
              selectedCapacity || customCapacity ? "#FF6B00" : "#D1D5DB",
          }}
          className="w-full text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:cursor-not-allowed"
        >
          Done
        </button>
      </div>
    </div>
  );
};
