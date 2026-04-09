"use client";
import Image from "next/image";
import GradientButton2 from "../ui/GradientButton2";
export default function ReferEarn(ActiveView: Props) {
  // components/account/ReferEarn.tsx
  "use client";

  type Props = {
    setActiveView: (view: string) => void;
  };
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
    <div className="flex">
      <div className="p-6 bg-white rounded-lg max-w-3xl mx-auto">
        <ol className="list-decimal list-inside space-y-2 text-[15px] text-[#414141]">
          {terms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ol>
      </div>
      <div>
        <div className="bg-[#0B0B2A] text-white p-6 rounded-2xl w-[350px]">
          <p className="text-orange-400 font-semibold">
            Refer a Friend & Earn Coins
          </p>

          <h2 className="text-2xl mt-2">₹453</h2>
          <p className="text-sm text-gray-300">Your Coins</p>

          <button className="mt-4 px-6 py-2 bg-orange-500 rounded-full">
            Redeem
          </button>
        </div>
        <div>
          <img src="/bro.png" alt="Bro" />
        </div>
        <div>
          <GradientButton2 text="Refer a Friend" width="w-full" type="button" />
        </div>
      </div>
    </div>
  );
}
