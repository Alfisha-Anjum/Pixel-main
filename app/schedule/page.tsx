// "use client";

// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import {
//   Home,
//   Calendar,
//   Package,
//   User,
//   Search,
//   Filter
// } from "lucide-react";
// import ScheduleEmptyState from "@/components/ScheduleEmptyState";
// import ScheduleDetailsModal from "@/components/ScheduleDetailsModal";
// import RescheduleModal from "@/components/RescheduleModal";

// interface Schedule {
//   id: string;
//   service: string;
//   type: string;
//   status: "Pending" | "Completed" | "Running";
//   date: string;
//   time: string;
//   rating: number;
//   reviews?: number;
//   serviceImage?: string;
//   address?: string;
//   technician?: string;
//   itemTotal?: number;
//   discount?: number;
//   taxes?: number;
// }

// const MySchedulePage = () => {
//   const { user } = useAuth();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
//   const [openDetailsModal, setOpenDetailsModal] = useState(false);
//   const [openRescheduleModal, setOpenRescheduleModal] = useState(false);

//   // Sample schedule data
//   const schedules: Schedule[] = [
//     {
//       id: "1",
//       service: "AC Repair",
//       type: "Repair & Gas Refill",
//       status: "Pending",
//       date: "14/06/2023",
//       time: "10:00 am",
//       rating: 4.8,
//       reviews: 3287,
//       serviceImage: "/service-ac.jpg",
//       address: "123 Main Street, Apt 4B, New York, NY 10001",
//       technician: "John Smith",
//       itemTotal: 2499,
//       discount: 200,
//       taxes: 300
//     },
//     {
//       id: "2",
//       service: "Refrigerator Repair",
//       type: "Compressor Replacement",
//       status: "Running",
//       date: "15/06/2023",
//       time: "02:30 pm",
//       rating: 4.6,
//       reviews: 2841,
//       serviceImage: "/service-fridge.jpg",
//       address: "456 Oak Avenue, Suite 2A, Los Angeles, CA 90001",
//       technician: "Sarah Johnson",
//       itemTotal: 3499,
//       discount: 300,
//       taxes: 420
//     },
//     {
//       id: "3",
//       service: "Washing Machine Repair",
//       type: "Motor & Drum Service",
//       status: "Completed",
//       date: "10/06/2023",
//       time: "09:00 am",
//       rating: 4.9,
//       reviews: 4156,
//       serviceImage: "/service-washing.jpg",
//       address: "789 Pine Road, Apt 5C, Chicago, IL 60601",
//       technician: "Michael Brown",
//       itemTotal: 1999,
//       discount: 150,
//       taxes: 240
//     },
//     {
//       id: "4",
//       service: "Microwave Repair",
//       type: "Heating Element Fix",
//       status: "Pending",
//       date: "20/06/2023",
//       time: "04:00 pm",
//       rating: 4.7,
//       reviews: 1923,
//       serviceImage: "/service-microwave.jpg",
//       address: "321 Maple Lane, Apt 3D, Houston, TX 77001",
//       technician: "Emily Davis",
//       itemTotal: 1499,
//       discount: 100,
//       taxes: 180
//     }
//   ];

//   const selectedScheduleData = selectedSchedule
//     ? {
//         id: selectedSchedule.id,
//         serviceTitle: selectedSchedule.service,
//         serviceSubtitle: selectedSchedule.type,
//         serviceImage: selectedSchedule.serviceImage || "/service-ac.jpg",
//         rating: selectedSchedule.rating,
//         reviews: selectedSchedule.reviews || 0,
//         status: selectedSchedule.status,
//         date: selectedSchedule.date,
//         time: selectedSchedule.time,
//         address: selectedSchedule.address || "",
//         technician: selectedSchedule.technician,
//         itemTotal: selectedSchedule.itemTotal || 0,
//         discount: selectedSchedule.discount || 0,
//         taxes: selectedSchedule.taxes || 0
//       }
//     : null;

//   const handleScheduleClick = (schedule: Schedule) => {
//     setSelectedSchedule(schedule);
//     setOpenDetailsModal(true);
//   };

