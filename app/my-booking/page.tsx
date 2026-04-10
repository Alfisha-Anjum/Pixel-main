
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Home, 
  Calendar, 
  Package, 
  User, 
  ChevronRight, 
  Phone, 
  MessageCircle,
  Clock,
  MapPin,
  Star,
  IndianRupee,
  Filter,
  Search,
  Info,
  X
} from "lucide-react";
import BookingDetailsModal from "@/components/BookingDetailsModal";
import RescheduleModal from "@/components/RescheduleModal";
import CancelBookingModal from "@/components/CancelBookingModal";
import BookingCancelledModal from "@/components/BookingCancelledModal";
import BookingSuccessModal from "@/components/BookingSuccessModal";
import BookingCard from "@/components/BookingCard";
import Header from "@/components/Header";
// import { Footer } from "react-day-picker";
import Footer from "@/components/Footer";

const MyBookingPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'pending' | 'rejected' | 'completed'>('pending');
  const [bookingType, setBookingType] = useState<'home' | 'amc'>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [showAMCDetailsPage, setShowAMCDetailsPage] = useState(false);
  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCancelledSuccess, setShowCancelledSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  
  // AMC Specific States
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [showAMCDetailsModal, setShowAMCDetailsModal] = useState(false);
  const [selectedAMC, setSelectedAMC] = useState<any>(null);

  const [amcBookings, setAmcBookings] = useState([
    {
      id: "AMC-001",
      title: "AC Repair",
      subtitle: "AMC & Packages",
      planType: "Corporate",
      duration: "1 Month Plan",
      price: 200,
      originalPrice: 320,
      status: "Running",
      nextSchedule: "Tue, 12-March-2024",
      technicianImage: "/ac.png",
      equipment: [
        { sn: 1, make: "Samsung", serial: "SAM-001", model: "AR12", age: "2 Yrs", image: "/placeholder.jpg" },
        { sn: 2, make: "LG", serial: "LG-882", model: "LG-Split", age: "1 Yr", image: "/placeholder.jpg" }
      ],
      billing: {
        items: ["Split AC", "Window AC", "Cassette AC"],
        total: 520,
        paid: 200,
        balance: 320
      },
      schedule: [
        { status: "Completed", date: "12-Feb-2024", details: "Service 1" },
        { status: "Upcoming", date: "12-Mar-2024", details: "Service 2" },
        { status: "Pending", date: "12-Apr-2024", details: "Service 3" }
      ]
    },
    {
      id: "AMC-002",
      title: "Plumbing AMC",
      subtitle: "AMC & Packages",
      planType: "Home",
      duration: "1 Year Plan",
      price: 1200,
      originalPrice: 1500,
      status: "Running",
      nextSchedule: "Fri, 15-March-2024",
      technicianImage: "/ac.png",
      equipment: [],
      billing: { items: ["Pipes", "Taps"], total: 1200, paid: 1200, balance: 0 },
      schedule: []
    }
  ]);

  // Define TypeScript interfaces
  interface BaseBooking {
    id: string;
    service: string;
    serviceImage: string;
    date: string;
    time: string;
    status: string;
    amount: number;
    address: string;
  }

  interface PendingBooking extends BaseBooking {
    technician: string;
    technicianRating: number;
  }

  interface RejectedBooking extends BaseBooking {
    reason: string;
  }

  interface CompletedBooking extends BaseBooking {
    rating?: number;
    review?: string;
  }

  // Mock booking data
  const bookings = {
    pending: [
      {
        id: "BK-001",
        service: "AC Repair Service",
        serviceImage: "/service-ac.jpg",
        date: "15 Feb 2024",
        time: "10:00 AM - 12:00 PM",
        status: "Pending",
        amount: 1299,
        address: "123 Main Street, Raipur",
        technician: "Raj Kumar",
        technicianRating: 4.8
      } as PendingBooking,
      {
        id: "BK-002",
        service: "Plumbing Service",
        serviceImage: "/service-plumbing.jpg",
        date: "18 Feb 2024",
        time: "2:00 PM - 4:00 PM",
        status: "Pending",
        amount: 899,
        address: "456 Park Avenue, Raipur",
        technician: "Amit Sharma",
        technicianRating: 4.9
      } as PendingBooking
    ],
    rejected: [
      {
        id: "BK-003",
        service: "Electrician Service",
        serviceImage: "/service-electrician.jpg",
        date: "10 Feb 2024",
        time: "11:00 AM - 1:00 PM",
        status: "Rejected",
        amount: 1599,
        address: "789 Oak Street, Raipur",
        reason: "Technician unavailable for selected slot"
      } as RejectedBooking
    ],
    completed: [
      {
        id: "BK-004",
        service: "Home Cleaning",
        serviceImage: "/service-cleaning.jpg",
        date: "01 Feb 2024",
        time: "9:00 AM - 11:00 AM",
        status: "Completed",
        amount: 2499,
        address: "321 Elm Road, Raipur",
        rating: 5,
        review: "Excellent service! Technician was professional and thorough."
      } as CompletedBooking,
      {
        id: "BK-005",
        service: "Appliance Repair",
        serviceImage: "/service-appliance.jpg",
        date: "25 Jan 2024",
        time: "3:00 PM - 5:00 PM",
        status: "Completed",
        amount: 1899,
        address: "654 Pine Street, Raipur",
        rating: 4,
        review: "Good service, completed on time."
      } as CompletedBooking
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
    
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login to View Bookings</h2>
          <a href="/login" className="text-orange-600 font-medium hover:underline">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
          <span
            className="hover:text-orange-500 cursor-pointer"
            onClick={() => setStep("main")}
          >
            Home
          </span>
          |<span className="text-orange-500 font-medium">Profile</span>
        </div>
        <div className="flex flex-col md:flex-row gap-8 border-t border-gray-200 pt-8">
          {/* Sidebar */}
          <div
            className={`${sidebarOpen ? "block" : "hidden"} md:block md:w-64`}
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <nav className="space-y-2">
                <a
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </a>
                <a
                  href="/schedule"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  <span>My Schedule</span>
                </a>
                <a
                  href="/my-booking"
                  className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-600 rounded-lg font-medium"
                >
                  <Package className="w-5 h-5" />
                  <span>Bookings</span>
                </a>
                <a
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Account</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          {!showAMCDetailsPage && (
            <div className="flex-1">
              {/* Top Level Tabs */}

              <div className=" mb-1">
                <div className="">
                  <nav className="flex">
                    <button
                      onClick={() => setBookingType("home")}
                      className={`px-6  font-medium text-sm border-b-2 transition-colors ${
                        bookingType === "home"
                          ? "border-[#FF6A00] text-[#FF6A00]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Home Services
                    </button>
                    <button
                      onClick={() => setBookingType("amc")}
                      className={`px-6  font-medium text-sm border-b-2 transition-colors ${
                        bookingType === "amc"
                          ? "border-[#FF6A00] text-[#FF6A00]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      AMC & Packages
                    </button>
                  </nav>
                </div>
              </div>

              {bookingType === "home" && !showAMCDetailsPage ? (
                <>
                  {/* Status Tabs */}
                  <div className=" ">
                    <div className="">
                      <div className="flex gap-3 p-4">
                        {[
                          { id: "pending", label: "Pending" },
                          { id: "rejected", label: "Rejected" },
                          { id: "completed", label: "Completed" },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-5 py-1 rounded-full text-sm transition-all ${
                              activeTab === tab.id
                                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                                : "border border-orange-300 text-orange-500 hover:bg-orange-50"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl gap-6">
                    {bookings[activeTab].length > 0 ? (
                      bookings[activeTab].map((booking) => (
                        <BookingCard
                          isCompleted={activeTab === "completed"}
                          key={booking.id}
                          service={booking.service}
                          subtitle={`Booking ID: ${booking.id} | ₹${booking.amount}`}
                          rating={
                            activeTab === "pending" && "technician" in booking
                              ? (booking as PendingBooking).technicianRating
                              : 4.8
                          }
                          reviews={3287}
                          date={booking.date}
                          time={booking.time}
                          status={
                            booking.status as
                              | "Pending"
                              | "Completed"
                              | "Cancelled"
                          }
                          onChat={() => console.log("Chat clicked")}
                          onCall={() => console.log("Call clicked")}
                          onReschedule={() => {
                            setSelectedBooking(booking);
                            setShowRescheduleModal(true);
                          }}
                          onCancel={() => {
                            setSelectedBooking(booking);
                            setShowCancelModal(true);
                          }}
                          onViewDetails={() => {
                            setSelectedBooking(booking);
                            setShowDetailsModal(true);
                          }}
                        />
                      ))
                    ) : (
                      <div className="bg-white rounded-[20px] shadow-sm p-12 text-center md:col-span-2">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No {activeTab} bookings
                        </h3>
                        <p className="text-gray-500 mb-6">
                          {activeTab === "pending"
                            ? "You don't have any pending bookings at the moment."
                            : activeTab === "rejected"
                              ? "You don't have any rejected bookings."
                              : "You haven't completed any bookings yet."}
                        </p>
                        <a
                          href="/services"
                          className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Browse Services
                        </a>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Status Filters for AMC */}
                  {/* Status Tabs for AMC (Same as Home UI) */}
                  <div className="">
                    <div>
                      <div className="flex gap-3 p-4">
                        {[
                          { id: "pending", label: "Pending" },
                          { id: "rejected", label: "Rejected" },
                          { id: "completed", label: "Completed" },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            // (No functionality change — keep static or plug state later)
                            className={`px-5 py-1 rounded-full text-sm transition-all ${
                              tab.id === "pending" // keep default active like before
                                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                                : "border border-orange-300 text-orange-500 hover:bg-orange-50"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AMC Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[90%]">
                    {amcBookings.length > 0 ? (
                      amcBookings.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all cursor-pointer"
                          onClick={() => {
                            setSelectedAMC(item);
                            setShowAMCDetailsPage(true);
                          }}
                        >
                          {/* Top Section */}
                          <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                              {/* Profile Image */}
                              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                                <img
                                  src={item.technicianImage}
                                  alt="Technician"
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Text Info */}
                              <div>
                                <h3 className="font-bold text-gray-900">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {item.subtitle}
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                  Type: {item.planType}
                                </p>

                                <p className="text-green-600 font-medium text-sm mt-1">
                                  {item.duration}
                                </p>
                              </div>
                            </div>

                            {/* Status */}
                            <div className="flex flex-col gap-6 items-center">
                              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-md font-medium">
                                {item.status}
                              </span>
                              <div className="mt-2 font-semibold text-gray-900">
                                ₹{item.price}
                                <span className="text-gray-400 line-through ml-2 text-sm">
                                  ₹{item.originalPrice}
                                </span>
                              </div>
                            </div>

                            {/* Price */}
                          </div>

                          {/* Upcoming Schedule */}
                          <div className="flex justify-between items-center gap-2 my-5">
                            <p className="">Upcoming Schedule:</p>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-orange-500" />
                              <span className="text-red-500 font-medium">
                                {item.nextSchedule}
                              </span>
                            </div>
                          </div>

                          {/* Buttons */}
                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBooking({
                                  ...item,
                                  service: item.title,
                                  date: item.nextSchedule,
                                  time: "10:00 AM",
                                });
                                setShowRescheduleModal(true);
                              }}
                              className="flex-1 border border-orange-500 text-orange-500 py-3 rounded-xl font-medium hover:bg-orange-50"
                            >
                              Re-Schedule
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowComplaintModal(true);
                              }}
                              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-xl font-medium"
                            >
                              Raise Complaint
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full bg-white rounded-xl shadow-sm p-12 text-center">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No AMC Packages Found
                        </h3>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {showAMCDetailsPage && selectedAMC && (
            <div className="bg-[#f8f8f8] rounded-2xl ">
              <div className="flex justify-between gap-10 items-start w-[70%] ">
                {/* LEFT COLUMN */}
                <div className="space-y-5  w-[60%] ">
                  {/* AMC Billing Details */}
                  <div className="flex-1">
                    {/* Billing Card */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      {/* Header */}
                      <div className="bg-gray-200 px-4 py-3 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800">
                          AMC Billing Details
                        </h3>
                        <span className="text-gray-600 text-sm">▼</span>
                      </div>

                      {/* Items */}
                      <div className="p-4 space-y-4">
                        {selectedAMC.billing?.items.map(
                          (item: string, idx: number) => (
                            <div
                              key={idx}
                              className="flex justify-between items-start text-sm"
                            >
                              {/* Left */}
                              <div className="flex gap-2">
                                <span className="text-blue-600 font-medium cursor-pointer">
                                  {item}
                                </span>
                                <span className="text-gray-500">
                                  Preventive(1.5 Ton * 2)
                                </span>
                              </div>

                              {/* Price */}
                              <span className="font-medium text-gray-900">
                                ₹200
                              </span>
                            </div>
                          ),
                        )}

                        {/* Totals */}
                        <div className="pt-4 border-t space-y-2 text-sm">
                          <div className="flex justify-between font-semibold text-gray-900">
                            <span>Total Amount</span>
                            <span>₹{selectedAMC.billing?.total}</span>
                          </div>

                          <div className="flex justify-between text-gray-700">
                            <span>Paid</span>
                            <span>₹{selectedAMC.billing?.paid}</span>
                          </div>

                          <div className="flex justify-between text-gray-400">
                            <span>Balance Amount</span>
                            <span>{selectedAMC.billing?.balance}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AMC Schedule */}
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-gray-200 px-4 py-3 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">
                        AMC Schedule
                      </h3>
                      <span className="text-gray-600 text-sm">▼</span>
                    </div>

                    <div className="px-4 py-4">
                      <div className="flex justify-between text-[13px] font-semibold text-[#333] mb-3">
                        <span>Status</span>
                        <span>Upcoming Date</span>
                        <span>Details</span>
                      </div>

                      <div className="space-y-3">
                        {selectedAMC.schedule.map((sch: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex justify-between px-3  text-[13px] items-start"
                          >
                            <span
                              className={`${
                                sch.status === "Completed"
                                  ? "text-green-600"
                                  : sch.status === "Upcoming"
                                    ? "text-[#ff5a3c]"
                                    : "text-[#9a9a9a]"
                              }`}
                            >
                              {sch.status}
                            </span>

                            <span
                              className={`${
                                sch.status === "Upcoming"
                                  ? "text-[#ff5a3c]"
                                  : "text-[#8a8a8a]"
                              }`}
                            >
                              {sch.date}
                            </span>

                            <span className="text-[#222] text-xs">
                              {idx === 0 ? "◉" : idx === 1 ? "▦" : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Billing Status */}
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-gray-200 px-4 py-3 flex justify-between items-center">
                      <h3 className="font-semibold text-[15px] text-[#222]">
                        Billing Status
                      </h3>
                      <span className="text-black text-xs">▼</span>
                    </div>

                    <div className="px-4 py-4">
                      <div className="flex justify-between text-[13px] font-semibold text-[#333] mb-4">
                        <span>Period</span>
                        <span>Billing Date.</span>
                        <span>AMT</span>
                        <span>Status</span>
                      </div>

                      <div className="space-y-4 text-[13px]">
                        <div className="flex justify-between items-center">
                          <span className="text-[#555]">Q1</span>
                          <span className="text-[#777]">12/12/23</span>
                          <span className="text-[#555]">₹990</span>
                          <span className="text-green-600 flex items-center gap-1">
                            Paid <span className="text-[10px]">🧾</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-[60px_1fr_50px_56px] items-center">
                          <span className="text-[#555]">Q2</span>
                          <span className="text-[#bbb]"></span>
                          <span className="text-[#bbb]"></span>
                          <span className="text-[#bbb]"></span>
                        </div>

                        <div className="grid grid-cols-[60px_1fr_50px_56px] items-center">
                          <span className="text-[#555]">Q3</span>
                          <span className="text-[#bbb]"></span>
                          <span className="text-[#bbb]"></span>
                          <span className="text-[#bbb]"></span>
                        </div>

                        <div className="grid grid-cols-[60px_1fr_50px_56px] items-center">
                          <span className="text-[#555]">Q4</span>
                          <span className="text-[#bbb]"></span>
                          <span className="text-[#bbb]"></span>
                          <span className="text-[#bbb]"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className=" w-[50%] bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <p className="text-[12px] text-[#a0a0a0]">
                      Ref: TAS/AMC2223/000222
                    </p>
                    <span className="bg-[#e6f3e6] text-green-700 text-xs px-3 py-1 rounded-md font-medium">
                      Running
                    </span>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between items-center gap-3 text-sm">
                      <span className="text-[#444] min-w-[82px]">
                        Start Date:
                      </span>
                      <div>
                      <span className="text-orange-500">📅</span>
                      <span className="text-orange-700 text-[13px] font-medium">
                        Tuesday, 12 March 2024
                      </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center gap-3 text-sm">
                      <span className="text-[#444] min-w-[82px]">
                        End Date:
                      </span>
                      <div>
                      <span className="text-orange-500">📅</span>
                      <span className="text-orange-700 text-[13px] font-medium">
                        Tuesday, 11 March 2025
                      </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-semibold text-[#333] mb-3">
                      Shipping Details
                    </h3>

                    <div className="space-y-2 text-[14px] text-[#555] leading-6">
                      <p className="font-semibold text-[#222]">
                        Mr. Tikesh Dewangan
                      </p>
                      <p>
                        Office No. 201, atlantis corporate park, ring road
                        <br />
                        No.1 Telibandha, Raipur
                      </p>
                      <p>C.N.: +91 9644430161</p>
                    </div>
                  </div>

                  <div className="space-y-5 max-w-[260px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking({
                          ...selectedAMC,
                          service: selectedAMC.title,
                          date: selectedAMC.nextSchedule,
                          time: "10:00 AM",
                        });
                        setShowRescheduleModal(true);
                      }}
                      className="w-full h-[44px] rounded-full border border-orange-600 text-orange-600 bg-white font-medium text-sm hover:bg-orange-50 transition-colors"
                    >
                      Re-schedule
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowComplaintModal(true);
                      }}
                      className="w-full h-[44px] rounded-full bg-orange-500 from-[#ff5a36] to-[#f9ab2d] text-white font-medium text-sm "
                    >
                      Raise Complaint
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}

      {/* MODAL 1: Equipment Details */}
      {showEquipmentModal && selectedAMC && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowEquipmentModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Split AC (1.5 Ton *2)
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">S.N</th>
                      <th className="px-6 py-3">Make</th>
                      <th className="px-6 py-3">Serial No.</th>
                      <th className="px-6 py-3">Model No.</th>
                      <th className="px-6 py-3">Age</th>
                      <th className="px-6 py-3">Images</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAMC.equipment &&
                    selectedAMC.equipment.length > 0 ? (
                      selectedAMC.equipment.map((eq: any, idx: number) => (
                        <tr
                          key={idx}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="px-6 py-4">{eq.sn}</td>
                          <td className="px-6 py-4">{eq.make}</td>
                          <td className="px-6 py-4">{eq.serial}</td>
                          <td className="px-6 py-4">{eq.model}</td>
                          <td className="px-6 py-4">{eq.age}</td>
                          <td className="px-6 py-4">
                            <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden">
                              {/* Placeholder for image */}
                              <div className="w-full h-full bg-gray-300"></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No equipment details available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Raise Complaint */}
      {showComplaintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 relative shadow-xl">
            <button
              onClick={() => setShowComplaintModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="text-center py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Please Call the Below Number
              </h3>
              <p className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-2">
                <Phone className="w-6 h-6" />
                +1 555 6337275
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AMC Details Modal (Billing & Schedule) */}

      {selectedBooking && (
        <>
          <BookingDetailsModal
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            booking={selectedBooking}
            onServiceInOrder={() => setShowSuccessModal(true)}
          />
          <RescheduleModal
            isOpen={showRescheduleModal}
            onClose={() => {
              setShowRescheduleModal(false);
              setSelectedBooking(null);
            }}
            onReschedule={async (date, time, notes) => {
              console.log(
                "Rescheduling booking:",
                selectedBooking.id,
                "to",
                date,
                time,
                "with notes:",
                notes,
              );
              // Here you would typically make an API call to reschedule the booking
              setShowRescheduleModal(false);
              // Show a success message or update the booking status
            }}
            currentBooking={selectedBooking}
          />
          <CancelBookingModal
            isOpen={showCancelModal}
            onClose={() => {
              setShowCancelModal(false);
              setSelectedBooking(null);
            }}
            onCancel={async (reason) => {
              console.log(
                "Cancelling booking:",
                selectedBooking.id,
                "reason:",
                reason,
              );
              // Here you would typically make an API call to cancel the booking
              setShowCancelModal(false);
              setShowCancelledSuccess(true);
            }}
            booking={selectedBooking}
          />
          <BookingCancelledModal
            isOpen={showCancelledSuccess}
            onClose={() => {
              setShowCancelledSuccess(false);
              // Optionally refresh the booking list here
            }}
            booking={selectedBooking}
          />
          <BookingSuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
          />
        </>
      )}
      <Footer />
    </div>
  );
};

export default MyBookingPage; 