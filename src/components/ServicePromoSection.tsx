"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import LayoutContainer from "./LayoutContainer";

export default function ServicePromoSection() {
  const router = useRouter();

  return (
    <section className="pt-5 ">
      <LayoutContainer>
        <div
          className="relative overflow-hidden shadow-xl xl:py-0 py-5 px-5 sm:px-10"
          style={{
            width: "100%",
            // height: "340px",
            borderRadius: "24px",
            background: "linear-gradient(to right, #ff6b35, #ffa500)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // padding: "0 60px",
            gap: "10px",
          }}
        >
          {/* Left Content */}
          <div
            className="flex flex-col justify-center z-20"
            style={{
              maxWidth: "520px",
            }}
          >
            <h2
              className="font-semibold text-white mb-2 leading-tight text-xl md:text-2xl lg:text-3xl xl:text-4xl"
            >
              Appliances <br />
              Suraksha Packages
            </h2>
            <h3
              className="font-medium text-white mb-2 sm:text-lg text-sm"
          
            >
              All Major Appliances Covered
            </h3>
            <p
              className="text-white/80 mb-4 leading-relaxed line-clamp-3 sm:line-clamp-none text-xs sm:text-sm"
         
            >
              Protect your home appliances with our comprehensive coverage
              plans. Experience peace of mind with 24/7 support and certified
              technicians at your doorstep.
            </p>
            <button
              onClick={() => router.push("/services")}
              className="group font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer flex items-center gap-2 bg-white text-orange-600"
              style={{
                padding: "10px 24px",
                fontSize: "14px",
                marginTop: "16px",
                alignSelf: "flex-start",
              }}
            >
              Book Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Image */}
          <div
            className="relative hidden lg:flex items-center justify-end overflow-hidden"
            style={{
              height: "100%",
              flex: 1,
            }}
          >
            <img
              src="/image.png"
              alt="Home Appliances Collection"
              style={{
                height: "100%",
                objectFit: "contain",
                maxWidth: "100%",
              }}
            />
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
