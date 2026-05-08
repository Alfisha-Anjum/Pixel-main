"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ChevronRight,
  Star,
  Plus,
  Minus,
  Trash2,
  Check,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ServiceSummaryCard } from "@/components/ServiceSummaryCard";
import { CartSummaryCard } from "@/components/CartSummaryCard";
import { SubServiceCard } from "@/components/SubServiceCard";
import { CapacitySelectionModal } from "@/components/CapacitySelectionModal";
import { AMCDurationModal } from "@/components/AMCDurationModal";
import { useBooking, CartItem } from "@/context/BookingContext";
import { SERVICES_DATA } from "@/data/services";

import { Clock } from "lucide-react";
import DeepCleaningServices from "@/components/DeepCleaningServices";
import OnDemandServices from "@/components/OnDemandServices";
import Link from "next/link";
import ServiceDetailsModal from "@/components/ServiceDetailsModal";
import { SelectCapacityModal } from "@/components/booking-flow/SelectCapacityModal";
import ServiceSection from "@/components/ServiceSection";
import ServicesSection from "@/components/ServicesSection";
import { useSearchParams } from "next/navigation";
// import { useBooking, CartItem } from "@/context/BookingContext";



// interface CartItemService extends Service {
//   quantity: number;
// }



type SubService = {
  id: number | string;
  name: string;
  description?: string;
  image: string;
  rating: number;
  reviews: number;
  duration: string;
  discountedPrice: number;
  originalPrice: number;
};

