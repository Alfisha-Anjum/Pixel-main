"use client";

import {
  ChevronLeft,
  ChevronRight,
  Snowflake,
  Sparkles,
  Hammer,
  Bug,
  SprayCan,
  ClipboardCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ApplianceModal from "./ApplianceModal";
import { useState } from "react";

const services = [
  {
    title: "AC & Appliance Repair",
    icon: Snowflake,
    color: "purple",
    link: "/service/ac-repair",
  },
  {
    title: "Deep Cleaning Services",
    icon: Sparkles,
    color: "blue",
    link: "/service/deep-cleaning",
  },
  {
    title: "Handyman Services",
    icon: Hammer,
    color: "yellow",
    link: "/service/handyman",
  },
  {
    title: "Pest Control & Waterproofing",
    icon: Bug,
    color: "orange",
    link: "/service/pest-control",
  },
  {
    title: "Cleaning Packages",
    icon: SprayCan,
    color: "green",
    link: "/service/cleaning-packages",
  },
  {
    title: "AMC Service Plan",
    icon: ClipboardCheck,
    color: "gray",
    link: "/amc-services",
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { card: string; icon: string }> = {
    purple: {
      card: "bg-purple-50 hover:bg-purple-100",
      icon: "text-purple-600",
    },
    blue: { card: "bg-blue-50 hover:bg-blue-100", icon: "text-blue-600" },
    yellow: {
      card: "bg-yellow-50 hover:bg-yellow-100",
      icon: "text-yellow-600",
    },
    orange: {
      card: "bg-orange-50 hover:bg-orange-100",
      icon: "text-orange-600",
    },
    green: { card: "bg-green-50 hover:bg-green-100", icon: "text-green-600" },
    gray: { card: "bg-gray-50 hover:bg-gray-100", icon: "text-gray-600" },
  };
  return colors[color] || colors.gray;
};
export default function ServiceSection({ data = [] }: { data?: any[] }) {
  const router = useRouter();
  const [showApplianceModal, setShowApplianceModal] = useState(false);

  const finalServices = data.length > 0 ? data : services;
  return (
    <section className="w-full pb-10 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* Left Side - Service Cards */}
          <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col">
            <h2 className="text-2xl md:text-4xl lg:text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-5 leading-[1.2] text-left max-w-[580px]">
              How can we serve you
              <br />
              today?
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-14 xl:pb-0 pb-10">
              {finalServices.map((service, index) => {
                const { card, icon } = getColorClasses(service.color || "blue");
                const Icon = services[index]?.icon || Snowflake;

                return (
                  <div
                    key={service.id || index}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => {
                      if (service.slug?.includes("appliances")) {
                        setShowApplianceModal(true);
                      } else {
                        router.push(`/service/${service.slug}`);
                      }
                    }}
                  >
                    <div
                      className={`${card} w-32 h-24 sm:w-32 sm:h-24 rounded-3xl flex items-center justify-center`}
                    >
                      <Icon className={`w-12 h-12 ${icon}`} />
                    </div>

                    <p className="mt-4 text-sm font-semibold text-gray-800 dark:text-gray-300 text-center">
                      {service.name || service.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Hero Image Banner */}
          <div className="w-full lg:w-[60%] relative h-[300px] lg:h-[450px] rounded-3xl overflow-hidden shadow-xl group lg:ml-8">
            <Image
              src="/heroimage.jpg"
              alt="Home Services"
              fill
              className="object-cover w-full h-full"
              priority
            />

            {/* Slider Navigation Buttons */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 duration-300">
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 duration-300">
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
      <ApplianceModal
        isOpen={showApplianceModal}
        onClose={() => setShowApplianceModal(false)}
      />
    </section>
  );
}
