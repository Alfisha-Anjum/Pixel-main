// "use client";

// import { Home, Calendar, Package, User } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// interface AccountSidebarProps {
//   className?: string;
// }

// export const AccountSidebar = ({ className = "" }: AccountSidebarProps) => {
//   const pathname = usePathname();

//   const navItems = [
//     {
//       href: "/",
//       icon: Home,
//       label: "Home",
//     },
//     {
//       href: "/schedule",
//       icon: Calendar,
//       label: "My Schedule",
//     },
//     {
//       href: "/my-booking",
//       icon: Package,
//       label: "Bookings",
//     },
//     {
//       href: "/account",
//       icon: User,
//       label: "Account",
//     },
//   ];

//   const isActive = (href: string) => {
//     if (href === "/account") {
//       return pathname === "/account" || pathname.startsWith("/account/");
//     }
//     return pathname === href;
//   };

//   return (
//     <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
//       <nav className="space-y-2">
//         {navItems.map((item) => {
//           const Icon = item.icon;
//           const active = isActive(item.href);

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
//                 active
//                   ? "bg-orange-50 text-orange-600 border border-orange-100"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               <Icon className="w-5 h-5" />
//               <span>{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  icon: string;
  label: string;
  href: string;
};

export default function AccountSidebar() {
  const pathname = usePathname();

  const menu: MenuItem[] = [
    { icon: "/icons/Home.png", label: "Home", href: "/" },
    { icon: "/icons/to-do.png", label: "My Schedule", href: "/schedule" },
    { icon: "/icons/Calender.png", label: "Bookings", href: "/my-booking" },
    { icon: "/icons/profile.png", label: "Account", href: "/account" },
  ];

  return (
    <div
      className="
    hidden md:flex flex-col gap-4
    bg-white rounded-2xl border border-gray-200

    md:w-[80px] lg:w-[250px]   // 👈 FIX
    md:px-3 lg:px-6
    md:py-6 lg:py-10
    h-fit
  "
    >
      {menu.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-[10px] px-3 py-2 rounded-xl transition md:justify-center lg:justify-start group"
          >
            {/* ICON */}
            <div className="relative w-[32px] h-[32px]">
              <img
                src={item.icon}
                alt={item.label}
                className={`w-[32px] h-[32px] object-contain ${
                  isActive
                    ? "opacity-0"
                    : "brightness-0 invert-[75%] group-hover:opacity-0"
                }`}
              />

              <div
                className={`absolute inset-0 bg-gradient-to-r from-[#FEC12D] to-[#FF552C] transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                style={{
                  WebkitMaskImage: `url(${item.icon})`,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  WebkitMaskSize: "contain",
                }}
              />
            </div>

            {/* TEXT */}
            <span
              className={`
                text-[16px] font-bold whitespace-nowrap
                md:hidden lg:block
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#FEC12D] to-[#FF552C] bg-clip-text text-transparent"
                    : "text-[#C1C1C1] hover:bg-gradient-to-r hover:from-[#FEC12D] hover:to-[#FF552C] hover:bg-clip-text hover:text-transparent"
                }
              `}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
