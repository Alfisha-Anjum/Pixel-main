"use client";
// import AccountLayout from "@/components/account/AccountLayout";

// export default function AccountPage() {
//   return <AccountLayout />;
// }

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import SettingsList from "@/components/account/SettingsList";
import ProfileCard from "@/components/account/ProfileCard";
import GradientButton from "@/components/ui/GradientButton";
import EditProfile from "@/components/account/EditProfile";
import ReferEarn from "@/components/account/ReferEarn";
import LanguageSelectorPage from "@/components/account/LanguageSelectorModal";
import MyWallet from "@/components/account/MyWallet";
import MyReviews from "@/components/account/MyReviews";
import MyCoupon from "@/components/account/MyCoupon";
import Payment from "@/components/account/Payment";
import { useEffect } from "react";
import axios from "axios";



export default function AccountPage() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState("default");
  const [profile, setProfile] = useState<any>(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://taskpro.itmingo.com/api/customers/profile",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.status) {
        setProfile(res.data.data);
      }
    } catch (error) {
      console.log("Profile fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case "editProfile":
        return (
          <EditProfile
            setActiveView={setActiveView}
            profile={profile}
            fetchProfile={fetchProfile}
          />
        );
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
      case "payment":
        return <Payment setActiveView={setActiveView} />;
      default:
        return <SettingsList setActiveView={setActiveView} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login to View Account
          </h2>
          <a
            href="/login"
            className="text-orange-600 font-medium hover:underline"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      {/* Content */}
      <div className="flex flex-col-reverse lg:flex-row">
        {/* Content */}
        <div className="w-full lg:flex-1">{renderContent()}</div>

        {/* Profile */}
        {activeView === "default" && (
          <div className="w-full lg:w-[390px]">
            <ProfileCard profile={profile} />
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
