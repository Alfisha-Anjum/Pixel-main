"use client";

import PackageCard from "./PackageCard";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LayoutContainer from "./LayoutContainer";

const packages = [
  {
    title: "Looking for Fridge Repair?",
    subtitle: "Professional fridge repair",
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=250&fit=crop",
  },
  {
    title: "AC Servicing",
    subtitle: "Complete AC maintenance",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=250&fit=crop",
  },
  {
    title: "Need an Electrician?",
    subtitle: "Expert electrical solutions",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=250&fit=crop",
  },
  {
    title: "Kitchen Cleaning",
    subtitle: "Complete kitchen deep cleaning",
    image:
      "https://images.unsplash.com/photo-1558629414-1e5e4c5b5d4?w=400&h=250&fit=crop",
  },
];

const CleaningPackage = () => {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
    const [canScroll, setCanScroll] = useState(false);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

    const checkScrollState = () => {
      const slider = sliderRef.current;
      if (!slider) return;
  
      const { scrollLeft, scrollWidth, clientWidth } = slider;
  
      setCanScroll(scrollWidth > clientWidth);
      setAtStart(scrollLeft <= 5);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
    };
  
    useEffect(() => {
      checkScrollState();
  
      const slider = sliderRef.current;
  
      if (slider) {
        slider.addEventListener("scroll", checkScrollState);
      }
  
      window.addEventListener("resize", checkScrollState);
  
      return () => {
        if (slider) {
          slider.removeEventListener("scroll", checkScrollState);
        }
        window.removeEventListener("resize", checkScrollState);
      };
    }, []);
    const checkScrollable = () => {
      const slider = sliderRef.current;
      if (!slider) return;
  
      setCanScroll(slider.scrollWidth > slider.clientWidth);
    };
  
    useEffect(() => {
      checkScrollable();
  
      window.addEventListener("resize", checkScrollable);
  
      return () => {
        window.removeEventListener("resize", checkScrollable);
      };
    }, []);

  return (
    <LayoutContainer>
      <div className="flex justify-between items-center my-5">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Cleaning Package
        </h2>
      </div>

      <div className="relative group">
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none] snap-x items-center"
          style={{ gap: "20px" }}
        >
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="flex-shrink-0 snap-center"
              style={{ width: "382px", height: "228px" }}
            >
              <PackageCard
                title={pkg.title}
                subtitle={pkg.subtitle}
                image={pkg.image}
                onBook={() => router.push("/services")}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={scrollLeft}
          className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex border border-orange-600 text-orange-700"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={scrollRight}
          className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex border border-orange-600 text-orange-700"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </LayoutContainer>
  );
};

export default CleaningPackage;
