"use client";

import { useRouter } from "next/navigation";
import LayoutContainer from "./LayoutContainer";



const handymanServices = [
  {
    label: "Electrician",
    image: "/electrician.png",
  },
  {
    label: "Carpenter",
    image: "/Carpenter.png",
  },
  {
    label: "Plumber",
    image: "/plumber.png",
  },
  {
    label: "Furniture Assembly & Dismantle",
    image: "/Furniture Assembly & Dismantle.png",
  },
  {
    label: "House Reparer",
    image: "/House Repairer.png",
  },
];

const HandymanServices = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
          Handyman Services
        </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
  {handymanServices.map((service, index) => (
    <div key={index} className="text-center group cursor-pointer">
      
      {/* Image Card */}
      <div className="bg-gray-100 rounded-xl h-36 flex items-center justify-center overflow-hidden">
        <img
          src={service.image}
          alt={service.label}
          className="h-28 object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Label BELOW box */}
      <p className="mt-3 text-sm font-medium text-gray-800">
        {service.label}
      </p>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default HandymanServices;
