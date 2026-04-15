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
    roadLandmark: string;
  }) => void;
}

const AddNewAddressModal = ({
  isOpen,
  onClose,
  onSave,
}: AddNewAddressModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    alternateNumber: "",
    postalCode: "",
    state: "",
    city: "",
    houseNo: "",
    location: "",
    roadLandmark: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (
      !formData.fullName ||
      !formData.contactNumber ||
      !formData.postalCode ||
      !formData.state ||
      !formData.city ||
      !formData.houseNo ||
      !formData.location
    ) {
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
      location: "",
      roadLandmark: "",
    });
  };

  if (!isOpen) return null;

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 relative">
        {/* Header with Close Button */}

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div
          className="max-h-[75vh] overflow-y-auto pr-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
            Add New Address
          </h2>
          <p className="text-gray-600 mb-2 text-center">
            Please fill in all the required fields to add a new address.
          </p>
          <div className="space-y-5 mt-4">
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
                className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] text-sm bg-gray-50"
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
                className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] text-sm bg-gray-50"
              />
            </div>

            {/* Alternate Number */}
            <div>
              <label className="block text-sm font-semibold text-[#222] mb-2">
                Alternate Number{" "}
                {/* <span className="text-gray-400">(Optional)</span> */}
              </label>
              <input
                type="tel"
                name="alternateNumber"
                value={formData.alternateNumber}
                onChange={handleChange}
                placeholder="Enter alternate number"
                className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] text-sm bg-gray-50"
              />
            </div>

            {/* Postal Code */}
            <div className="grid grid-cols-2 gap-3">
              {/* Postal Code */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                />
              </div>

              {/* Location Input */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Use my Location
                </label>

                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                  />

                  {/* Location Icon */}
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 cursor-pointer">
                    📍
                  </span>
                </div>
              </div>
            </div>
            {/* State */}
            <div className="grid grid-cols-2 gap-3">
              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  State *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                >
                  <option value="">State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
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
                className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] text-sm bg-gray-50"
              />
            </div>

            {/* Road / Landmark */}
            <div>
              <label className="block text-sm font-semibold text-[#222] mb-2">
                Road / Landmark <span className="text-[#FF6B00]">*</span>
              </label>
              <input
                name="roadLandmark"
                value={formData.roadLandmark}
                onChange={handleChange}
                placeholder="Enter full location details"
                className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] text-sm resize-none bg-gray-50"
                // rows={2}
              />
            </div>
          </div>

          {/* Footer with Buttons */}
          <div className="px-6 py-4 flex gap-3 border-t border-[#F0F0F0]">
            <button
              onClick={handleSave}
              className="flex-1 h-11 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6B00] text-white font-semibold text-sm hover:from-[#FF7B20] hover:to-[#F55900] transition-all"
            >
              Continue
            </button>
          </div>
        </div>
        {/* Content */}
      </div>
    </div>
  );
};

export default AddNewAddressModal;
