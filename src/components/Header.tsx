"use client";

import { Home, User, ShoppingCart, Menu, X, CircleUserRound } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { NavLink } from "./NavLink";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const { user } = useAuth();
  
  useEffect(() => {
    setIsClient(true);
    // Debug: Log user data when it changes
    console.log("Header - User data:", user);
  }, [user]);
  
  if (!isClient) {
    return (
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/attachment1 1.jpg"
                alt="TAS Pro Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>
            
            {/* Right side - Login Icon */}
            <div className="flex items-center">
              <NavLink href="/login" className="p-2 rounded-full text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors">
                <User className="w-6 h-6" />
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/attachment1 1.jpg"
              alt="TAS Pro Logo"
              className="h-8 w-auto object-contain"
            />
          </Link>
                    
          {/* Center Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <NavLink href="/" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Home</NavLink>
            <NavLink href="/services" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Services</NavLink>
            <NavLink href="/amc-services" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">AMC Service</NavLink>
            <NavLink href="/rate-card" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Rate Card</NavLink>
            <NavLink href="/about" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">About Us</NavLink>
          </nav>
                    
          {/* Right side - Location, Cart and Profile/Login Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex flex-col items-end">
              <div className="text-xs text-gray-600">Raipur</div>
              <div className="text-xs font-medium text-gray-900">+91 98765 43210</div>
            </div>
            <NavLink href="/cart" className="p-2 rounded-full text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </NavLink>
            {user ? (
              <div className="relative group">
                <div className="p-1 rounded-full bg-orange-100 hover:bg-orange-200 transition-colors cursor-pointer">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={user.profileImage || ''} alt="Profile" />
                    <AvatarFallback className="bg-orange-100 text-orange-600">
                      <CircleUserRound className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={user.profileImage || ''} alt="Profile" />
                        <AvatarFallback className="bg-orange-100 text-orange-600">
                          <CircleUserRound className="w-7 h-7" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.firstName && user.lastName 
                            ? `${user.firstName} ${user.lastName}`
                            : user.firstName 
                              ? user.firstName 
                              : "User"}
                        </p>
                        <p className="text-sm text-gray-500">{user.email || user.phone}</p>
                      </div>
                    </div>
                  </div>
                  <NavLink href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Home</NavLink>
                  <NavLink href="/my-booking" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">My Booking</NavLink>
                  <NavLink href="/schedule" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">My Schedule</NavLink>
                  <NavLink href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Account</NavLink>
                  <hr className="my-2 border-gray-200" />
                  <NavLink href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Logout</NavLink>
                </div>
              </div>
            ) : (
              <NavLink href="/login" className="p-2 rounded-full text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors">
                <User className="w-6 h-6" />
              </NavLink>
            )}
                      
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
                    
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-3 z-50">
              <div className="flex flex-col space-y-3 px-4">
                <NavLink href="/" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                <NavLink href="/services" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMenuOpen(false)}>Services</NavLink>
                <NavLink href="/amc-services" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMenuOpen(false)}>AMC Service</NavLink>
                <NavLink href="/rate-card" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMenuOpen(false)}>Rate Card</NavLink>
                <NavLink href="/about" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMenuOpen(false)}>About Us</NavLink>
                <div className="pt-2 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Raipur</div>
                  <div className="text-sm font-medium text-gray-900 mb-3">+91 98765 43210</div>
                  <NavLink href="/cart" className="block py-2 text-gray-700 hover:text-orange-500 font-medium flex items-center" onClick={() => setIsMenuOpen(false)}>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart
                  </NavLink>
                  {user ? (
                    <>
                      <NavLink href="/my-booking" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMenuOpen(false)}>My Booking</NavLink>
                      <NavLink href="/schedule" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMenuOpen(false)}>My Schedule</NavLink>
                      <NavLink href="/account" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMenuOpen(false)}>Account</NavLink>
                      <div className="flex items-center gap-3 py-2" onClick={() => setIsMenuOpen(false)}>
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.profileImage || ''} alt="Profile" />
                          <AvatarFallback className="bg-orange-100 text-orange-600">
                            <CircleUserRound className="w-6 h-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">Profile</p>
                          <p className="text-sm text-gray-500">
                            {user.firstName && user.lastName 
                              ? `${user.firstName} ${user.lastName}`
                              : user.firstName 
                                ? user.firstName 
                                : "User"}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <NavLink href="/login" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;