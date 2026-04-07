"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface AddNewAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    fullName: string;
    contactNumber: string;
    alternateNumber: string;
    postalCode: string;
    state: string;
    city: string;
    houseNo: string;
    location: string;
  }) => void;
}

const AddNewAddressModal = ({
  isOpen,
  onClose,
  onSave
}: AddNewAddressModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    alternateNumber: "",
    postalCode: "",
    state: "",
    city: "",
    houseNo: "",
    location: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.fullName || !formData.contactNumber || !formData.postalCode || 
        !formData.state || !formData.city || !formData.houseNo || !formData.location) {
      alert("Please fill all required fields");
      return;
    }
    onSave(formData);
    // Reset form
    setFormData({
      fullName: "",
      contactNumber: "",
      alternateNumber: "",
      postalCode: "",
      state: "",
      city: "",
      houseNo: "",
      location: ""
    });
  };

  if (!isOpen) return null;

  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California",
    "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[16px] w-full max-w-sm shadow-[0_10px_40px_rgba(0,0,0,0.15)] max-h-[90vh] overflow-y-auto">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-[#F0F0F0] sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-[#222]">Add New Address</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-[#222] mb-2">
              Full Name <span className="text-[#FF6B00]">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] text-sm"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-semibold text-[#222] mb-2">
              Contact Number <span className="text-[#FF6B00]">*</span>
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
              className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] text-sm"
            />
          </div>

          {/* Alternate Number */}
          <div>
            <label className="block text-sm font-semibold text-[#222] mb-2">
              Alternate Number <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="tel"
              name="alternateNumber"
              value={formData.alternateNumber}
              onChange={handleChange}
              placeholder="Enter alternate number"
              className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] text-sm"
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-semibold text-[#222] mb-2">
              Postal Code <span className="text-[#FF6B00]">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Enter postal code"
              className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] text-sm"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold text-[#222] mb-2">
              State <span className="text-[#FF6B00]">*</span>
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] text-sm bg-white"
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-[#222] mb-2">
              City <span className="text-[#FF6B00]">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] text-sm"
            />
          </div>

          {/* House No */}
          <div>
            <label className="block text-sm font-semibold text-[#222] mb-2">
              House No <span className="text-[#FF6B00]">*</span>
            </label>
            <input
              type="text"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleChange}
              placeholder="Enter house number"
              className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] text-sm"
            />
          </div>

          {/* Road / Landmark */}
          <div>
            <label className="block text-sm font-semibold text-[#222] mb-2">
              Road / Landmark <span className="text-[#FF6B00]">*</span>
            </label>
            <textarea
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter full location details"
              className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] text-sm resize-none"
              rows={2}
            />
          </div>
        </div>

        {/* Footer with Buttons */}
        <div className="px-6 py-4 bg-[#F9F9F9] flex gap-3 border-t border-[#F0F0F0]">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-[10px] border border-[#DDD] text-[#333] font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 h-11 rounded-[10px] bg-gradient-to-r from-[#FF8C42] to-[#FF6B00] text-white font-semibold text-sm hover:from-[#FF7B20] hover:to-[#F55900] transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddressModal;
