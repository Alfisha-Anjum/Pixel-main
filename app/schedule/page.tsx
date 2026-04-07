"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Home, 
  Calendar, 
  Package, 
  User,
  Search,
  Filter
} from "lucide-react";
import ScheduleEmptyState from "@/components/ScheduleEmptyState";
import ScheduleDetailsModal from "@/components/ScheduleDetailsModal";
import RescheduleModal from "@/components/RescheduleModal";

interface Schedule {
  id: string;
  service: string;
  type: string;
  status: "Pending" | "Completed" | "Running";
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

const MySchedulePage = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openRescheduleModal, setOpenRescheduleModal] = useState(false);

  // Sample schedule data
  const schedules: Schedule[] = [
    {
      id: "1",
      service: "AC Repair",
      type: "Repair & Gas Refill",
      status: "Pending",
      date: "14/06/2023",
      time: "10:00 am",
      rating: 4.8,
      reviews: 3287,
      serviceImage: "/service-ac.jpg",
      address: "123 Main Street, Apt 4B, New York, NY 10001",
      technician: "John Smith",
      itemTotal: 2499,
      discount: 200,
      taxes: 300
    },
    {
      id: "2",
      service: "Refrigerator Repair",
      type: "Compressor Replacement",
      status: "Running",
      date: "15/06/2023",
      time: "02:30 pm",
      rating: 4.6,
      reviews: 2841,
      serviceImage: "/service-fridge.jpg",
      address: "456 Oak Avenue, Suite 2A, Los Angeles, CA 90001",
      technician: "Sarah Johnson",
      itemTotal: 3499,
      discount: 300,
      taxes: 420
    },
    {
      id: "3",
      service: "Washing Machine Repair",
      type: "Motor & Drum Service",
      status: "Completed",
      date: "10/06/2023",
      time: "09:00 am",
      rating: 4.9,
      reviews: 4156,
      serviceImage: "/service-washing.jpg",
      address: "789 Pine Road, Apt 5C, Chicago, IL 60601",
      technician: "Michael Brown",
      itemTotal: 1999,
      discount: 150,
      taxes: 240
    },
    {
      id: "4",
      service: "Microwave Repair",
      type: "Heating Element Fix",
      status: "Pending",
      date: "20/06/2023",
      time: "04:00 pm",
      rating: 4.7,
      reviews: 1923,
      serviceImage: "/service-microwave.jpg",
      address: "321 Maple Lane, Apt 3D, Houston, TX 77001",
      technician: "Emily Davis",
      itemTotal: 1499,
      discount: 100,
      taxes: 180
    }
  ];

  const selectedScheduleData = selectedSchedule
    ? {
        id: selectedSchedule.id,
        serviceTitle: selectedSchedule.service,
        serviceSubtitle: selectedSchedule.type,
        serviceImage: selectedSchedule.serviceImage || "/service-ac.jpg",
        rating: selectedSchedule.rating,
        reviews: selectedSchedule.reviews || 0,
        status: selectedSchedule.status,
        date: selectedSchedule.date,
        time: selectedSchedule.time,
        address: selectedSchedule.address || "",
        technician: selectedSchedule.technician,
        itemTotal: selectedSchedule.itemTotal || 0,
        discount: selectedSchedule.discount || 0,
        taxes: selectedSchedule.taxes || 0
      }
    : null;

  const handleScheduleClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setOpenDetailsModal(true);
  };

  const handleRescheduleClick = () => {
    setOpenDetailsModal(false);
    setOpenRescheduleModal(true);
  };

  const handleRescheduleConfirm = (data: {
    date: string;
    time: string;
    notes: string;
    address?: string;
  }) => {
    console.log("Reschedule confirmed:", data);
    setOpenRescheduleModal(false);
    // Handle reschedule logic here
  };

  const handleServiceClick = (serviceId: string) => {
    window.location.href = `/service/${serviceId}`;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login to View Schedule
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
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden mr-4 p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-[#333]">My Schedule</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search schedule..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B2C] focus:border-[#FF6B2C] w-64"
                />
              </div>
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)] gap-6">
          {/* LEFT SECTION — Sidebar + Content */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {/* Sidebar Card */}
              <div
                className={`${
                  sidebarOpen ? "block" : "hidden"
                } md:block w-full md:w-[260px]`}
              >
                <div className="bg-white rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] p-5">
                  <nav className="space-y-1">
                    <a
                      href="/"
                      className="group flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[#777] hover:bg-gray-50 transition-colors"
                    >
                      <span className="grid place-items-center w-9 h-9 rounded-lg text-[#777] group-hover:bg-gray-100 transition-colors">
                        <Home className="w-5 h-5" />
                      </span>
                      <span className="text-sm font-medium">Home</span>
                    </a>
                    <a
                      href="/schedule"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[#FF6B2C] bg-[#FFE9E2] transition-colors font-semibold"
                    >
                      <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#FFE9E2] text-[#FF6B2C]">
                        <Calendar className="w-5 h-5" />
                      </span>
                      <span className="text-sm font-semibold">My Schedule</span>
                    </a>
                    <a
                      href="/my-booking"
                      className="group flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[#777] hover:bg-gray-50 transition-colors"
                    >
                      <span className="grid place-items-center w-9 h-9 rounded-lg text-[#777] group-hover:bg-gray-100 transition-colors">
                        <Package className="w-5 h-5" />
                      </span>
                      <span className="text-sm font-medium">Bookings</span>
                    </a>
                    <a
                      href="/account"
                      className="group flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[#777] hover:bg-gray-50 transition-colors"
                    >
                      <span className="grid place-items-center w-9 h-9 rounded-lg text-[#777] group-hover:bg-gray-100 transition-colors">
                        <User className="w-5 h-5" />
                      </span>
                      <span className="text-sm font-medium">Account</span>
                    </a>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 w-full">
                {schedules.length === 0 ? (
                  <ScheduleEmptyState onServiceClick={handleServiceClick} />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 pt-5">
                    {schedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        onClick={() => handleScheduleClick(schedule)}
                        className="bg-white rounded-[16px] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all cursor-pointer duration-200"
                      >
                        {/* Row 1: Image, Title/Subtitle, Status Badge */}
                        <div className="flex items-start gap-4 mb-4">
                          {/* Left: Service Image */}
                          <div className="w-16 h-16 rounded-[12px] overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={schedule.serviceImage || "/service-ac.jpg"}
                              alt={schedule.service}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder-service.jpg";
                              }}
                            />
                          </div>

                          {/* Center: Title, Subtitle, Rating */}
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-[#333] mb-1">
                              {schedule.service}
                            </h3>
                            <p className="text-xs text-[#888] mb-2">{schedule.type}</p>
                            <div className="flex items-center gap-1">
                              <svg
                                className="w-3.5 h-3.5 text-[#FFA500]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-xs font-semibold text-[#333]">
                                {schedule.rating} | {schedule.reviews || 0} reviews
                              </span>
                            </div>
                          </div>

                          {/* Right: Status Badge */}
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold flex-shrink-0 ${
                              schedule.status === "Completed"
                                ? "bg-[#E8F5E9] text-[#28C76F]"
                                : schedule.status === "Running"
                                ? "bg-[#E3F2FD] text-[#1976D2]"
                                : "bg-[#FFF1EA] text-[#FF6B2C]"
                            }`}
                          >
                            {schedule.status}
                          </span>
                        </div>

                        {/* Row 2: Date & Time */}
                        <div className="border-t border-[#EEE] pt-4">
                          <p className="text-xs text-[#888] mb-1">Date & Time</p>
                          <p className="text-sm font-semibold text-[#333]">
                            {schedule.date} | {schedule.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedScheduleData && (
        <ScheduleDetailsModal
          isOpen={openDetailsModal}
          onClose={() => {
            setOpenDetailsModal(false);
            setSelectedSchedule(null);
          }}
          onReschedule={handleRescheduleClick}
          schedule={selectedScheduleData}
        />
      )}

      {/* Reschedule Modal */}
      <RescheduleModal
        isOpen={openRescheduleModal}
        onClose={() => setOpenRescheduleModal(false)}
        onConfirm={handleRescheduleConfirm}
      />
    </div>
  );
};

export default MySchedulePage;