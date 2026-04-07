"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import RateCardTable from '@/components/RateCardTable';
import { ArrowLeft, Info } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RateCardPage = () => {
  const router = useRouter();

  const handleBackToService = () => {
    router.push('/service/ac-repair');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back button */}
          <button 
            onClick={handleBackToService}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Services</span>
          </button>

          {/* Centered card container */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Top message box */}
            <div className="bg-orange-50 flex items-center justify-center w-1/2 border-orange-400 p-4 m-6 rounded-lg">
              <div className="flex items-center gap-3">
                {/* <Info className="text-orange-500" size={20} /> */}
                <p className="text-orange-800 font-medium">
                  Labour Charges are capped at ₹499 per appliance
                </p>
              </div>
            </div>

            {/* Rate Card Table */}
            <div className="px-6 pb-6">
              <RateCardTable />
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 p-6 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Important Notes</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Prices are inclusive of all taxes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Additional charges may apply for spare parts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Labour charges are maximum capped at ₹499 per appliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Warranty applicable on service and parts as per company policy</span>
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <div className="p-6 border-t border-gray-100">
              <button 
                onClick={handleBackToService}
                className="w-full bg-[#FF6B00] hover:bg-[#e66000] text-white font-bold py-3 rounded-xl transition-all duration-200 active:scale-95"
              >
                Book Service Now
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RateCardPage;