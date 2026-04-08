export default function CustomerDetails() {
  return (
    <div className="w-[710px] bg-white my-10 p-6 rounded-xl shadow-sm border border-[#E1E1E1]">
      <h3 className="text-[20px] font-semibold mb-4 text-[#666666]">
        Customer Details
      </h3>

      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div className="flex gap-3">
          {/* <MapPin className="text-orange-500" /> */}
          <div className="w-[32px] h-[32px]">
            <img src="/map.png" alt="success" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <p className="text-[18px] font-medium text-[#666666]">
                Mr Tikesh Dewangan{" "}
              </p>
              <div className="flex items-center justify-center w-[68px] h-[28px] bg-[#D9D9D9]">
                <button className="text-black text-[12px]">Home</button>
              </div>
            </div>

            <p className="text-[16px] text-gray-500 text-[#898989]">
              Office No 201, Atlantis Corporate Park, Ring Road No.1,
              Telibandha, Raipur 492001
            </p>
            <p className="text-[16px] text-[#898989] text-sm text-gray-500 mt-1">
              +91 7247799900
            </p>

            <p className="text-[#413EFF] text-[18px] mt-2 cursor-pointer">
              Add Alternate Number
            </p>
          </div>
        </div>

        <button className="w-[180px] h-[44px] p-[1px] rounded-lg bg-gradient-to-r from-[#FEC12D] to-[#FF552C]">
          <span className="flex items-center justify-center w-full h-full bg-white rounded-lg">
            <span className="bg-gradient-to-r from-[#FEC12D] to-[#FF552C] font-semibold bg-clip-text text-transparent font-medium cursor-pointer">
              Change Address
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
