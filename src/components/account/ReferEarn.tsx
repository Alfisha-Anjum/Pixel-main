"use client";
import Image from "next/image";
import GradientButton2 from "../ui/GradientButton2";
import { useState } from "react";
import RedeemModal from "./Modals/ReedemModal";
import RedeemSuccessModal from "./Modals/ReedemSuccessModal";
import ShareModal from "./Modals/ShareModal";

type Props = {
  setActiveView: (view: string) => void;
};

export default function ReferEarn(ActiveView: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const terms = [
    "The cash bonus offer is available exclusively to Premium subscribers of TASPRO Company.",
    "Only active Premium subscribers are eligible for the cash bonus offer.",
    "To qualify for the cash bonus, Premium subscribers must refer a Service Professional to join TASPRO Company using their unique referral invite link.",
    "The referral invite link can be found in the referral section of the app.",
    "The referred Service Professional must subscribe to a paid plan on TASPRO Company using the Premium subscriber's referral invite link.",
    "The Service Professional must maintain an active subscription for a minimum period of 30 days to qualify for the cash bonus.",
    "The cash bonus amount will be calculated based on a percentage of the Service Professional's subscription fee.",
    "The specific percentage will be determined by TASPRO Company and may vary over time.",
    "The cash bonus will be credited to the Premium subscriber's account upon successful qualification.",
    "Cash bonuses earned through referrals can be redeemed at any time during the Premium subscriber's active subscription period.",
    "The cash bonus can be used towards future payments or withdrawn as cash, subject to TASPRO Company's withdrawal policies.",
    "TASPRO Company reserves the right to review and monitor referral activity for any fraudulent or suspicious behavior.",
    "Any violation of the referral program's terms or abuse of the system may result in disqualification and loss of earned cash bonuses.",
    "TASPRO Company reserves the right to modify or terminate the cash bonus offer at any time, with or without prior notice.",
    "Changes to the offer will be communicated through app notifications or email.",
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 ml-0 lg:ml-14 px-4 lg:px-0">
      {/* Terms Section */}
      <div className="bg-white rounded-lg max-w-3xl mx-auto w-full">
        <ol className="list-decimal list-inside space-y-2 text-[15px] text-[#414141]">
          {terms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ol>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center gap-6 w-full">
        {/* Card */}
        <div className="bg-[#0B0B2A] text-white p-6 rounded-2xl w-[430px] max-w-full flex flex-col items-center gap-6">
          <p className="text-orange-400 text-center font-semibold">
            Refer a Friend & Earn Coins
          </p>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <img src="/icons/fi1.png" alt="rupees" className="w-8 h-8" />
              <span className="text-[24px] font-semibold">453</span>
            </div>
            <p className="text-sm text-gray-300">Your Coins</p>
          </div>

          <div className="flex justify-center items-center w-full">
            <GradientButton2
              text="Redeem"
              width="w-[150px]"
              type="button"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </div>

        {/* Image */}
        <div className="mt-4 flex justify-center">
          <img src="/bro.png" alt="Bro" className="max-w-full h-auto" />
        </div>

        {/* Button */}
        <div className="mt-4 w-full flex justify-center">
          <GradientButton2
            text="Refer a Friend"
            width="w-[390px]"
            type="button"
            onClick={() => setIsShareOpen(true)}
          />
        </div>
      </div>

      <RedeemModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => {
          setIsOpen(false);
          setIsSuccessOpen(true);
        }}
      />
      <RedeemSuccessModal
        isSuccessOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </div>
  );
}
