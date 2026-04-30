"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";

const RateCardPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6 sm:py-8">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          Rate Card
        </h1>

        {/* Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl lg:border border-gray-200 md:p-4 sm:p-0">
          {/* Info Box */}
          <div className="bg-orange-50 text-center py-3 sm:py-4 rounded-md mb-4 sm:mb-6">
            <p className="text-orange-600 text-sm sm:text-base font-medium">
              Labour Charges are capped at ₹499 per appliance
            </p>
          </div>

          {/* Table Wrapper (IMPORTANT for mobile scroll) */}
          <div className="border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-black text-white px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
              <span className="text-sm sm:text-base font-medium">
                Electrical Parts
              </span>
              <ChevronDown size={18} />
            </div>

            {/* Scroll container */}
            <div className="w-full overflow-x-auto">
              <table className="min-w-[500px] w-full text-xs sm:text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      Description
                    </th>
                    <th className="text-left px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      Service Charge
                    </th>
                    <th className="text-left px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      Labour
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {[
                    ["Non-Inverter PCB Repaired", "₹1500", "₹200"],
                    ["Inverter PCB Repaired", "₹4000", "₹200"],
                    ["Replace LVT", "₹900", "₹200"],
                    ["Capacitor 2-5 mfd", "₹250", "₹250"],
                    ["Capacitor 35-50 mfd", "₹250", "₹250"],
                    ["Capacitor 50-60 mfd", "₹250", "₹250"],
                    ["Replace Sensor", "₹250", "₹250"],
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="px-3 sm:px-4 py-2 sm:py-3">{row[0]}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3">{row[1]}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateCardPage;
