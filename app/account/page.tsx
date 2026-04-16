"use client";
// import AccountLayout from "@/components/account/AccountLayout";

// export default function AccountPage() {
//   return <AccountLayout />;
// }

import { useState } from "react";
import SettingsList from "@/components/account/SettingsList";
import ProfileCard from "@/components/account/ProfileCard";
import GradientButton from "@/components/ui/GradientButton";
import EditProfile from "@/components/account/EditProfile";
import ReferEarn from "@/components/account/ReferEarn";
import LanguageSelectorPage from "@/components/account/LanguageSelectorModal";
import MyWallet from "@/components/account/MyWallet";
import MyReviews from "@/components/account/MyReviews";
import MyCoupon from "@/components/account/MyCoupon";

export default function AccountPage() {
  const [activeView, setActiveView] = useState("default");

  const renderContent = () => {
    switch (activeView) {
      case "editProfile":
        return <EditProfile setActiveView={setActiveView} />;
      case "refer":
        return <ReferEarn setActiveView={setActiveView} />;
      case "language":
        return <LanguageSelectorPage setActiveView={setActiveView} />;
      case "wallet":
        return <MyWallet setActiveView={setActiveView} />;
      case "reviews":
        return <MyReviews setActiveView={setActiveView} />;
      case "coupon":
        return <MyCoupon setActiveView={setActiveView} />;
      default:
        return <SettingsList setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Content */}
      <div className="flex flex-col-reverse lg:flex-row">
        {/* Content */}
        <div className="w-full lg:flex-1">{renderContent()}</div>

        {/* Profile */}
        {activeView === "default" && (
          <div className="w-full lg:w-[390px]">
            <ProfileCard />
          </div>
        )}
      </div>

      {/* Logout Button */}
      {activeView === "default" && (
        <div className="md:mt-10 flex justify-start lg:ml-12">
          <GradientButton
            text="Logout"
            width="w-full max-w-[390px]"
            textClassName="text-[20px] font-medium"
          />
        </div>
      )}
    </div>
  );
}
