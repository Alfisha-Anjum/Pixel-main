export default function AmountSummary() {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="text-[18px] font-semibold mb-4 text-[#666]">
        Amount Summary
      </h3>

      <div className="flex flex-col gap-3 text-[15px]">
        <div className="flex justify-between text-gray-600">
          <span>Total Item (3)</span>
          <span>₹1600</span>
        </div>

        <div className="flex justify-between text-gray-400">
          <span>Total Discount</span>
          <span>₹300</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Coupon Discount</span>
          <span>₹50</span>
        </div>

        <div className="border-t pt-3 mt-2 flex justify-between font-semibold text-[#333]">
          <span>Total Amount</span>
          <span>₹1200</span>
        </div>
      </div>
    </div>
  );
}
