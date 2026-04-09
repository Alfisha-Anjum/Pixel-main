import { ChevronDown } from "lucide-react";

export default function CouponCard() {
  return (
    <div className="w-[458px] p-[1px] rounded-xl bg-gradient-to-r from-[#FEC12D] to-[#FF552C] my-10">
      <div className="bg-white p-[10px] rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center ml-2">
            <div className="relative w-10 h-10 shrink-0">
              <img
                src="/coupon.png"
                className="absolute w-[22.24px] h-[18.48px] top-[2.62px] left-[2.95px]"
              />
            </div>

            <p className="text-[18px] font-semibold text-[#1B1B1B]">
              Hey! you have new coupons
            </p>
          </div>

          <ChevronDown className="w-[24px] h-[24px] text-black cursor-pointer" />
        </div>

        <p className="text-[16px] text-[#666666] ml-[35px] mt-[6px]">
          Tap to see what you have won
        </p>
      </div>
    </div>
  );
}
