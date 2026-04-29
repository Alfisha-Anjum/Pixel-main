"use client";

import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Search, MapPin, User, ChevronDown, Phone, Mic, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";


const Header = () => {
const { user, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await axios.get(
        "https://taskpro.itmingo.com/api/customers/logout",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Logout API failed:", error);
  } finally {
    // ✅ Clear everything no matter what
    localStorage.removeItem("token");
    localStorage.removeItem("customer_id");

    // If you stored user object
    localStorage.removeItem("user");

    // ✅ Clear context (VERY IMPORTANT)
    // login(null); // or logout() if you have it

    // ✅ Redirect
    window.location.href = "/login";
  }
};

  return (
    <header className="bg-[#fafafa] border-b border-gray-200">
      <div className="w-full xl:w-[90%] mx-auto px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 w-40">
            <Link href="/">
              <img src="/tas.logo.png" alt="TAS Company" className="" />
            </Link>
          </div>

          {/* Location */}
          <div className="flex justify-between items-center lg:px-0 px-3 border rounded-full overflow-hidden bg-gray-50 w-full md:max-w-sm lg:max-w-xl">
            {/* LOCATION - hide on small screens */}
            <div className="flex items-center gap-2 px-4 py-2 md:border-r text-sm">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="text-gray-700">Raipur</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            {/* SEARCH */}
            <div className="hidden lg:flex items-center flex-1 px-4">
              {/* Left search icon (only on large screens) */}
              <Search className="hidden lg:block w-4 h-4 text-gray-400 mr-2" />

              <input
                type="text"
                placeholder='Search for "AC Repair"...'
                className="flex-1 bg-transparent outline-none text-sm px-2 
                 placeholder:hidden lg:placeholder:block"
              />

              {/* Right search icon (only on small screens) */}

              {/* Mic icon (only on large screens) */}
              <Mic className="hidden lg:block w-4 h-4 text-gray-600 cursor-pointer" />
            </div>
            <Search className="flex items-center justify-center lg:hidden w-4 h-4 text-gray-600 mr-2 cursor-pointer  " />
          </div>

          {/* Phone */}
          <div className="xl:flex items-center gap-2 hidden">
            <Phone className="w-4 h-4 text-orange-500" />
            <span className="text-gray-700 font-medium">7447-0000-45</span>
          </div>

          {/* Login */}
          {!isClient ? null : user ? (
            <div className="relative group flex items-center gap-2 cursor-pointer">
              {/* Avatar */}
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0">
                <AvatarImage
                  src={user?.profileImage || "/profile.png"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </Avatar>

              {/* Name (desktop only) */}
              <span className="hidden lg:text-base text-[10px] md:inline text-gray-700 font-medium">
                {user.firstName || "Login"}
              </span>

              <ChevronDown className="w-4 h-4 text-gray-500" />

              {/* Dropdown */}
              <div className="absolute right-0 top-10 w-52 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
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

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-orange-50"
                >
                  Logout
                </button>
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