//   const handleRescheduleClick = () => {
//     setOpenDetailsModal(false);
//     setOpenRescheduleModal(true);
//   };

//   const handleRescheduleConfirm = (data: {
//     date: string;
//     time: string;
//     notes: string;
//     address?: string;
//   }) => {
//     console.log("Reschedule confirmed:", data);
//     setOpenRescheduleModal(false);
//     // Handle reschedule logic here
//   };

//   const handleServiceClick = (serviceId: string) => {
//     window.location.href = `/service/${serviceId}`;
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Please Login to View Schedule
//           </h2>
//           <a
//             href="/login"
//             className="text-orange-600 font-medium hover:underline"
//           >
//             Go to Login
//           </a>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F7F7F7]">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <button
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                 className="md:hidden mr-4 p-2 rounded-md text-gray-700 hover:bg-gray-100"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </button>
//               <h1 className="text-xl font-semibold text-[#333]">My Schedule</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="relative hidden sm:block">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search schedule..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B2C] focus:border-[#FF6B2C] w-64"
//                 />
//               </div>
//               <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
//                 <Filter className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)] gap-6">
//           {/* LEFT SECTION — Sidebar + Content */}
//           <div className="space-y-4">
//             <div className="flex flex-col md:flex-row gap-4 items-start">
//               {/* Sidebar Card */}
//               <div
//                 className={`${
//                   sidebarOpen ? "block" : "hidden"
//                 } md:block w-full md:w-[260px]`}
//               >
//                 <div className="bg-white rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] p-5">
//                   <nav className="space-y-1">
//                     <a
//                       href="/"
//                       className="group flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[#777] hover:bg-gray-50 transition-colors"
//                     >
//                       <span className="grid place-items-center w-9 h-9 rounded-lg text-[#777] group-hover:bg-gray-100 transition-colors">
//                         <Home className="w-5 h-5" />
//                       </span>
//                       <span className="text-sm font-medium">Home</span>
//                     </a>
//                     <a
//                       href="/schedule"
//                       className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[#FF6B2C] bg-[#FFE9E2] transition-colors font-semibold"
//                     >
//                       <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#FFE9E2] text-[#FF6B2C]">
//                         <Calendar className="w-5 h-5" />
//                       </span>
//                       <span className="text-sm font-semibold">My Schedule</span>
//                     </a>
//                     <a
//                       href="/my-booking"
//                       className="group flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[#777] hover:bg-gray-50 transition-colors"
//                     >
//                       <span className="grid place-items-center w-9 h-9 rounded-lg text-[#777] group-hover:bg-gray-100 transition-colors">
//                         <Package className="w-5 h-5" />
//                       </span>
//                       <span className="text-sm font-medium">Bookings</span>
//                     </a>
//                     <a
//                       href="/account"
//                       className="group flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[#777] hover:bg-gray-50 transition-colors"
//                     >
//                       <span className="grid place-items-center w-9 h-9 rounded-lg text-[#777] group-hover:bg-gray-100 transition-colors">
//                         <User className="w-5 h-5" />
//                       </span>
//                       <span className="text-sm font-medium">Account</span>
//                     </a>
//                   </nav>
//                 </div>
//               </div>

//               {/* Main Content */}
//               <div className="flex-1 w-full">
//                 {schedules.length === 0 ? (
//                   <ScheduleEmptyState onServiceClick={handleServiceClick} />
//                 ) : (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 pt-5">
//                     {schedules.map((schedule) => (
//                       <div
//                         key={schedule.id}
//                         onClick={() => handleScheduleClick(schedule)}
//                         className="bg-white rounded-[16px] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all cursor-pointer duration-200"
//                       >
//                         {/* Row 1: Image, Title/Subtitle, Status Badge */}
//                         <div className="flex items-start gap-4 mb-4">
//                           {/* Left: Service Image */}
//                           <div className="w-16 h-16 rounded-[12px] overflow-hidden bg-gray-100 flex-shrink-0">
//                             <img
//                               src={schedule.serviceImage || "/service-ac.jpg"}
//                               alt={schedule.service}
//                               className="w-full h-full object-cover"
//                               onError={(e) => {
//                                 const target = e.target as HTMLImageElement;
//                                 target.src = "/placeholder-service.jpg";
//                               }}
//                             />
//                           </div>

