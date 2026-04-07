"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import LayoutContainer from "./LayoutContainer";

const appliances = [
  { title: "AC Repair", image: "/service-icons/ac.svg" },
  { title: "Geyser Repair", image: "/service-icons/geyser.svg" },
  { title: "Gas Stove Repair", image: "/service-icons/gas-stove.svg" },
  { title: "Water Cooler Repair", image: "/service-icons/water-cooler.svg" },
  { title: "Washing Machine Repair", image: "/service-icons/washing-machine.svg" },
  { title: "Kitchen Chimney Repair", image: "/service-icons/chimney.svg" },
  { title: "Refrigerator Repair", image: "/service-icons/refrigerator.svg" },
  { title: "Microwave Repair", image: "/service-icons/microwave.svg" },
  { title: "Water Purifier Repair", image: "/service-icons/water-purifier.svg" },
  { title: "TV Repair", image: "/service-icons/tv.svg" },
  { title: "Computer Repair", image: "/service-icons/computer.svg" },
  { title: "See All", isAction: true },
];

const AppliancesGrid = () => {
  const router = useRouter();

  return (
    <section className="w-full bg-white py-15">
      <LayoutContainer>
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">
          Appliances Repair & Service
        </h2>

        {/* Desktop Layout - 6 cards per row */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-6 gap-4 justify-items-center">
            {appliances.map((item, index) => (
              <div
                key={index}
                className="text-center cursor-pointer transition-all duration-300 hover:scale-105 w-full max-w-[160px]"
                onClick={() => router.push("/services")}
              >
                {/* Card */}
                <div
                  className="flex items-center justify-center w-full"
                  style={{ 
                    height: '140px',
                    borderRadius: '16px',
                    backgroundColor: '#F3F4F6',
                    padding: '16px'
                  }}
                >
                  {item.isAction ? (
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-orange-50 transition-colors">
                      <ChevronsRight className="w-6 h-6 text-orange-500" />
                    </div>
                  ) : (
                    <Image
                      src={item.image || ""}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="object-contain"
                      style={{ objectFit: 'contain' }}
                      onError={(e) => {
                        // Fallback to a placeholder if image is missing
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/120?text=" + item.title.charAt(0);
                      }}
                    />
                  )}
                </div>
                
                {/* Title Text */}
                <p 
                  className={`${item.isAction ? 'text-orange-500' : 'text-gray-800'}`}
                  style={{ 
                    marginTop: '10px',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#222'
                  }}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet Layout - 3 cards per row */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-3 gap-4 justify-items-center">
            {appliances.map((item, index) => (
              <div
                key={index}
                className="text-center cursor-pointer transition-all duration-300 hover:scale-105 w-full max-w-[180px]"
                onClick={() => router.push("/services")}
              >
                {/* Card */}
                <div
                  className="flex items-center justify-center w-full"
                  style={{ 
                    height: '160px',
                    borderRadius: '16px',
                    backgroundColor: '#F3F4F6',
                    padding: '18px'
                  }}
                >
                  {item.isAction ? (
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-orange-50 transition-colors">
                      <ChevronsRight className="w-6 h-6 text-orange-500" />
                    </div>
                  ) : (
                    <Image
                      src={item.image || ""}
                      alt={item.title}
                      width={110}
                      height={110}
                      className="object-contain"
                      style={{ objectFit: 'contain' }}
                      onError={(e) => {
                        // Fallback to a placeholder if image is missing
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/120?text=" + item.title.charAt(0);
                      }}
                    />
                  )}
                </div>
                
                {/* Title Text */}
                <p 
                  className={`${item.isAction ? 'text-orange-500' : 'text-gray-800'}`}
                  style={{ 
                    marginTop: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#222'
                  }}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout - 2 cards per row */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-3 justify-items-center">
            {appliances.map((item, index) => (
              <div
                key={index}
                className="text-center cursor-pointer transition-all duration-300 hover:scale-105 w-full"
                onClick={() => router.push("/services")}
              >
                {/* Card */}
                <div
                  className="flex items-center justify-center w-full"
                  style={{ 
                    height: '120px',
                    borderRadius: '12px',
                    backgroundColor: '#F3F4F6',
                    padding: '12px'
                  }}
                >
                  {item.isAction ? (
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-orange-50 transition-colors">
                      <ChevronsRight className="w-5 h-5 text-orange-500" />
                    </div>
                  ) : (
                    <Image
                      src={item.image || ""}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="object-contain"
                      style={{ objectFit: 'contain' }}
                      onError={(e) => {
                        // Fallback to a placeholder if image is missing
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/120?text=" + item.title.charAt(0);
                      }}
                    />
                  )}
                </div>
                
                {/* Title Text */}
                <p 
                  className={`${item.isAction ? 'text-orange-500' : 'text-gray-800'}`}
                  style={{ 
                    marginTop: '8px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#222'
                  }}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
};

export default AppliancesGrid;
