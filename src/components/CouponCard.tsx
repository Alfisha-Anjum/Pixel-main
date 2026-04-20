"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CouponCard() {
  const [open, setOpen] = useState(false);

  const coupons = [
    {
      title: "Assured Cashback on Paytm",
      subtitle: "Flat ₹30 Cashback",
    },
    {
      title: "Assured Cashback on CRED",
      subtitle: "Get cashback of ₹10",
    },
    {
      title: "15% off on Kotak Debit Cards",
      subtitle: "15% off up to ₹250",
    },
  ];

  return (
    <div className="w-full md:w-[460px] md:mb-5 rounded-xl border border-orange-300 bg-white shadow-sm">
      {/* HEADER */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-3 py-2 md:px-5 md:py-4 cursor-pointer"
      >
        <div className="flex items-start gap-2">
          <img src="/coupon.png" className="w-5 h-5 md:w-7 md:h-7 mt-[2px]" />

          <div className="leading-tight">
            <p className="text-[14px] md:text-[18px] font-medium text-gray-900">
              Hey! you have a new coupons
            </p>
            <p className="text-[12px] md:text-[16px] text-gray-500">
              Tap to see what you have won
            </p>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 md:w-[32px] md:h-[20px] text-gray-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* DROPDOWN */}
      <div
        className={`transition-all duration-200 overflow-hidden ${
          open ? "max-h-[220px] border-t" : "max-h-0"
        }`}
      >
        <div className="px-3 py-2 space-y-3">
          {coupons.map((item, index) => (
            <div key={index} className="flex gap-2">
              <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px]">
                %
              </div>

              <div>
                <p className="text-[12px] font-medium text-gray-800">
                  {item.title}
                </p>
                <p className="text-[11px] text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
