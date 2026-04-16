export default function AmountSummary() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border w-full">
      <h3 className="text-[18px] md:text-[20px] font-semibold mb-4 text-[#666666]">
        Amount Summary
      </h3>
      <div className="flex flex-col gap-3 sm:gap-4 mt-2">
        <div className="text-[16px] md:text-[18px] flex justify-between text-[#666666]">
          <span>Total Item (3)</span>
          <span>₹1600</span>
        </div>

        <div className="text-[16px] md:text-[18px] flex justify-between text-gray-400">
          <span>Total Discount</span>
          <span>₹300</span>
        </div>

        <div className="text-[16px] md:text-[18px] flex justify-between text-green-600">
          <span>Coupon Discount</span>
          <span>₹50</span>
        </div>

        <div className="text-[16px] md:text-[18px] flex justify-between mt-3 sm:mt-4 font-semibold text-[#666666]">
          <span>Total Amount</span>
          <span>₹1200</span>
        </div>
      </div>
    </div>
  );
}
