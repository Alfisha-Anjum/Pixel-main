"use client";

import { Home, Calendar, Package, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AccountSidebarProps {
  className?: string;
}

export const AccountSidebar = ({ className = "" }: AccountSidebarProps) => {
  const pathname = usePathname();
  
  const navItems = [
    {
      href: "/",
      icon: Home,
      label: "Home",
    },
    {
      href: "/schedule",
      icon: Calendar,
      label: "My Schedule",
    },
    {
      href: "/my-booking",
      icon: Package,
      label: "Bookings",
    },
    {
      href: "/account",
      icon: User,
      label: "Account",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/account") {
      return pathname === "/account" || pathname.startsWith("/account/");
    }
    return pathname === href;
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                active
                  ? "bg-orange-50 text-orange-600 border border-orange-100"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};