"use client";

import {
  User,
  MapPin,
  Wallet,
  CreditCard,
  Globe,
  Bell,
  Moon,
  Star,
  Ticket,
  Gift,
  StarIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Toggle from "./Toggle";
import { SelectAddressModal } from "../booking-flow/SelectAddressModal";
import AddNewAddressModal from "../AddNewAddressModal";

type ItemProps = {
  icon: string;
  text: string;
  onClick: () => void;
};
type Props = {
  setActiveView: (view: string) => void;
};

export default function SettingsList({ setActiveView }: Props) {
  const [dark, setDark] = useState(false);
  const [notify, setNotify] = useState(true);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="w-full max-w-[390px] mx-auto lg:ml-12 px-4 lg:px-0">
      {/* ===== Account Settings ===== */}
      <h2 className="text-[20px] font-semibold text-[#1B1B1B] dark:text-white mb-4">
        Account Settings
      </h2>

      <div className="">
        <Item
          icon={<User className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
          text="Edit Profile"
          onClick={() => setActiveView("editProfile")}
        />

        <Item
          icon={<MapPin className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
          text="Saved Address"
          onClick={() => setIsAddressModalOpen(true)}
        />

        <Item
          icon={<Wallet className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
          text="My Wallet"
          onClick={() => setActiveView("wallet")}
        />

        <Item
          icon={
            <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          }
          text="Saved Payment Methods"
          onClick={() => setActiveView("payment")}
        />

        <Item
          icon={<Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
          text="Change Language"
          onClick={() => setActiveView("language")}
        />

        {/* Divider */}
        <div className="border-t border-[#E1E4E8] dark:border-gray-700] " />

        <Toggle
          icon={
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-orange-500 transition" />
          }
          text="Notification Setting"
          state={notify}
          setState={setNotify}
        />

        <Toggle
          icon={
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-orange-500 transition" />
          }
          text="Dark Mode"
          state={dark}
          setState={setDark}
        />
      </div>

      {/* ===== My Activity ===== */}
      <h3 className="text-[20px] font-semibold text-[#1B1B1B] dark:text-white mt-8 mb-4">
        My Activity
      </h3>

      <div className="">
        <Item
          icon={
            <StarIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          }
          text="My Rating & Reviews"
          onClick={() => setActiveView("reviews")}
        />
        <div className="border-t border-[#E1E4E8] dark:border-gray-700] " />
        <Item
          icon={<Ticket className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
          text="My Coupons"
          onClick={() => setActiveView("coupon")}
        />
        <div className="border-t border-[#E1E4E8] dark:border-gray-700] " />
        <Item
          icon={<Gift className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
          text="Refer & Earn"
          onClick={() => setActiveView("refer")}
        />
      </div>
      <SelectAddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddNew={() => {
          setIsAddressModalOpen(false);
          setIsAddModalOpen(true);
        }}
        onContinue={() => {}}
      />
      <AddNewAddressModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

function Item({ icon, text, onClick }: ItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between py-3 cursor-pointer group"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
          {icon}
        </div>

        <span className="text-[16px] text-[#1B1B1B] dark:text-gray-200 font-medium group-hover:text-orange-500 transition">
          {text}
        </span>
      </div>
    </div>
  );
}
// function Item({ icon, text, href }: ItemProps) {
//   return (
//     <Link href={href}>
//       <div className="flex items-center justify-between px-4 py-3 cursor-pointer group">
//         <div className="flex items-center gap-3">
//           <Image src={icon} alt={text} width={20} height={20} />
//           <span className="text-[16px] text-[#1B1B1B] font-medium whitespace-nowrap group-hover:text-orange-500 transition">
//             {text}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }
