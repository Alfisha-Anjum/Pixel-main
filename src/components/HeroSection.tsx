"use client";

import { Star, Shield, CheckCircle, Award } from "lucide-react";
import Image from "next/image";
import nikImg from "./nik.png";
import kkImg from "./kk.png";

const HeroSection = () => {
  return (
    <div className="max-w-7xl mx-auto mb-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        Home / AC & Appliance Repair / AC Repair
      </div>
      
      {/* Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Left Side - Text */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Best Air Condition (AC)<br />Repair Service in Raipur
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-700 font-semibold">4.8</span>
              <span className="text-gray-500">(2,847 Bookings)</span>
            </div>
          </div>
          
          {/* TASPro Cover Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-gray-900">TASPro Cover</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">30-Day Service Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Verified Technicians</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Best Price Guarantee</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Images */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image src={nikImg} alt="AC Service" fill className="object-cover" />
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image src={kkImg} alt="AC Repair" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
