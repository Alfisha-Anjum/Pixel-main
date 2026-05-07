"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
interface ApplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any[];
}

const ApplianceModal = ({
  isOpen,
  onClose,
  data = [],
}: ApplianceModalProps) => {
  const finalAppliances =
    data.length > 0
      ? data.map((item) => ({
          image: item.icon,
          label: item.name,
          slug: item.slug,
        }))
      : appliances.filter((item) => item.label !== "See All");
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-sm p-5 relative shadow-xl">
        {/* Close Button (inside like image) */}
        <button
          onClick={onClose}
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
          {finalAppliances.map((item, i) => (
            <a
              key={i}
              href={`/service/${item.slug?.startsWith("ac-repair") ? "ac-repair" : item.slug}`}
              className="flex flex-col items-center gap-1"
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
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplianceModal;