type CartItemService = SubService & {
  quantity: number;
};
// AC Repair Component
const ACRepairLayout = () => {
  const [showCoupons, setShowCoupons] = useState(false);
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  // const [selectedService, setSelectedService] = useState(null);

  const params = useParams();
  const slug = params?.slug as string;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  const [activeTab, setActiveTab] = useState(service?.types[0]?.id || "");
  const [cartItems, setCartItems] = useState<CartItemService[]>([]);
  // const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<SubService | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const [showAMCModal, setShowAMCModal] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const source = searchParams?.get("source") || "";
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [activeScroll, setActiveScroll] = useState<"tabs" | "brands">("tabs");

  
  const checkScrollState = (ref: React.RefObject<HTMLDivElement>) => {
    const slider = ref.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;

    setCanScroll(scrollWidth > clientWidth);
    setAtStart(scrollLeft <= 5);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  };
  useEffect(() => {
    const slider = brandsRef.current;
    if (!slider) return;

    const handleScroll = () => {
      setActiveScroll("brands");
      checkScrollState(brandsRef);
    };

    slider.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => checkScrollState(brandsRef));

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const slider = tabsRef.current;
    if (!slider) return;

    const handleScroll = () => {
      setActiveScroll("tabs");
      checkScrollState(tabsRef);
    };

    slider.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => checkScrollState(tabsRef));

    checkScrollState(tabsRef);

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const checkScrollable = () => {
    const slider = tabsRef.current;
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10); // 10px threshold
  };

  // Scroll left function

  const faqData = [
    {
      question:
        "There are many variation of passages of lorem ipsum available?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nunc diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque ut congue ligula.",
    },
    {
      question:
        "There are many variation of passages of lorem ipsum available?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nunc diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque ut congue ligula.",
    },
    {
      question:
        "There are many variation of passages of lorem ipsum available?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nunc diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque ut congue ligula.",
    },
    {
      question:
        "There are many variation of passages of lorem ipsum available?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nunc diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque ut congue ligula.",
    },
  ];
  // Scroll right function
  const brands = [
    {
      name: "VOLTAS",
      logo: "/volt.png", // Replace with your actual image path
      service: "Voltas AC Repair & Service",
      width: 132,
      height: 27,
    },
    {
      name: "DAIKIN",
      logo: "/daikin.png",
      service: "Daikin AC Repair & Service",
      width: 132,
      height: 27,
    },
    {
      name: "Samsung",
      logo: "/sam.png",
      service: "Samsung AC Repair & Service",
      width: 132,
      height: 27,
    },
    {
      name: "Blue Star",
      logo: "/blueStar.png",
      service: "Blue Star AC Repair & Service",
      width: 132,
      height: 27,
    },
    {
      name: "HITACHI",
      logo: "/hit.png",
      service: "Hitachi AC Repair & Service",
      width: 132,
      height: 27,
    },
    {
      name: "MITSUBISHI",
      logo: "/mits.png",
      service: "Mitsubishi AC Repair & Service",
      width: 132,
      height: 27,
    },
  ];

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);
    checkScrollPosition();
    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);
  // Initial check

  const reviews = [
    {
      id: 1,
      name: "Tikesh Dewangan",
      stars: 5,
      timeAgo: "1m ago",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nunc diam. Vestibulum ante ipsum primis in faucibus orci luctus.",
    },
    {
      id: 2,
      name: "Tikesh Dewangan",
      stars: 5,
      timeAgo: "1m ago",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nunc diam. Vestibulum ante ipsum primis in faucibus orci luctus.",
    },
  ];

  // const servicesData: Record<string, Service[]> = {
  //   split: [
  //     {
  //       id: 1,
  //       title: "Split AC Service",
  //       description: "Complete service including cleaning and maintenance",
  //       rating: 4.9,
  //       reviewCount: 856,
  //       duration: "45 mins",
  //       price: 2999,
  //       originalPrice: 3999,
  //       image:
  //         "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2069&auto=format&fit=crop",
  //     },
  //     {
  //       id: 2,
  //       title: "Split AC Repair",
  //       description: "Repair for compressor, gas refill, electrical issues",
  //       rating: 4.7,
  //       reviewCount: 654,
  //       duration: "1-2 hours",
  //       price: 3499,
  //       originalPrice: 4999,
  //       image:
  //         "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=2070&auto=format&fit=crop",
  //     },
  //     {
  //       id: 3,
  //       title: "Split AC Installation",
  //       description: "Professional installation of new AC units",
  //       rating: 4.8,
  //       reviewCount: 432,
  //       duration: "2-3 hours",
  //       price: 1999,
  //       originalPrice: 2999,
  //       image:
  //         "https://images.unsplash.com/photo-1621905252507-b354bcadcabc?q=80&w=2069&auto=format&fit=crop",
  //     },
  //   ],
  //   window: [
  //     {
  //       id: 4,
  //       title: "Window AC Service",
  //       description: "Complete cleaning and maintenance service",
  //       rating: 4.8,
  //       reviewCount: 623,
  //       duration: "40 mins",
  //       price: 2499,
  //       originalPrice: 3499,
  //       image:
  //         "https://images.unsplash.com/photo-1581092795856-3d5bba5c2b2e?q=80&w=2070&auto=format&fit=crop",
  //     },
  //     {
  //       id: 5,
  //       title: "Window AC Repair",
  //       description: "Comprehensive repair for all window AC issues",
  //       rating: 4.6,
  //       reviewCount: 412,
  //       duration: "1-2 hours",
  //       price: 2999,
  //       originalPrice: 4499,
  //       image:
  //         "https://images.unsplash.com/photo-1578945037312-59f1dd5d5332?q=80&w=2070&auto=format&fit=crop",
  //     },
  //   ],
  //   cassette: [
  //     {
  //       id: 6,
  //       title: "Cassette AC Service",
  //       description: "Professional service for cassette AC units",
  //       rating: 4.9,
  //       reviewCount: 287,
  //       duration: "60 mins",
  //       price: 3999,
  //       originalPrice: 5499,
  //       image:
  //         "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
  //     },
  //     {
  //       id: 7,
  //       title: "Cassette AC Installation",
  //       description: "Expert installation for commercial spaces",
  //       rating: 4.8,
  //       reviewCount: 156,
  //       duration: "3-4 hours",
  //       price: 4999,
  //       originalPrice: 6999,
  //       image:
  //         "https://images.unsplash.com/photo-1578945037312-59f1dd5d5332?q=80&w=2070&auto=format&fit=crop",
  //     },
  //   ],
  // };

  // const tabs = [
  //   { id: "split", label: "Split AC" },
  //   { id: "window", label: "Window AC" },
  //   { id: "cassette", label: "Cassette AC" },
  // ];

  const tabsRef = useRef<HTMLDivElement | null>(null);
  const reviewsRef = useRef<HTMLDivElement | null>(null);
  const brandsRef = useRef<HTMLDivElement | null>(null);

  const tabs = service?.types || [];

  const currentType = service?.types.find((t) => t.id === activeTab);
  const currentServices = currentType?.subServices || [];
  // const { addToCart } = useBooking();

 const addToCart = (service: SubService) => {
   setCartItems((prev: CartItemService[]) => {
     const existing = prev.find((item) => item.id === service.id);

     if (existing) {
       return prev.map((item) =>
         item.id === service.id
           ? { ...item, quantity: item.quantity + 1 }
           : item,
       );
     }

     const newItem: CartItemService = {
       ...service,
       quantity: 1,
     };

     return [...prev, newItem];
   });
 };

 const updateQuantity = (id: number | string, quantity: number) => {
   if (quantity === 0) {
     removeFromCart(id);
   } else {
     setCartItems((prev) =>
       prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
     );
   }
 };

 const removeFromCart = (id: number | string) => {
   setCartItems((prev) => prev.filter((item) => item.id !== id));
 };