//                           {/* Center: Title, Subtitle, Rating */}
//                           <div className="flex-1">
//                             <h3 className="text-sm font-semibold text-[#333] mb-1">
//                               {schedule.service}
//                             </h3>
//                             <p className="text-xs text-[#888] mb-2">{schedule.type}</p>
//                             <div className="flex items-center gap-1">
//                               <svg
//                                 className="w-3.5 h-3.5 text-[#FFA500]"
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                               </svg>
//                               <span className="text-xs font-semibold text-[#333]">
//                                 {schedule.rating} | {schedule.reviews || 0} reviews
//                               </span>
//                             </div>
//                           </div>

//                           {/* Right: Status Badge */}
//                           <span
//                             className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold flex-shrink-0 ${
//                               schedule.status === "Completed"
//                                 ? "bg-[#E8F5E9] text-[#28C76F]"
//                                 : schedule.status === "Running"
//                                 ? "bg-[#E3F2FD] text-[#1976D2]"
//                                 : "bg-[#FFF1EA] text-[#FF6B2C]"
//                             }`}
//                           >
//                             {schedule.status}
//                           </span>
//                         </div>

//                         {/* Row 2: Date & Time */}
//                         <div className="border-t border-[#EEE] pt-4">
//                           <p className="text-xs text-[#888] mb-1">Date & Time</p>
//                           <p className="text-sm font-semibold text-[#333]">
//                             {schedule.date} | {schedule.time}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Details Modal */}
//       {selectedScheduleData && (
//         <ScheduleDetailsModal
//           isOpen={openDetailsModal}
//           onClose={() => {
//             setOpenDetailsModal(false);
//             setSelectedSchedule(null);
//           }}
//           onReschedule={handleRescheduleClick}
//           schedule={selectedScheduleData}
//         />
//       )}

//       {/* Reschedule Modal */}
//       <RescheduleModal
//         isOpen={openRescheduleModal}
//         onClose={() => setOpenRescheduleModal(false)}
//         onConfirm={handleRescheduleConfirm}
//       />
//     </div>
//   );
// };

// export default MySchedulePage;

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
  X,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Pencil } from "lucide-react";
// import SelectAddressModal from "@/components/SelectAddressModal";
import BookingDetailsModal from "@/components/BookingDetailsModal";
import RescheduleModal from "@/components/RescheduleModal";
import CancelBookingModal from "@/components/CancelBookingModal";
import BookingCancelledModal from "@/components/BookingCancelledModal";
import BookingSuccessModal from "@/components/BookingSuccessModal";
import BookingCard from "@/components/BookingCard";
import Header from "@/components/Header";
// import { Footer } from "react-day-picker";
import Footer from "@/components/Footer";
import SplitACModal from "@/components/SplitACModal";
import ChatBotPanel from "@/components/ChatBotPanel";
import { SelectAddressModal } from "@/components/booking-flow/SelectAddressModal";
import AddNewAddressModal from "@/components/AddNewAddressModal";
import { SelectDateTimeModal } from "@/components/booking-flow/SelectDateTimeModal";
import Breadcrumb from "@/components/account/Breadcrumb";
import { AccountSidebar } from "@/components/account";
import Link from "next/link";
// import { AddNewAddressModal } from "@/components/booking-flow/AddNewAddressModal";

