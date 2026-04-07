"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";

const cleaningServices = [
  {
    title: "Deep Home Cleaning",
    rating: 4.8,
    reviews: 12000,
    price: 550,
    originalPrice: 650,
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop&q=80",
  },
  {
    title: "Furniture Cleaning",
    rating: 4.7,
    reviews: 8000,
    price: 450,
    originalPrice: 550,
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop&q=80",
  },
  {
    title: "Office Cleaning",
    rating: 4.9,
    reviews: 5000,
    price: 850,
    originalPrice: 950,
    duration: "2 Hours",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop&q=80",
  },
  {
    title: "Post Construction",
    rating: 4.6,
    reviews: 3000,
    price: 1250,
    originalPrice: 1500,
    duration: "4 Hours",
    image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=300&h=200&fit=crop&q=80",
  },
  {
    title: "Bathroom Cleaning",
    rating: 4.8,
    reviews: 15000,
    price: 350,
    originalPrice: 450,
    duration: "30 min",
    image: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=400&h=250&fit=crop&q=80",
  },
];

const DeepCleaningServices = () => {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -307, behavior: "smooth" });
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 307, behavior: "smooth" });
      setCurrentIndex(prev => Math.min(cleaningServices.length - 1, prev + 1));
    }
  };
  
  // Auto scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        const currentScroll = sliderRef.current.scrollLeft;
        
        if (currentScroll >= maxScroll) {
          // Reset to beginning when reaching the end
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
          setCurrentIndex(0);
        } else {
          scrollRight();
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const handleBookService = (serviceTitle: string) => {
    router.push(`/service/${serviceTitle.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Updated Heading */}
        <h2 
          className="text-gray-900 mb-5"
          style={{
            fontSize: '24px',
            fontWeight: '600',
            textAlign: 'left',
            marginBottom: '20px'
          }}
        >
          Deep Cleaning Services
        </h2>

        <div 
          className="relative"
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
        >
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto gap-5 pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none] snap-x"
            style={{ gap: '20px' }}
          >
            {cleaningServices.map((service, index) => (
              <div key={index} className="flex-shrink-0 snap-center">
                <ServiceCard
                  title={service.title}
                  image={service.image}
                  rating={service.rating}
                  reviewCount={service.reviews}
                  price={service.price}
                  originalPrice={service.originalPrice}
                  duration={service.duration}
                  onBook={() => handleBookService(service.title)}
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute left-[-25px] top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex border border-gray-200 text-gray-700 hover:shadow-xl"
            style={{
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={scrollRight}
            className="absolute right-[-25px] top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex border border-gray-200 text-gray-700 hover:shadow-xl"
            style={{
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeepCleaningServices;
