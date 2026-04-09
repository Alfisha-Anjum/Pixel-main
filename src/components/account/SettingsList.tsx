"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Toggle from "./Toggle";

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

  return (
    <div className="w-full max-w-[390px] ml-12">
      {/* ===== Account Settings ===== */}
      <h2 className="text-[20px] font-semibold text-[#1B1B1B] mb-4">
        Account Settings
      </h2>

      <div className="">
        <Item
          icon="/icons/user.png"
          text="Edit Profile"
          onClick={() => setActiveView("editProfile")}
        />
        <div className="border-t border-[#E1E4E8] " />
        <Item
          icon="/icons/save.png"
          text="Saved Address"
          onClick={() => setActiveView("editProfile")}
        />
        <div className="border-t border-[#E1E4E8] " />
        <Item
          icon="/icons/wallet.png"
          text="My Wallet"
          onClick={() => setActiveView("editProfile")}
        />
        <div className="border-t border-[#E1E4E8] " />

        <Item
          icon="/icons/language.png"
          text="Change Language"
          onClick={() => setActiveView("editProfile")}
        />

        {/* Divider */}
        <div className="border-t border-[#E1E4E8] " />

        <Toggle
          icon="/icons/setting.png"
          text="Notification Setting"
          state={notify}
          setState={setNotify}
        />
        <div className="border-t border-[#E1E4E8] " />
        <Toggle
          icon="/icons/toggle.png"
          text="Dark Mode"
          state={dark}
          setState={setDark}
        />
      </div>

      {/* ===== My Activity ===== */}
      <h3 className="text-[20px] font-semibold text-[#1B1B1B] mt-8 mb-4">
        My Activity
      </h3>

      <div className="">
        <Item
          icon="/icons/rating.png"
          text="My Rating & Reviews"
          onClick={() => setActiveView("editProfile")}
        />
        <div className="border-t border-[#E1E4E8] " />
        <Item
          icon="/icons/coupon.png"
          text="My Coupon"
          onClick={() => setActiveView("editProfile")}
        />
        <div className="border-t border-[#E1E4E8] " />
        <Item
          icon="/icons/refer.png"
          text="Refer & Earn"
          onClick={() => setActiveView("refer")}
        />
      </div>
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
        <Image src={icon} alt={text} width={20} height={20} />
        <span className="text-[16px] text-[#1B1B1B] font-medium group-hover:text-orange-500 transition">
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
