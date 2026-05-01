"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";

const RateCardPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen ">
      {/* <Header /> */}

      <div className="max-w-7xl mx-auto p-0 md:p-8">
        <h1 className="text-2xl font-semibold mb-6">Rate Card</h1>

        <div className="bg-white rounded-2xl border-0 sm:border-[1px] sm:border-gray-200 p-0 sm:p-6">
          {/* Orange Info Box */}
          <div className="bg-orange-50 text-center py-4 rounded-md mb-6">
            <p className="text-orange-600 font-medium">
              Labour Chares are capped at ₹499 per appliance
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

            {/* Table */}
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3">Description</th>
                  <th className="text-left px-4 py-3">Service Charge</th>
                  <th className="text-left px-4 py-3">Labour</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3">Non-Inverter PCB Repaired</td>
                  <td className="px-4 py-3">₹1500</td>
                  <td className="px-4 py-3">₹200</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Inverter PCB Repaired</td>
                  <td className="px-4 py-3">₹4000</td>
                  <td className="px-4 py-3">₹200</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Replace LVT</td>
                  <td className="px-4 py-3">₹900</td>
                  <td className="px-4 py-3">₹200</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Capacitor 2-5 mfd</td>
                  <td className="px-4 py-3">₹250</td>
                  <td className="px-4 py-3">₹250</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Capacitor 35-50 mfd</td>
                  <td className="px-4 py-3">₹250</td>
                  <td className="px-4 py-3">₹250</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Capacitor 50-60 mfd</td>
                  <td className="px-4 py-3">₹250</td>
                  <td className="px-4 py-3">₹250</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Replace Sensor</td>
                  <td className="px-4 py-3">₹250</td>
                  <td className="px-4 py-3">₹250</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RateCardPage;