const MySchedulePage = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const refresh = searchParams?.get("refresh");
  const [activeTab, setActiveTab] = useState<
    "pending" | "rejected" | "completed"
  >("pending");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSplitModal, setShowSplitModal] = useState(false);

  const [showChatBot, setShowChatBot] = useState(false);
  const [selectedChatBooking, setSelectedChatBooking] = useState<any>(null);
  // const [showCancelledSuccess, setShowCancelledSuccess] = useState(false);
  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCancelledSuccess, setShowCancelledSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showBookingDetailsPage, setShowBookingDetailsPage] = useState(false);
  const [showSelectAddressModal, setShowSelectAddressModal] = useState(false);
  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);

  const successBookingCancel = () => {
    setShowCancelledSuccess(true);
  };

  const handleRescheduleContinue = (
    date: string,
    time: string,
    notes: string,
  ) => {
    setSelectedBooking((prev: any) => ({
      ...prev,
      date,
      time,
      notes,
    }));

    setShowRescheduleModal(false); // close modal after continue
  };

  useEffect(() => {
    setShowBookingDetailsPage(false);
    setShowChatBot(false);
    setSelectedBooking(null);
  }, [refresh]);

  const handleOpenChat = (booking: any) => {
    setSelectedChatBooking(booking);
    setShowChatBot(true);
    setShowBookingDetailsPage(false);
    // setShowAMCDetailsPage(false);
  };
  // Define TypeScript interfaces
  interface Schedule {
    id: string;
    service: string;
    type: string;
    status: "Pending" | "Completed" | "Running" | "Rejected";
    date: string;
    time: string;
    rating: number;
    reviews?: number;
    serviceImage?: string;
    address?: string;
    technician?: string;
    itemTotal?: number;
    discount?: number;
    taxes?: number;
  }

  // Mock booking data
  const schedules = [
    {
      id: "BK-001",
      service: "AC Repair Service",
      type: "Less / No Cooling",
      status: "Pending",
      date: "15 Feb 2024",
      time: "10:00 AM - 12:00 PM",
      rating: 4.8,
      reviews: 3287,
      serviceImage: "/ac.png",
      address: "123 Main Street, Raipur",
      technician: "Raj Kumar",
      itemTotal: 1299,
      discount: 100,
      taxes: 49,
    },
    {
      id: "BK-002",
      service: "Plumbing Service",
      type: "Pipe Leakage Repair",
      status: "Pending",
      date: "18 Feb 2024",
      time: "2:00 PM - 4:00 PM",
      rating: 4.9,
      reviews: 3287,
      serviceImage: "/service-plumbing.jpg",
      address: "456 Park Avenue, Raipur",
      technician: "Amit Sharma",
      itemTotal: 899,
      discount: 100,
      taxes: 49,
    },
    {
      id: "BK-003",
      service: "Electrician Service",
      type: "Wiring & Switch Repair",
      status: "Pending",
      date: "10 Feb 2024",
      time: "11:00 AM - 1:00 PM",
      rating: 4.8,
      reviews: 3287,
      serviceImage: "/service-electrician.jpg",
      address: "789 Oak Street, Raipur",
      technician: "Technician unavailable",
      itemTotal: 1599,
      discount: 100,
      taxes: 49,
    },
    {
      id: "BK-004",
      service: "Home Cleaning",
      type: "Full Home Deep Cleaning",
      status: "Completed",
      date: "01 Feb 2024",
      time: "9:00 AM - 11:00 AM",
      rating: 5,
      reviews: 3287,
      serviceImage: "/service-cleaning.jpg",
      address: "321 Elm Road, Raipur",
      technician: "Cleaning Expert",
      itemTotal: 2499,
      discount: 100,
      taxes: 49,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login to View Bookings
          </h2>
          <a
            href="/login"
            className="text-orange-600 font-medium hover:underline"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* <Header /> */}
      <div className="max-w-7xl mx-auto sm:px-2 md:px-4 lg:px-8 py-3">
        {/* <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500 cursor-pointer">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
      
        
          |<span className="text-orange-500 font-medium">Profile</span>
        </div> */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "My Schedule" }]}
        />
        <div className="flex flex-col md:flex-row gap-10 w-full mx-auto">
          {/* Sidebar */}
          {/* <div
            className={`${sidebarOpen ? "block" : "hidden"} md:block md:w-64`}
          >
            <div className="bg-white rounded-xl shadow-xl p-6">
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
                  className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  <span>My Schedule</span>
                </a>
                <a
                  href="/my-booking"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700  rounded-lg font-medium"
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
          </div> */}
          <AccountSidebar />

          {!showBookingDetailsPage && (
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl gap-6">
              {schedules.map((schedule) => (
                <BookingCard
                  key={schedule.id}
                  service={schedule.service}
                  subtitle={`Booking ID: ${schedule.id} | ₹${schedule.itemTotal}`}
                  rating={schedule.rating}
                  reviews={schedule.reviews || 0}
                  date={schedule.date}
                  time={schedule.time}
                  status={
                    schedule.status as "Pending" | "Completed" | "Cancelled"
                  }
                  // onChat={() => handleOpenChat(schedule)}
                  onViewDetails={() => {
                    setSelectedBooking(schedule);
                    setShowBookingDetailsPage(true);
                  }}
                  // onReschedule={() => {
                  //   setSelectedBooking(schedule);
                  //   setShowRescheduleModal(true);
                  // }}
                />
              ))}
            </div>
          )}

          {/* Main Content */}

          {showBookingDetailsPage && selectedBooking && (
            <div className="bg-[#f6f7f9] min-h-screen mx-auto w-[90%] rounded-2xl">
              {/* Back */}
              {/* <button
                onClick={() => setShowBookingDetailsPage(false)}
                className="mb-4 text-orange-600 font-medium"
              >
                ← Back
              </button> */}

              <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-6 lg:gap-10">
                {/* LEFT SECTION */}
                <div className="w-full lg:w-[75%] space-y-6">
                  {/* SERVICE CARD */}
                  <div className="bg-white flex flex-col w-full justify-between border shadow-sm rounded-xl p-3 md:p-5">
                    <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-3">
                      <div className="flex gap-4 w-full">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={selectedBooking.serviceImage}
                            alt={selectedBooking.service}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/service-ac.jpg";
                            }}
                          />
                        </div>

                        <div className="flex flex-col sm:items-end items-start w-full sm:w-auto mt-2 sm:mt-0">
                          <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                            {selectedBooking.service}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {selectedBooking.type}
                          </p>

                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                            <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                            <span>{selectedBooking.rating}</span>
                            <span className="text-gray-400 whitespace-nowrap">
                              | {selectedBooking.reviews} reviews
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-md font-medium">
                          {selectedBooking.status}
                        </span>
                      </div>
                    </div>

                    <div className="py-2">
                      <div className="border-t border-gray-100 my-4"></div>

                      <div className="flex justify-between text-[clamp(11px,1vw,13px)] text-gray-600">
                        <span className="text-gray-400 whitespace-nowrap">
                          Date & Time
                        </span>
                        <span className="font-medium text-gray-800 text-right whitespace-nowrap">
                          {selectedBooking.date} | {selectedBooking.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* COUPONS */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border flex justify-between items-center">
                    <span className="text-gray-600 font-medium cursor-pointer">
                      Coupons & Offers
                    </span>
                    <span className="text-sm text-orange-500">
                      3 Offers {">"}
                    </span>
                  </div>

                  {/* CUSTOMER DETAILS */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border relative">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold">Customer Details</h3>

                      <button
                        onClick={() => setShowSelectAddressModal(true)}
                        className="text-orange-500 hover:text-orange-600 transition"
                      >
                        <Pencil className="w-4 h-4 fill-orange-500 stroke-orange-500" />
                      </button>
                    </div>

                    <p className="font-medium">
                      {selectedBooking.customerName || "Tikesh Dewangan"}
                    </p>

                    <p className="text-sm text-gray-600 leading-6 mt-2">
                      {selectedBooking.address}
                    </p>

                    <p className="text-sm text-gray-600 mt-3">
                      C.N. : {selectedBooking.customerPhone || "+91 9876543210"}
                    </p>

                    <div className="mt-4 flex gap-3">
                      <input
                        placeholder="Apply Coupon"
                        className="bg-white border rounded-lg px-3 py-2 w-full"
                      />
                      <button className="bg-orange-500 text-white px-4 rounded-lg">
                        Apply
                      </button>
                    </div>
                  </div>
                  {/* SERVICE PROVIDER */}

                  {/* ADVANCE SUMMARY */}

                  {/* SUPPORT */}
                  <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col  cursor-pointer hover:shadow-md transition-all">
                    <p>Contact Support</p>
                    <div className="flex justify-between items-center gap-3">
                      {/* Icon */}
                      <div className="flex items-center gap-2 py-2">
                        <div className="w-9 h-9 bg-orange-50 rounded-full flex items-center justify-center">
                          <span className="text-orange-500 text-sm">🏠</span>
                        </div>

                        {/* Text */}
                        <span className="text-gray-800 font-medium">
                          Help Center
                        </span>
                      </div>

                      <span className="text-orange-500 text-lg">›</span>
                    </div>

                    {/* Arrow */}
                  </div>

                  {/* WORK STATUS */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border">
                    <h3 className="font-semibold mb-3">Work Status</h3>

                    <ul className="space-y-3 text-sm">
                      <li className="text-green-600">✔ Order Confirmed</li>
                      <li className="text-gray-400">○ Shipped</li>
                      <li className="text-gray-400">○ Out for Delivery</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setShowRescheduleModal(true)}
                    className="w-full mt-5 border bg-orange-500 text-white py-2 rounded-full"
                  >
                    Reschedule
                  </button>
                </div>

                {/* RIGHT SECTION */}
                <div className="shadow-sm h-fit w-full lg:w-[25%] lg:sticky lg:top-24 order-2 lg:order-none">
                  <h3 className="font-semibold mb-4 dark:text-white">
                    Payment Summary
                  </h3>

                  <div className="space-y-3 bg-white  p-5 rounded-xl text-sm border shadow-sm">
                    <div className="flex justify-between border-b pb-3">
                      <span>Item Total</span>
                      <span>₹{selectedBooking.amount}</span>
                    </div>

                    <div className="flex justify-between border-b pb-3 text-gray-500">
                      <span>Item Discount</span>
                      <span>-₹200</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Taxes and Fees</span>
                      <span>₹49</span>
                    </div>

                    <div className="flex justify-between font-bold border-t pt-2">
                      <span>Total</span>
                      <span>₹548</span>
                    </div>
                  </div>

                  {/* BUTTONS */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <SelectDateTimeModal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        onContinue={handleRescheduleContinue}
        showLocation={true}
        location={selectedBooking?.address}
      />

      {showSelectAddressModal && (
        <SelectAddressModal
          isOpen={showSelectAddressModal}
          onClose={() => setShowSelectAddressModal(false)}
          onContinue={(address) => {
            // setSelectedAddress(address);
            setShowSelectAddressModal(false);
            // setShowTCModal(true);
          }}
          onAddNew={() => {
            setShowSelectAddressModal(false); // close current
            setShowAddNewAddressModal(true); // open new one
          }}
          addresses={[]}
        />
      )}

      <AddNewAddressModal
        isOpen={showAddNewAddressModal}
        onClose={() => setShowAddNewAddressModal(false)}
        onSave={(newAddress) => {
          console.log(newAddress);

          // optional: save selected address
          // setShoSelectedAddress(newAddress);

          // close add address modal
          setShowAddNewAddressModal(false);

          // ✅ directly open Terms & Conditions
          // setShowTCModal(true);
        }}
      />

      {showCancelModal && selectedBooking && (
        <CancelBookingModal
          booking={selectedBooking}
          onClose={() => setShowCancelModal(false)}
          onConfirm={(data) => {
            console.log("Cancel data:", data);

            setShowCancelModal(false);
            successBookingCancel();
          }}
        />
      )}

      {showCancelledSuccess && (
        <BookingCancelledModal
          // booking={selectedBooking}
          onClose={() => {
            setShowCancelledSuccess(false);
            setShowBookingDetailsPage(false);
          }}
        />
      )}

      <SplitACModal
        isOpen={showSplitModal}
        onClose={() => setShowSplitModal(false)}
      />
      {/* Modals */}

      {/* MODAL 1: Equipment Details */}

      {/* MODAL 2: Raise Complaint */}

      {/* <Footer /> */}
    </div>
  );
};

export default MySchedulePage;
