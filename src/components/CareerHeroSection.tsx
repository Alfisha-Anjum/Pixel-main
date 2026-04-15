"use client";

import Image from "next/image";
import GradientButton2 from "./ui/GradientButton2";

export default function CareerHeroSection() {
  return (
    <section className="relative w-[1440px] h-[720px] overflow-visible">
      {/* 🔶 Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ffac96] via-[#ffc296] to-[#ffd496]" />

      {/* 🟠 Circle */}
      <div className="absolute left-[51%] top-24 w-[567px] h-[567px] bg-orange-400/40 rounded-full" />

      {/* 👩 Image */}
      <div className="absolute right-14 bottom-0">
        <Image src="/girl.png" alt="girl" width={700} height={600} />
      </div>

      {/* 📄 Form (OVERFLOW MAGIC) */}
      <div className="absolute left-16 -bottom-20 w-[600px] h-[780px] bg-white rounded-3xl shadow-xl p-10 z-20">
        <h2 className="text-[32px] font-semibold text-center mb-4">
          Apply for a job
        </h2>

        <div className="space-y-5">
          <input
            className="w-full p-3 bg-gray-100 rounded-lg outline-none text-black"
            placeholder="Full Name"
          />
          <input
            className="w-full p-3 bg-gray-100 rounded-lg outline-none"
            placeholder="Contact Number"
          />
          <input
            className="w-full p-3 bg-gray-100 rounded-lg outline-none"
            placeholder="Email Id"
          />
          <input
            className="w-full p-3 bg-gray-100 rounded-lg outline-none"
            placeholder="Looking for Job position"
          />
          <textarea
            className="w-full p-3 bg-gray-100 rounded-lg h-28 outline-none md:h-[300px] overflow-y-auto resize-none"
            placeholder="Experience & Details"
          />
        </div>

        <div className="mt-6 items-center flex justify-center">
          <GradientButton2 text="Send OTP" width="w-[260px]" className="" />
        </div>
      </div>
    </section>
  );
}
