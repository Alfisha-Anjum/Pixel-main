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
const [showWarrantyModal, setShowWarrantyModal] = useState(false);
  const searchParams = useSearchParams();
  const source = searchParams?.get("source") || "";
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [activeScroll, setActiveScroll] = useState<"tabs" | "brands">("tabs");

  
  // const searchParams = useSearchParams();
const subCategoryId = searchParams?.get("sub_category_id");
const [serviceDetails, setServiceDetails] = useState<any>(null);
const apiService = serviceDetails?.data;
const galleryImages = Array.isArray(apiService?.gallery_images)
  ? apiService.gallery_images
  : [];
const safeImage = (img?: string | null) => {
  return img && img.trim() !== "" ? img : "/10.svg";
};
const serviceId = searchParams?.get("service_id");

useEffect(() => {
  const fetchServiceDetails = async () => {
    try {
      const res = await fetch(
        `https://taskpro.itmingo.com/api/service-details?service_id=${serviceId}&state_name=Chhattisgarh&city_name=Raipur`,
        {
          headers: {
            accept: "application/json",
          },
        },
      );

      const data = await res.json();
      console.log("SERVICE DETAILS API DATA:", data);

      if (data?.status) {
        setServiceDetails(data);
        setActiveTab(String(data?.data?.subServices?.[0]?.sub_category_id));
      }
    } catch (error) {
      console.log("SERVICE DETAILS API ERROR:", error);
    }
  };

  if (serviceId) fetchServiceDetails();
}, [serviceId]);

useEffect(() => {
  const fetchServices = async () => {
    const res = await fetch(
      `https://taskpro.itmingo.com/api/services?state=Chhattisgarh&city=Raipur&state_name=Chhattisgarh&city_name=Raipur&id=${subCategoryId}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const data = await res.json();
    console.log("SUB CATEGORY API DATA:", data);
  };

  if (subCategoryId) {
    fetchServices();
  }
}, [subCategoryId]);

useEffect(() => {
  const fetchServiceDetails = async () => {
    try {
      const res = await fetch(
        `https://taskpro.itmingo.com/api/service-details?id=${subCategoryId}`,
        {
          headers: {
            accept: "application/json",
          },
        },
      );

      const data = await res.json();
      console.log("SERVICE DETAILS API DATA:", data);

      if (data?.status) {
        setServiceDetails(data);
      }
    } catch (error) {
      console.log("SERVICE DETAILS API ERROR:", error);
    }
  };

  if (subCategoryId) {
    fetchServiceDetails();
  }
}, [subCategoryId]);

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
const fallbackBrands = [
  {
    name: "LG",
    logo: "/lg.png",
  },
  {
    name: "Samsung",
    logo: "/sam.png",
  },
  {
    name: "Whirlpool",
    logo: "/whirl.png",
  },
  {
    name: "VOLTAS",
    logo: "/volt.png",
  },
  {
    name: "DAIKIN",
    logo: "/daikin.png",
  },
  {
    name: "Blue Star",
    logo: "/blueStar.png",
  },
  {
    name: "HITACHI",
    logo: "/hit.png",
  },
  {
    name: "MITSUBISHI",
    logo: "/mits.png",
  },
];
 const faqData = apiService?.faqs || [];
  // Scroll right function
const brands =
  apiService?.covered_brands?.map((brand: any) => {
    const matchedFallback = fallbackBrands.find(
      (item) => item.name.toLowerCase() === brand.name?.toLowerCase(),
    );

    return {
      ...brand,
      image: brand.image || matchedFallback?.logo || "/brand-placeholder.png",
    };
  }) || fallbackBrands;

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

 const reviews = apiService?.reviews || [];


  const tabsRef = useRef<HTMLDivElement | null>(null);
  const reviewsRef = useRef<HTMLDivElement | null>(null);
  const brandsRef = useRef<HTMLDivElement | null>(null);

  // const tabs = service?.types || [];

  // const currentType = service?.types.find((t) => t.id === activeTab);
  // const currentServices = currentType?.subServices || [];
  // const { addToCart } = useBooking();
const apiTabs =
  apiService?.subServices?.map((cat: any) => ({
    id: String(cat.sub_category_id),
    name: cat.sub_category_name,
    items: cat.items || [],
  })) || [];

