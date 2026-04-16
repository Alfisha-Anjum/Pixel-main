import { ChevronDown } from "lucide-react";

export default function CouponCard() {
  return (
    <div className="w-full max-w-[458px] mx-auto p-[1px] rounded-xl bg-gradient-to-r from-[#FEC12D] to-[#FF552C] my-2 md:my-6">
      <div className="bg-white p-3 sm:p-[10px] rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 ml-2">
            <div className="relative w-10 h-10 shrink-0">
              <img
                src="/coupon.png"
                className="absolute w-[22.24px] h-[18.48px] top-[2.62px] left-[2.95px]"
              />
            </div>

            <p className="text-[16px] md:text-[18px] font-semibold text-[#1B1B1B]">
              Hey! you have new coupons
            </p>
          </div>

          <ChevronDown className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-black cursor-pointer" />
        </div>

        <p className="text-[14px] md:text-[16px] text-[#666666] ml-[35px] mt-[4px] md:mt-[6px]">
          Tap to see what you have won
        </p>
      </div>
    </div>
  );
}
