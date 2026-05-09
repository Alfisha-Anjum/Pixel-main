"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronsRight, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import LayoutContainer from "./LayoutContainer";
const appliances = [
  { image: "/10.svg", label: "AC Repair", slug: "ac-repair" },
  { image: "/7.svg", label: "Geyser Repair", slug: "geyser-repair" },
  {
    image: "/9.svg",
    label: "Gas Stove Repair",
    slug: "gas-stove-repair",
  },
  {
    image: "/11.svg",
    label: "Water Cooler Repair",
    slug: "water-cooler-repair",
  },
  {
    image: "/2.svg",
    label: "Washing Machine Repair",
    slug: "washing-machine-repair",
  },
  {
    image: "/6.svg",
    label: "Kitchen Chimney Repair",
    slug: "chimney-repair",
  },
  {
    image: "/8.svg",
    label: "Refrigerator Repair",
    slug: "refrigerator-repair",
  },
  {
    image: "/5.svg",
    label: "Microwave Repair",
    slug: "microwave-repair",
  },
  {
    image: "/3.svg",
    label: "Water Purifier Repair",
    slug: "water-purifier-repair",
  },
  { image: "/4.svg", label: "TV Repair", slug: "tv-repair" },
  { image: "/12.svg", label: "Computer Repair", slug: "computer-repair" },
  { image: "/see-all.png", label: "See All" },
];

// interface ApplianceItem {
//   image: string;
//   label: string;
//   slug?: string;
// }

type ApplianceItem = {
  image: string;
  label: string;
  slug?: string;
};

const AppliancesGrid = ({ data = [] }: { data?: any[] }) => {
  const finalAppliances: ApplianceItem[] =
    data.length > 0
      ? [
          ...data.map((item: any) => ({
            image: item.image || "/10.svg",
            label: item.name,
            slug: item.slug,
          })),
          { image: "/see-all.png", label: "See All" },
        ]
      : appliances;
  const router = useRouter();
  const [modalSource, setModalSource] = useState<"default" | "amc">("default");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const openModal = (event: Event) => {
      const customEvent = event as CustomEvent<{ source?: "default" | "amc" }>;
      setModalSource(customEvent.detail?.source || "default");
      setIsModalOpen(true);
    };

    window.addEventListener("openApplianceModal", openModal as EventListener);

    return () => {
      window.removeEventListener(
        "openApplianceModal",
        openModal as EventListener,
      );
    };
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const getRouteSlug = (slug?: string) => {
  if (!slug) return "";

  if (slug.startsWith("ac-repair")) return "ac-repair";
  if (slug.startsWith("washing-repair")) return "washing-repair";
  if (slug.startsWith("carpenter")) return "carpenter";

  return slug;
};

  const handleCardClick = (item: ApplianceItem) => {
    if (item.label === "See All") {
      setIsModalOpen(true);
    } else if (item.slug) {
    router.push(`/service/${getRouteSlug(item.slug)}`);
    }
  };
  // Filter out "See All" for modal content
  // const modalAppliances = appliances.filter((item) => item.label !== "See All");

  return (
    <section className="w-full py-15">
      <LayoutContainer>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-5">
          Appliances Repair & Service
        </h2>

        {/* Desktop Layout - 6 cards per row */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {finalAppliances.map((appliance, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(appliance)}
                className="flex flex-col items-center text-center gap-3 group cursor-pointer"
              >
                <div className="w-full h-28 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition">
                  <img
                    src={appliance.image}
                    alt={appliance.label}
                    className="h-14 object-contain"
                    
                  />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-tight">
                  {appliance.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet Layout - 3 cards per row */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-4 gap-4 justify-items-center">
            {finalAppliances.map((item, index) => {
              const isAction = item.label === "See All";
              return (
                <div
                  key={index}
                  className="text-center cursor-pointer transition-all duration-300 hover:scale-105 w-full max-w-[180px]"
                  onClick={() => handleCardClick(item)}
                >
                  <div
                    className="flex items-center justify-center w-full"
                    style={{
                      height: "160px",
                      borderRadius: "16px",
                      backgroundColor: "#F3F4F6",
                      padding: "18px",
                    }}
                  >
                    {isAction ? (
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-orange-50 transition-colors">
                        <ChevronsRight className="w-6 h-6 text-orange-500" />
                      </div>
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.label}
                        width={110}
                        height={110}
                        className="object-contain"
                        style={{ objectFit: "contain" }}
                        
                      />
                    )}
                  </div>
                  <p
                    className={`${isAction ? "text-orange-500" : "text-gray-800"} mt-3 text-sm font-medium`}
                  >
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout - 2 cards per row */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 justify-items-center">
            {finalAppliances.map((item, index) => {
              const isAction = item.label === "See All";
              return (
                <div
                  key={index}
                  className="text-center cursor-pointer transition-all duration-300 hover:scale-105 w-full"
                  onClick={() => handleCardClick(item)}
                >
                  <div
                    className="flex items-center justify-center w-full"
                    style={{
                      height: "120px",
                      borderRadius: "12px",
                      backgroundColor: "#F3F4F6",
                      padding: "12px",
                    }}
                  >
                    {isAction ? (
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-orange-50 transition-colors">
                        <ChevronsRight className="w-5 h-5 text-orange-500" />
                      </div>
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.label}
                        width={80}
                        height={80}
                        className="object-contain"
                        style={{ objectFit: "contain" }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/120?text=" +
                            item.label.charAt(0);
                        }}
                      />
                    )}
                  </div>
                  <p
                    className={`${isAction ? "text-orange-500" : "text-gray-800"} mt-2 text-xs font-medium`}
                  >
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </LayoutContainer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[90%] max-w-sm p-5 relative shadow-xl">
            {/* Close Button (inside like image) */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-3 -right-3 bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-md"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-center text-sm font-semibold text-orange-600">
              Appliance Repair & Service
            </h2>

            <p className="text-center text-[11px] text-gray-500 mt-1 mb-4 px-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>

            {/* Grid */}
            <div className="grid grid-cols-4 gap-3">
              {finalAppliances
                .filter((item) => item.label !== "See All")
                .map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      const routeSlug = getRouteSlug(item.slug);

                      if (routeSlug === "ac-repair" && modalSource === "amc") {
                        router.push(
                          `/service/${getRouteSlug(item.slug)}?source=amc`,
                        );
                      } else {
                        router.push(`/service/${getRouteSlug(item.slug)}`);
                      }
                      setIsModalOpen(false);
                    }}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                  >
                    {/* Circle Icon */}
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.label}
                        className="h-7 object-contain"
                      />
                    </div>

                    {/* Label */}
                    <span className="text-[10px] text-center text-gray-600 leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AppliancesGrid;
