"use client";

import Image from "next/image";
import LayoutContainer from "./LayoutContainer";

const features = [
  {
    id: 1,
    icon: "/assets/service-icon.svg",
    title: "Same Day Service",
    alt: "Service icon"
  },
  {
    id: 2,
    icon: "/assets/verified-serviceman-icon.svg", 
    title: "Verified Serviceman",
    alt: "Verified serviceman icon"
  },
  {
    id: 3,
    icon: "/assets/satisfaction-badge-icon.svg",
    title: "Satisfaction Guaranteed", 
    alt: "Satisfaction badge icon"
  }
];

export default function FeatureSection() {
  return (
    <section className="py-1 bg-white">
      <LayoutContainer>
        {/* Feature Container */}
        <div className="w-full max-w-[1240px] mx-auto h-auto lg:h-[122px] flex flex-col lg:flex-row justify-between items-center gap-[20px] opacity-100 transform-none">
          
          {features.map((feature) => (
            <div
              key={feature.id}
              className="w-full lg:w-[400px] h-[122px] gap-[16px] opacity-100 flex flex-col items-center justify-center text-center bg-transparent transform-none"
            >
              {/* Feature Icon */}
              <div className="w-[64px] h-[64px] relative flex-shrink-0">
                <img
                  src={feature.icon}
                  alt={feature.alt}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              
              {/* Feature Title */}
              <h3 className="mt-[12px] text-[18px] font-semibold text-[#1A1A1A] leading-tight">
                {feature.title}
              </h3>
            </div>
          ))}
          
        </div>
      </LayoutContainer>
    </section>
  );
}
