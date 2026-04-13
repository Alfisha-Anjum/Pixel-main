"use client";

import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Search, MapPin, User, ChevronDown, Phone, Mic, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <header className="bg-[#fafafa] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 w-40">
            <Link href="/">
              <img src="/tas.logo.png" alt="TAS Company" className="" />
            </Link>
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
          {!isClient ? null : user ? (
            <div className="relative group flex items-center gap-2 cursor-pointer">
              {/* Avatar */}
             <Avatar className="w-8 h-8 sm:w-9 sm:h-9">
  <AvatarImage
    src={user?.profileImage || "/profile.png"}
  />

</Avatar>

              {/* Name (desktop only) */}
              <span className="hidden sm:inline text-gray-700 font-medium">
                {user.firstName || "Login"}
              </span>
<ChevronDown className="w-4 h-4 text-gray-500" />
              {/* Dropdown */}
              <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
                <div className="px-4 py-3 border-b">
                  <p className="font-medium text-gray-900">
                    {user.firstName && user.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user.firstName || "User"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.email || user.phone}
                  </p>
                </div>

                <Link
                  href="/my-booking"
                  className="block px-4 py-2 text-sm hover:bg-orange-50"
                >
                  My Booking
                </Link>
                <Link
                  href="/schedule"
                  className="block px-4 py-2 text-sm hover:bg-orange-50"
                >
                  My Schedule
                </Link>
                <Link
                  href="/account"
                  className="block px-4 py-2 text-sm hover:bg-orange-50"
                >
                  Account
                </Link>

                <hr className="my-2" />

                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm hover:bg-orange-50"
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 sm:gap-2 cursor-pointer"
            >
              <div className="bg-gray-200 p-1.5 sm:p-2 rounded-full">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <span className="hidden sm:inline text-gray-700">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