const getTotalPrice = () => {
  return cartItems.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0,
  );
};

  const totalSavings = cartItems.reduce(
    (acc, item) =>
      acc + (item.originalPrice + 50 - item.discountedPrice) * item.quantity,
    0,
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right",
  ) => {
    if (!ref.current) return;

    const width = ref.current.offsetWidth;

    ref.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-5">
          {/* Breadcrumb */}
          <div className="text-sm sm:text-base md:text-lg text-gray-600 py-4">
            <Link href="/" className="hover:text-[#FF6A00]">
              Home
            </Link>
            {/* 
            {service?.category && (
              <>
                <span className="mx-2">/</span>
                <Link
                  href={`/services/${service.categorySlug}`}
                  className="hover:text-[#FF6A00]"
                >
                  {service.category}
                </Link>
              </>
            )} */}

            {service?.name && (
              <>
                <span className="mx-2">/</span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {service.name}
                </span>
              </>
            )}
          </div>

          {/* Responsive Hero Layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white leading-snug">
                Best {service?.name} <br />
                Service in {service?.city || "Your City"}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm sm:text-base">
                <Star className="w-5 h-5 fill-orange-500 text-orange-500" />

                <span className="font-semibold text-gray-900 dark:text-white">
                  {service?.rating || 0}
                </span>

                <span className="text-gray-600 dark:text-gray-300">
                  ({service?.reviews || 0} reviews)
                </span>

                <span className="text-gray-400">|</span>

                <span className="font-semibold text-gray-900 dark:text-white">
                  {service?.bookings || 0}
                </span>

                <span className="text-gray-600 dark:text-gray-300">
                  (Bookings in {service?.city || "Your City"})
                </span>
              </div>

              {/* Cover Card */}
              <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl p-4 mt-6 relative max-w-lg">
                {/* Badge */}
                <div className="absolute -top-3 left-5 bg-white px-3 py-1 border rounded-lg flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    TAS<span className="text-orange-500">Pro</span> Cover
                  </span>
                </div>

                {/* Items */}
                <div className="mt-5 space-y-3">
                  <div className="flex justify-between items-center border rounded-xl px-4 py-3">
                    <div className="flex gap-2 items-center">
                      <span>🏅</span>
                      <span className="text-sm text-gray-500">
                        {service?.warranty || "No warranty info"}
                      </span>
                    </div>
                    <span>›</span>
                  </div>

                  <div className="flex justify-between items-center border rounded-xl px-4 py-3">
                    <div className="flex gap-2 items-center">
                      <span>💳</span>
                      <Link
                        href="/rate-card"
                        className="text-sm text-gray-500 hover:text-orange-600"
                      >
                        Standard rate card no hidden charges
                      </Link>
                    </div>
                    <span>›</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative w-full h-[300px] sm:h-[320px] md:h-[420px] lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/heroimage.jpg"
                  alt="Hero"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full max-w-7xl pt-5 xl:px-2 px-5 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-5">
          {/* Left Column - Categories */}
          <div className="">
            <div className="rounded-xl ">
              {/* <h3 className="text-lg font-bold text-gray-900 mb-4">
                AC Service Categories
              </h3> */}
              <div className="relative w-full flex items-center mb-5">
                {/* Left Button */}
                {activeScroll === "tabs" && canScroll && !atStart && (
                  <button
                    onClick={() => scroll(tabsRef, "left")}
                    className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 bg-white shadow-lg rounded-full items-center justify-center hover:bg-gray-50 border border-[#FF6A00] z-20"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#FF6A00]" />
                  </button>
                )}
                {/* Scroll Container */}
                <div
                  ref={tabsRef}
                  className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth hide-scrollbar px-1 sm:px-12 w-full"
                >
                  {tabs.map((tab) => (
                    <div key={tab.id} className="flex-shrink-0 w-1/2 ">
                      <div
                        onClick={() => setActiveTab(tab.id)}
                        className={`cursor-pointer rounded-xl p-4 text-center transition-all duration-200 border ${
                          activeTab === tab.id
                            ? "border-[#FF6A00] shadow-md"
                            : "border-gray-200 hover:shadow-sm hover:border-gray-300"
                        }`}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) =>
                          (e.key === "Enter" || e.key === " ") &&
                          setActiveTab(tab.id)
                        }
                      >
                        <div className="mb-2 text-2xl sm:text-3xl">
                          {tab.icon}
                        </div>

                        <div
                          className={`text-sm sm:text-base font-medium ${
                            activeTab === tab.id
                              ? "text-[#FF6A00]"
                              : "text-gray-700"
                          }`}
                        >
                          {tab.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Button */}
                {activeScroll === "tabs" && canScroll && !atEnd && (
                  <button
                    onClick={() => scroll(tabsRef, "right")}
                    className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 bg-white shadow-lg rounded-full items-center justify-center hover:bg-gray-50 border border-[#FF6A00] z-20"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#FF6A00]" />
                  </button>
                )}
                <style jsx>{`
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                  .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                `}</style>
              </div>
            </div>
            <div className="lg:col-span-6 mt-14">
              <div className="">
                {currentServices.map((subService) => (
                  <div
                    key={subService.id}
                    className="border-b py-2 sm:w-[80%] w-full lg:max-w-lg "
                  >
                    {/* Category Title (Split AC etc) */}
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                      {currentType?.name}
                    </h3>

                    <div className="flex gap-4">
                      {/* LEFT IMAGE + ADD */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-28 h-28 rounded-lg overflow-hidden">
                          <Image
                            src={subService.image}
                            alt={subService.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <button
                          // onClick={() => addToCart(service)}
                          onClick={() => {
                            if (source === "amc") {
                              setSelectedService(subService);
                              setShowCapacityModal(true);
                            } else {
                              addToCart(subService);
                            }
                          }}
                          className="-mt-4 border z-10 border-orange-500 text-orange-500 px-4 py-1 rounded-lg text-sm font-medium bg-white shadow-sm"
                        >
                          Add
                        </button>
                      </div>

                      {/* RIGHT CONTENT */}
                      <div className="flex-1">
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-md">
                          30 Days Warranty
                        </span>
                        <div className=" w-[60%] flex justify-between items-start sm:flex-row flex-col">
                          <div>
                            {/* Title */}
                            <h4 className="font-semibold text-gray-900 dark:text-white mt-1">
                              {subService.name}
                            </h4>

                            {/* Rating + Time */}
                            <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                              <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                              <span>
                                {typeof subService.rating === "number"
                                  ? subService.rating.toFixed(1)
                                  : "0.0"}
                              </span>
                              <span>
                                ({Math.round(subService.reviews / 1000)}m
                                reviews)
                              </span>
                            </div>
                            <div className=" flex gap-2 py-2">
                              {" "}
                              <Clock className="w-4 h-4" />
                              <p className="text-xs text-gray-700">
                                {" "}
                                {subService.duration} approx
                              </p>
                            </div>
                          </div>
                          {/* Warranty Badge */}

                          {/* Price Row */}
                          <div className="flex  flex-col mt-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                ₹{subService.discountedPrice}
                              </span>
                              {subService.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                  ₹{subService.originalPrice}
                                </span>
                              )}
                            </div>

                            <span className="text-green-600 text-xs font-medium">
                              30% off
                            </span>
                          </div>
                        </div>

                        {/* Description Points */}
                      </div>
                    </div>

                    <div>
                      <ul className="text-xs text-gray-500 mt-2 space-y-1">
                        <li>
                          • Get 2X deeper dust removal with Foam + PowerJet
                          technology
                        </li>
                        <li>
                          • Intense cleaning of both indoor & outdoor units
                        </li>
                      </ul>

                      {/* More Details */}
                      <p
                        onClick={() => {
                          setSelectedService(subService);
                          setShowModal(true);
                        }}
                        className="text-blue-600 text-xs mt-2 cursor-pointer"
                      >
                        More Details {">>"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5 sticky top-20">
                {cartItems.length === 0 ? (
                  <div className="text-center">
                    <Image
                      src="/pana.png"
                      alt="Empty Cart"
                      width={200}
                      height={200}
                      className="mx-auto mb-4"
                    />
                    <p className="text-gray-600 font-medium mb-2">
                      Your Cart is empty
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Cart Header */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Cart
                    </h3>

                    {/* Cart Items */}
                    <div className="space-y-4 mb-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-3 items-center gap-2"
                        >
                          {/* Title */}
                          <div className="truncate">
                            <p className="text-sm text-gray-400 truncate">
                              {item.name}
                            </p>
                          </div>

                          {/* Quantity */}
                          <div className="flex justify-end">
                            <div className="flex items-center border border-orange-500 h-6 gap-3 px-2 rounded-md">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="text-orange-500"
                              >
                                -
                              </button>

                              <span className="text-sm">{item.quantity}</span>

                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="text-orange-500"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">
                              ₹{item.discountedPrice * item.quantity}
                            </p>
                            <p className="text-xs text-gray-400 line-through">
                              ₹{item.originalPrice + 50}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className=" pt-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">
                          ₹
                          {cartItems.reduce(
                            (acc, item) =>
                              acc + item.discountedPrice * item.quantity,
                            0,
                          )}
                        </p>
                        <p className="text-green-600 text-xs font-semibold">
                          You save ₹{totalSavings} on this order
                        </p>
                      </div>

                      <button className="bg-orange-500 text-white px-5 py-3 rounded-lg text-sm font-medium">
                        <Link href="/cart">View Cart</Link>
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="border rounded-xl p-5 mb-6">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">
                  Why TASPro Company
                </h4>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      src="/y1.png" // 👈 your image path
                      alt="check"
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs text-gray-600">
                      Trained & skilled technician serviceman
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      src="/y2.png"
                      alt="check"
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs text-gray-600">
                      100% satisfaction guaranteed
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      src="/y3.png"
                      alt="check"
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs text-gray-600">
                      On time service delivery
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/y4.png"
                      alt="check"
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs text-gray-600">
                      Quality assured service
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/y5.png"
                      alt="check"
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs text-gray-600">
                      Best price guaranteed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/y6.png"
                      alt="check"
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs text-gray-600">
                      Hassle free work
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-6 border border-orange-500 rounded-xl px-4 py-3">
                {/* Header */}
                <button
                  onClick={() => setShowCoupons(!showCoupons)}
                  className="w-full flex items-center justify-between "
                >
                  <div className="flex gap-4">
                    <div className=" ">
                      <img src="/coupon.png" />
                    </div>
                    <div className="flex flex-col gap-2 items-start ">
                      {" "}
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Coupons & Offer
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        Save upto 15% on every booking
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      showCoupons ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expand Section */}
                {showCoupons && (
                  <div className="mt-8 space-y-4">
                    {/* Item 1 */}
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-white text-xs">
                        %
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-gray-800">
                          Assured Cashback on Paytm
                        </p>
                        <p className="text-xs text-gray-500">
                          Flat ₹30 Cashback
                        </p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-white text-xs">
                        %
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Assured Cashback on CRED
                        </p>
                        <p className="text-xs text-gray-500">
                          Get cashback of ₹10
                        </p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-3 pb-6">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-white text-xs">
                        %
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          15% off on Kotak Debit Cards
                        </p>
                        <p className="text-xs text-gray-500">
                          15% off up to ₹250
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* {cartItems.length > 0 && (
              <div className="border-t mt-6 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-900">
                    Total: ₹{getTotalPrice()}
                  </span>
                </div>
                <button className="w-full bg-[#FF6A00] text-white py-3 rounded-lg font-semibold hover:opacity-95 transition-opacity">
                  Proceed to Checkout
                </button>
              </div>
            )} */}
            </div>
          </div>
          {/* Middle Column - Service Cards */}

          {/* Right Column - Cart */}
        </div>
        <div className=" w-full mx-auto mb-2">
          {/* Testimonial Card - Background filter isolated */}
          <div className="relative max-w-7xl text-center  rounded-2xl p-0 sm:p-6 md:p-8 overflow-visible">
            {/* Background image layer with brightness filter only */}
            <div
              className="absolute inset-0 z-0 hidden md:block"
              style={{
                backgroundImage: "url('/wht.png')",
                backgroundSize: "auto 518px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "brightness(0.7)",
                borderRadius: "16px",
              }}
            />

            {/* Content layer - all text now white */}
            <div className="relative z-10">
              <h2 className="text-lg md:block hidden md:text-2xl font-semibold text-white text-right mb-2">
                What our Customers Say?
              </h2>
              <h2 className="md:hidden block text-left ">Reviews</h2>
              {/* Rating Summary - text white */}
              <div className="hidden md:flex items-center justify-end gap-2 mb-8">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-semibold text-white">4.5</span>
                <span className="text-sm text-white/80">(12M Reviews)</span>
              </div>
              <div className="md:hidden flex items-center justify-start gap-2 mb-8">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-semibold ">4.5</span>
                <span className="text-sm">(12M Reviews)</span>
              </div>
              <div className="flex flex-col max-w-4xl mx-auto">
                <div
                  ref={reviewsRef}
                  className="flex flex-col md:flex-row w-full mx-auto bg-transparent rounded-2xl gap-10 sm:gap-4 md:gap-8 pb-5 md:overflow-x-auto"
                >
                  {reviews.map((review, idx) => (
                    <div key={review.id}>
                      {/* Review card */}
                      <div className="flex items-start bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl p-4 ">
                        {/* Avatar */}
                        <div className="flex">
                          <div className="relative w-20 h-20 rounded-full overflow-hidden -top-12 -left-6">
                            <Image
                              src={"/tiku.png"}
                              alt={review.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                              priority={false}
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-white text-base md:text-lg ">
                            {review.name}
                          </h3>

                          {/* Stars */}
                          <div className="flex items-center mt-1.5 gap-0.5">
                            <div className="flex text-yellow-400 gap-0.5">
                              {[...Array(review.stars)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="w-4 h-4 fill-current"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>

                          {/* Timestamp */}
                          <div className="mt-1.5 flex items-center">
                            <span className="text-white text-xs font-medium tracking-wide">
                              {review.timeAgo}
                            </span>
                          </div>

                          {/* Review text */}
                          <p className="text-white text-left leading-relaxed font-thin text-[15px] mt-3">
                            {review.text}
                          </p>
                        </div>
                      </div>

                      {/* Divider (except after last review) */}
                      {/* {idx < reviews.length - 1 && (
                      <div className="relative my-6 md:my-7">
                        <div className="border-t border-white/10"></div>
                      </div>
                    )} */}
                    </div>
                  ))}
                </div>

                <div className="my-8 mb-0 md:mb-10 relative flex items-start justify-start">
                  <p className="inline-flex items-center text-[#FF6A00] font-medium">
                    View All Reviews 
                    <svg
                      className=" h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <svg
                      className=" h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
            {/* {canScroll && !atStart && (
            <button
              onClick={() => scroll(reviewsRef, "left")}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-orange-600 shadow-lg rounded-full hidden items-center justify-center hover:bg-gray-50 transition-colors z-20  md:flex"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-6 h-6 text-orange-600" />
            </button>
 )} */}
            {/* Right Chevron Button */}
            {/* 
{canScroll && !atEnd && (
            <button
              onClick={() => scroll(reviewsRef, "right")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-orange-600 shadow-lg rounded-full hidden items-center justify-center hover:bg-gray-50 transition-colors z-20  md:flex"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-6 h-6 text-orange-600" />
            </button>
)} */}
          </div>

          {/* Global styles for hiding scrollbar */}

          {/* View All Reviews Link */}
        </div>
        <div className="mx-auto relative w-full overflow-hidden">
          {/* Heading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800  mb-5 px-4 sm:px-0">
            We covered AC Brand
          </h2>

          {/* Scrollable container */}
          <div
            ref={brandsRef}
            className="flex overflow-x-auto hide-scrollbar scroll-smooth gap-4 px-4 sm:px-6 md:px-10 pb-2"
          >
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center "
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center text-center border w-full h-28">
                  <div className="relative h-[60px] w-full flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={brand.width}
                      height={brand.height}
                      className="object-contain max-h-[60px]"
                      priority={index < 4}
                    />
                  </div>
                </div>

                <p className="text-xs mt-2 dark:text-white text-center w-full line-clamp-2">
                  {brand.service}
                </p>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          {activeScroll === "brands" && canScroll && !atStart && (
            <button
              onClick={() => scroll(brandsRef, "left")}
              className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-orange-600 shadow-lg rounded-full items-center justify-center hover:bg-gray-50 transition-colors z-20 hidden md:flex"
              aria-label="Previous brands"
            >
              <ChevronLeft className="w-6 h-6 text-orange-600" />
            </button>
          )}
          {/* Right Arrow */}
          {activeScroll === "brands" && canScroll && !atStart && (
            <button
              onClick={() => scroll(brandsRef, "right")}
              className="absolute right-1 md:right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-orange-600 shadow-lg rounded-full items-center justify-center hover:bg-gray-50 transition-colors z-20 hidden md:flex"
              aria-label="Next brands"
            >
              <ChevronRight className="w-6 h-6 text-orange-600" />
            </button>
          )}
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>

        <div className="flex flex-col gap-4 my-5">
          <h2 className="text-2xl font-semibold dark:text-white">
            AC Repair service in Raipur
          </h2>

          <p className=" leading-relaxed text-justify">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomized words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum which looks reasonable. The generated Lorem
            Ipsum is therefore always free from repetition, injected humor, or
            non-characteristic words etc. The standard chunk of Lorem Ipsum used
            since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
            are also reproduced in their exact original form, accompanied by
            English versions from the 1914 translation by H. Rackham
          </p>
        </div>
        <div className="flex flex-col gap-4 ">
          <h2 className="text-2xl font-semibold dark:text-white">
            Hiring guide for AC Repair service in Raipur
          </h2>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomized words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum which looks reasonable. The generated Lorem
            Ipsum is therefore always free from repetition, injected humor, or
            non-characteristic words etc. The standard chunk of Lorem Ipsum used
            since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
            are also reproduced in their exact original form, accompanied by
            English versions from the 1914 translation by H. Rackham
          </p>
        </div>
        <div className=" mx-auto mt-5">
          <h2 className="text-2xl font-semibold dark:text-white">
            Frequently Asked Questions (FAQ)?
          </h2>

          <div className="pt-2">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b pb-2">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="font-medium text-gray-800 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`transition-transform dark:text-white ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <p className="text-gray-500 mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10">
      <DeepCleaningServices />
      </div>
      <ServicesSection />

      <SelectCapacityModal
        isOpen={showCapacityModal}
        onClose={() => setShowCapacityModal(false)}
        onContinue={(capacity) => {
          // ✅ save capacity
          setSelectedCapacity(capacity);

          // ✅ close capacity modal
          setShowCapacityModal(false);

          // ✅ open AMC modal
          setShowAMCModal(true);
        }}
      />
      <AMCDurationModal
        isOpen={showAMCModal}
        onClose={() => setShowAMCModal(false)}
        onConfirm={(duration) => {
          console.log("Capacity:", selectedCapacity);
          console.log("AMC:", duration);

          if (selectedService && selectedCapacity) {
            addToCart(selectedService);
          }

          // reset flow
          setShowAMCModal(false);
          setSelectedCapacity(null);
          setSelectedService(null);
        }}
      />
      <ServiceDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        service={selectedService}
        onAdd={() => {
          if (selectedService) {
            addToCart(selectedService);
          }
          setShowModal(false);
        }}
      />
      {/* <Footer /> */}
    </>
  );
};

// export default function ServiceDetailPage() {
//   const { addToCart } = useBooking();
//   const params = useParams();
//   const slug = params?.slug as string;

//   const searchParams = useSearchParams();
//   const source = searchParams?.get("source") || "";

//   // If it's the AC repair service, use the new layout
//   // if (slug === "ac-repair") {
//   //   return <ACRepairLayout />;
//   // }
//   const service = SERVICES_DATA.find((s) => s.slug === slug);
//   const [activeTab, setActiveTab] = useState(
//     service?.types[0].id || "split-ac",
//   );
//   const [showCapacityModal, setShowCapacityModal] = useState(false);
//   const [showAMCModal, setShowAMCModal] = useState(false);
//   const [selectedService, setSelectedService] = useState<any>(null);
//   const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

//   if (!service) {
//     return (
//       <div className="min-h-screen ">
//         {/* <Header /> */}
//         <div className="max-w-7xl mx-auto px-6 py-16 text-center">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Service Not Found
//           </h1>
//         </div>
//         {/* <Footer /> */}
//       </div>
//     );
//   }

//   const activeType = service.types.find((t) => t.id === activeTab);

//   const handleAddService = (subService: any) => {
//     setSelectedService(subService);
//     setShowCapacityModal(true);
//   };

//   const handleCapacitySelected = (capacity: string) => {
//     setSelectedCapacity(capacity);
//     setShowCapacityModal(false);
//   };

//   const handleAMCDurationSelected = (duration: string) => {
//     if (selectedService && selectedCapacity) {
//       const cartItem: CartItem = {
//         id: `${selectedService.id}-${selectedCapacity}-${duration}`,
//         serviceId: `${service.id}-${selectedCapacity}-${duration}`,
//         serviceName: service.name,
//         subService: selectedService.name,
//         capacity: selectedCapacity,
//         amc: duration,
//         price: selectedService.discountedPrice,
//         image: selectedService.image,
//         duration: selectedService.duration,
//         rating: selectedService.rating,
//         reviews: selectedService.reviews,
//       };
//       addToCart(cartItem);
//       setShowAMCModal(false);
//       setShowCapacityModal(false);
//       setSelectedCapacity(null);
//       setSelectedService(null);
//     }
//   };

//   return (
//     <div className="min-h-screen ">
//       {/* <Header /> */}

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
//           <a href="/" className="hover:text-orange-600">
//             Home
//           </a>
//           <ChevronRight className="w-4 h-4" />
//           <a href="/services" className="hover:text-orange-600">
//             {service.breadcrumb}
//           </a>
//           <ChevronRight className="w-4 h-4" />
//           <span className="text-gray-900 font-semibold">{service.name}</span>
//         </div>

//         {/* Top Section: Image + Summary */}
//         <div className="grid lg:grid-cols-3 gap-8 mb-8">
//           {/* Left: Banner Image */}
//           <div className="lg:col-span-2">
//             <div className="relative w-full h-96 rounded-xl overflow-hidden ">
//               <Image
//                 src={service.image}
//                 alt={service.name}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </div>

//           {/* Right: Summary Card */}
//           <ServiceSummaryCard
//             rating={service.rating}
//             reviews={service.reviews}
//             price={service.price}
//             duration={service.duration}
//             warranty={service.warranty}
//             service={service}
//           />
//         </div>

//         {/* Service Type Tabs */}
//         <div className="mb-8">
//           <h2 className="text-lg font-bold text-gray-900 mb-4">
//             Choose a Service Type
//           </h2>
//           <div className="flex gap-4 overflow-x-auto hide-scrollbar">
//             {service.types.map((type) => (
//               <div
//                 key={type.id}
//                 onClick={() => setActiveTab(type.id)}
//                 className={`cursor-pointer rounded-xl p-4 text-center border ${
//                   activeTab === type.id
//                     ? "border-[#FF6A00] shadow-md"
//                     : "border-gray-200"
//                 }`}
//               >
//                 <div className="text-lg font-medium">{type.name}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left: Sub Services List */}
//           <div className="lg:col-span-2 space-y-4">
//             {activeType?.subServices.map((service) => (
//               <div key={service.id} className="border-b py-4">
//                 <div className="flex gap-4">
//                   {/* IMAGE + ADD */}
//                   <div className="flex flex-col items-center">
//                     <div className="relative w-28 h-28 rounded-lg overflow-hidden">
//                       <Image
//                         src={service.image}
//                         alt={service.name}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>

//                     <button
//                       onClick={() => handleAddService(service)}
//                       className="-mt-4 border border-orange-500 text-orange-500 px-4 py-1 rounded-lg text-sm bg-white"
//                     >
//                       Add
//                     </button>
//                   </div>

//                   {/* CONTENT */}
//                   <div className="flex-1">
//                     <h4 className="font-semibold text-gray-900">
//                       {service.name}
//                     </h4>

//                     <p className="text-xs text-gray-600 mt-1">
//                       {service.description}
//                     </p>

//                     <div className="flex items-center gap-2 text-xs mt-2">
//                       ⭐ {service.rating} ({service.reviews})
//                     </div>

//                     <div className="mt-2 flex justify-between items-center">
//                       <span className="font-semibold">
//                         ₹{service.discountedPrice}
//                       </span>

//                       {service.originalPrice && (
//                         <span className="line-through text-xs text-gray-400">
//                           ₹{service.originalPrice}
//                         </span>
//                       )}
//                     </div>

//                     <p className="text-xs text-gray-500 mt-1">
//                       ⏱ {service.duration}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right: Cart Summary */}
//           <CartSummaryCard />
//         </div>
//       </main>

//       {/* <Footer /> */}
//     </div>
//   );
// }
export default function Page() {
  return <ACRepairLayout />;
}