const tabs = apiTabs.length > 0 ? apiTabs : service?.types || [];

useEffect(() => {
  if (apiTabs.length > 0 && !activeTab) {
    setActiveTab(String(apiTabs[0].id));
  }
}, [apiTabs.length, activeTab]);

const currentType = tabs.find((t: any) => String(t.id) === String(activeTab));

const displayServices =
  currentType?.items?.map((item: any) => ({
    id: item.id,
    name: item.name,
    title: item.name,
    image: safeImage(item.image || item.icon),
    rating: Number(item.rating || 0),
    reviews: item.reviews || 0,
    duration: `${item.duration_minutes || 30} min`,
    discountedPrice: Number(item.final_price || 0),
    originalPrice: Number(item.strike_price || item.base_price || 0),
    warrantyDays: item.warranty_days,
    warrantyDescription: item.warranty_description,
    packageTag: item.package_tag,

    issueDescriptions: item.issue_descriptions || item.descriptions || [],
    issueMoreDetails: item.issue_more_details || item.details || [],
  })) ||
  currentType?.subServices ||
  [];

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
      <section className="">
        <div className="w-full max-w-7xl mx-auto  sm:px-5 ">
          {/* Breadcrumb */}
          <div className="text-sm sm:text-base md:text-lg text-gray-600 py-4 sm:block hidden">
            <Link href="/" className="hover:text-[#FF6A00]">
              Home
            </Link>

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
          <div className="flex flex-col-reverse lg:flex-row gap-4 sm:gap-8 items-start">
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white leading-snug">
                Best {apiService?.name || service?.name} <br />
                Service in {service?.city || "Your City"}
              </h1>

              {/* Rating */}
              <div className="mt-2 sm:mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-base">
                <Star className="w-5 h-5 fill-orange-500 text-orange-500" />

                <span className="font-semibold text-gray-900 dark:text-white">
                  {displayServices?.[0]?.rating || 0}
                </span>

                <span className="text-gray-600 dark:text-gray-300">
                  ({apiService?.reviews?.length || 0} reviews)
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
              <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl p-4 mt-6 relative max-w-lg sm:block hidden">
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
                  <div
                    onClick={() => setShowWarrantyModal(true)}
                    className="flex justify-between items-center border rounded-xl px-4 py-3 cursor-pointer hover:border-orange-500"
                  >
                    <div className="flex gap-2 items-center">
                      <span>🏅</span>
                      <span className="text-sm text-gray-500">
                        {displayServices?.[0]?.warrantyDays || 0} Days Warranty
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
                  src={safeImage(apiService?.images?.header_image1)}
                  alt={apiService?.name || "Service"}
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
      <div className="w-full max-w-7xl pt-5 xl:px-2 sm:px-5 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:py-5">
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
                        className={`cursor-pointer rounded-full sm:rounded-xl p-2 sm:p-4 text-center transition-all duration-200 border ${
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
                        {tab.icon && (
                          <div className="mb-2 text-2xl sm:text-3xl">
                            {tab.icon}
                          </div>
                        )}

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
                {displayServices.map((subService) => (
                  <div
                    key={subService.id}
                    className="border- sm:w-[80%] w-full lg:max-w-lg "
                  >
                    {/* Category Title (Split AC etc) */}
                    <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 dark:text-white sm:mb-3">
                      Service
                    </h3>
                    <div className="sm:shadow-none shadow-lg rounded-xl p-4 mb-6">
                      <div className="flex gap-4">
                        {/* LEFT IMAGE + ADD */}
                        <div className="flex flex-col items-center">
                          <div className="relative w-28 h-28 rounded-lg overflow-hidden">
                            <Image
                              src={safeImage(subService.image)}
                              alt={subService.name || "Service"}
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
                            {subService.warrantyDays || 0} Days Warranty
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
                                {subService.packageTag || "Offer Available"}
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-0 sm:space-y-6">
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

              {/* Mobile Description + Photos */}
              <div className="sm:hidden mt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  Description
                </h2>

                <div
                  className="text-gray-500 text-sm leading-8 mb-8"
                  dangerouslySetInnerHTML={{
                    __html: apiService?.description || "",
                  }}
                />

                <button className="w-full border border-orange-500 text-orange-500 rounded-2xl px-5 py-2 flex items-center justify-between font-semibold text-sm mb-8">
                  Standard Rate Card
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="sm:hidden mt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-5">
                    Photos
                  </h2>

                  <div className="grid grid-cols-2 gap-5 items-start">
                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-5">
                      {galleryImages
                        .filter((_, i) => i % 2 === 0)
                        .map((img, index) => (
                          <div
                            key={index}
                            className={`overflow-hidden rounded-[28px] bg-gray-100 ${
                              index === 0 ? "h-[360px]" : "h-[140px]"
                            }`}
                          >
                            <img
                              src={img}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col gap-5">
                      {galleryImages
                        .filter((_, i) => i % 2 !== 0)
                        .map((img, index) => (
                          <div
                            key={index}
                            className={`overflow-hidden rounded-[28px] bg-gray-100 ${
                              index === 2 ? "h-[360px]" : "h-[140px]"
                            }`}
                          >
                            <img
                              src={img}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border rounded-xl p-5 mb-6 sm:block hidden">
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
              <div className="mb-6 border border-orange-500 rounded-xl px-4 py-3 sm:block hidden">
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
            </div>
          </div>
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
                <span className="text-lg font-semibold text-white">
                  {displayServices?.[0]?.rating || 0}
                </span>

                <span className="text-sm text-white/80">
                  ({apiService?.reviews?.length || 0} Reviews)
                </span>
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
                              {[...Array(review.rating || 0)].map((_, i) => (
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
                              {review.time}
                            </span>
                          </div>

                          {/* Review text */}
                          <p className="text-white text-left leading-relaxed font-thin text-[15px] mt-3">
                            {review.text}
                          </p>
                        </div>
                      </div>
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
          </div>
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
            {brands.map((brand: any, index: number) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center text-center border w-full h-28">
                  <div className="relative h-[60px] w-full flex items-center justify-center">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={120}
                      height={40}
                      className="object-contain max-h-[60px]"
                    />
                  </div>
                </div>

                <p className="text-xs mt-2 dark:text-white text-center w-full line-clamp-2">
                  {brand.name}
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

        <div className="flex flex-col gap-1 my-5">
          <h2 className="text-2xl font-semibold dark:text-white">
            {apiService?.name} service in Raipur
          </h2>

          <div
            className="dark:text-gray-300 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: apiService?.description || "",
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold dark:text-white">
            Hiring guide for {apiService?.name} service in Raipur
          </h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {apiService?.hiring_guide || "No hiring guide available."}
          </p>
        </div>
        <div className=" mx-auto mt-5">
          <h2 className="text-2xl font-semibold dark:text-white">
            Frequently Asked Questions (FAQ)?
          </h2>

          <div className="pt-2">
            {faqData.map((faq: any, index: number) => (
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
      {showWarrantyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 relative max-h-[90vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={() => setShowWarrantyModal(false)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
            >
              ×
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-5 text-gray-900">
              Warranty Details
            </h2>

            {apiService?.warranties?.length > 0 ? (
              <div className="space-y-6">
                {apiService.warranties.map((item: any) => (
                  <div
                    key={item.id}
                    className="border rounded-2xl overflow-hidden"
                  >
                    {/* Warranty Image */}
                    {item.warranty_terms_image && (
                      <div className="relative w-full h-[250px] bg-gray-100">
                        <Image
                          src={`https://taskpro.itmingo.com/storage/services/${item.warranty_terms_image}`}
                          alt="Warranty Terms"
                          fill
                          unoptimized
                          className="object-contain rounded-t-2xl"
                        />
                      </div>
                    )}

                    {/* Warranty Info */}
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-500">
                          Warranty ID
                        </span>

                        <span className="font-semibold text-gray-900">
                          #{item.id}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-500">
                          Service ID
                        </span>

                        <span className="font-semibold text-gray-900">
                          {item.service_id}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-500">
                          Category ID
                        </span>

                        <span className="font-semibold text-gray-900">
                          {item.service_category_id}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-500">
                          Status
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-sm text-gray-500 mb-1">Created At</p>

                        <p className="text-sm font-medium text-gray-800">
                          {new Date(item.created_at).toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">Updated At</p>

                        <p className="text-sm font-medium text-gray-800">
                          {new Date(item.updated_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No warranty details available</p>
              </div>
            )}
          </div>
        </div>
      )}
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


export default function Page() {
  return <ACRepairLayout />;
}
