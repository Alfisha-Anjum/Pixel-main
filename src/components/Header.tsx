"use client";

import { Search, MapPin, User, ChevronDown, Phone, Mic } from "lucide-react";
import { useState } from "react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 w-40">
            <img src="/tas.logo.png" alt="TAS Company" className="" />
          </div>

          {/* Location */}
          <div className="flex items-center border rounded-full overflow-hidden bg-gray-50 max-w-xl w-full">
            {/* Location */}
            <div className="flex items-center gap-2 px-4 py-2 border-r text-sm">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="text-gray-700">Raipur</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            {/* Search */}
            <div className="flex items-center flex-1 px-4">
              <Search className="w-4 h-4 text-gray-400 mr-2" />

              <input
                type="text"
                placeholder='Search for "AC Repair"...'
                className="flex-1 bg-transparent outline-none text-sm"
              />

              <Mic className="w-4 h-4 text-gray-600 cursor-pointer" />
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-orange-500" />
            <span className="text-gray-700 font-medium">7447-0000-45</span>
          </div>

          {/* Login */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-gray-200 p-2 rounded-full">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-gray-700">Login</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
