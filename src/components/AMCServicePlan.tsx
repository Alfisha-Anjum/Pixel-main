"use client";

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import LayoutContainer from "./LayoutContainer";

const amcPlans = [
  {
    title: "Looking for Fridge Repair?",
    subtitle: "",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80",
  },
  {
    title: "AC Servicing",
    subtitle: "AC Service repair at your doorstep",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
  },
  {
    title: "Need for Electrician",
    subtitle: "Electric Service at your doorstep",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
  },
];

const AMCServicePlan = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const slidesToShow = {
    desktop: 3,
    tablet: 2,
    mobile: 1,
  };

  const slideWidth = {
    desktop: 100 / slidesToShow.desktop,
    tablet: 100 / slidesToShow.tablet,
    mobile: 100,
  };

  const getSlidesToShow = () => {
    if (typeof window === "undefined") return slidesToShow.desktop;
    if (window.innerWidth >= 1024) return slidesToShow.desktop;
    if (window.innerWidth >= 768) return slidesToShow.tablet;
    return slidesToShow.mobile;
  };

  const scrollLeft = () => {
    if (!sliderRef.current) return;
    const slidesToShowCount = getSlidesToShow();
    const slideWidthPercent = 100 / slidesToShowCount;
    const newSlide = (currentSlide - 1 + amcPlans.length) % amcPlans.length;
    setCurrentSlide(newSlide);
    sliderRef.current.scrollTo({
      left: (newSlide * sliderRef.current.offsetWidth) / slidesToShowCount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;
    const slidesToShowCount = getSlidesToShow();
    const slideWidthPercent = 100 / slidesToShowCount;
    const newSlide = (currentSlide + 1) % amcPlans.length;
    setCurrentSlide(newSlide);
    sliderRef.current.scrollTo({
      left: (newSlide * sliderRef.current.offsetWidth) / slidesToShowCount,
      behavior: "smooth",
    });
  };

  const startAutoScroll = () => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(() => {
      if (!isPaused) {
        scrollRight();
      }
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [isPaused]);

  useEffect(() => {
    const handleResize = () => {
      const slidesToShowCount = getSlidesToShow();
      sliderRef.current?.scrollTo({
        left: (currentSlide * sliderRef.current.offsetWidth) / slidesToShowCount,
        behavior: "smooth",
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide]);

  return (
    <section className="w-full bg-white py-5">
      <LayoutContainer className="relative">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">
          AMC Service Plan
        </h2>

        {/* Navigation Arrows */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex border border-orange-600 text-orange-700"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex border border-orange-600 text-orange-700"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div
          ref={sliderRef}
          className="flex overflow-hidden gap-1 snap-x"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Duplicate slides for infinite loop effect */}
          {[...amcPlans, ...amcPlans].map((plan, index) => (
            <div
              key={index}
              className="min-w-[100%] sm:min-w-[50%] lg:min-w-[33.333%] flex-shrink-0 snap-center"
            >
              <div className="relative w-[382px] h-[228px] rounded-[12px] overflow-hidden shadow-2xl group">
                {/* Background Image */}
                <Image
                  src={plan.image}
                  alt={plan.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end items-start">
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                    {plan.title}
                  </h3>
                  {plan.subtitle && (
                    <p className="text-gray-200 text-sm mb-4 font-medium">
                      {plan.subtitle}
                    </p>
                  )}
                  
                  <button className="mt-2 px-5 py-2.5 border border-orange-500 text-orange-500 rounded-[8px] font-medium bg-transparent hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center gap-2">
                    Book Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {amcPlans.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const slidesToShowCount = getSlidesToShow();
                setCurrentSlide(index);
                sliderRef.current?.scrollTo({
                  left: (index * sliderRef.current.offsetWidth) / slidesToShowCount,
                  behavior: "smooth",
                });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-orange-500 w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
};

export default AMCServicePlan;
