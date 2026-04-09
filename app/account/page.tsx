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

export default function AccountPage() {
  const [activeView, setActiveView] = useState("default");

  const isEditProfile = activeView === "editProfile";

  const isRefer = activeView === "refer";

  const renderContent = () => {
    switch (activeView) {
      case "editProfile":
        return <EditProfile setActiveView={setActiveView} />;
      case "refer":
        return <ReferEarn setActiveView={setActiveView} />;
      // case "editProfile":
      //   return <EditProfile />;
      default:
        return <SettingsList setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="w-full bg-[#f9f9f9]">
      {/* Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Settings FIRST on desktop */}
        <div className="order-2 lg:order-1 flex-1">{renderContent()}</div>
        {activeView === "default" && (
          <div className="order-1 lg:order-2 lg:w-[390px]">
            <ProfileCard />
          </div>
        )}
      </div>

      {activeView === "default" && (
        <div className="mt-10 flex justify-left ml-12">
          <GradientButton
            text="Logout"
            width="w-full max-w-[390px]"
            height="h-[56px]"
            textClassName="text-[20px] font-medium"
          />
        </div>
      )}
    </div>
  );
}
