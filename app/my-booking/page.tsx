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

const MyBookingPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'pending' | 'rejected' | 'completed'>('pending');
  const [bookingType, setBookingType] = useState<'home' | 'amc'>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
      technicianImage: "/placeholder-user.jpg",
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
      technicianImage: "/placeholder-user.jpg",
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
        status: "Confirmed",
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
        status: "Scheduled",
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
      case 'Confirmed':
      case 'Scheduled':
      case 'Running':
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden mr-4 p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-900">My Bookings</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-64"
                />
              </div>
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:w-64`}>
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
          <div className="flex-1">
            {/* Top Level Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setBookingType('home')}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      bookingType === 'home'
                        ? 'border-[#FF6A00] text-[#FF6A00]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Home Services
                  </button>
                  <button
                    onClick={() => setBookingType('amc')}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      bookingType === 'amc'
                        ? 'border-[#FF6A00] text-[#FF6A00]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    AMC & Packages
                  </button>
                </nav>
              </div>
            </div>

            {bookingType === 'home' ? (
              <>
            {/* Status Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { id: 'pending', label: 'Pending', count: bookings.pending.length },
                    { id: 'rejected', label: 'Rejected', count: bookings.rejected.length },
                    { id: 'completed', label: 'Completed', count: bookings.completed.length }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Booking Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings[activeTab].length > 0 ? (
                bookings[activeTab].map((booking) => (
                  <BookingCard
                    key={booking.id}
                    service={booking.service}
                    subtitle={`Booking ID: ${booking.id} | ₹${booking.amount}`}
                    rating={activeTab === 'pending' && 'technician' in booking ? (booking as PendingBooking).technicianRating : 4.8}
                    reviews={3287}
                    date={booking.date}
                    time={booking.time}
                    status={booking.status as "Pending" | "Completed" | "Cancelled"}
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} bookings</h3>
                  <p className="text-gray-500 mb-6">
                    {activeTab === 'pending' 
                      ? "You don't have any pending bookings at the moment." 
                      : activeTab === 'rejected'
                      ? "You don't have any rejected bookings."
                      : "You haven't completed any bookings yet."
                    }
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
                <div className="bg-white rounded-xl shadow-sm mb-6">
                  <div className="border-b border-gray-200">
                    <nav className="flex">
                      {['Pending', 'Rejected', 'Completed'].map((tab) => (
                        <button
                          key={tab}
                          className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                            tab === 'Pending' // Hardcoded active for demo
                              ? 'border-orange-500 text-orange-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* AMC Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {amcBookings.length > 0 ? (
                  amcBookings.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-xl shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        setSelectedAMC(item);
                        setShowAMCDetailsModal(true);
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          {/* Left: Profile Image */}
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                             <img src={item.technicianImage} alt="Technician" className="w-full h-full object-cover" 
                               onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-user.jpg'; }}
                             />
                          </div>
                          
                          {/* Center Content */}
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-900">{item.title}</h3>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAMC(item);
                                  setShowEquipmentModal(true);
                                }}
                                className="text-gray-400 hover:text-orange-500"
                              >
                                <Info className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs text-[#666]">{item.subtitle}</p>
                            <div className="flex items-center gap-2 mt-1 text-sm text-[#666]">
                              <span>{item.planType}</span>
                              <span>•</span>
                              <span className="text-green-600 font-medium">{item.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-bold text-gray-900">₹{item.price}</span>
                              <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Status */}
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {item.status}
                        </span>
                      </div>

                      {/* Bottom Row */}
                      <div className="mt-4 pt-4 border-t border-[#F1F1F1] flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-[#666]">
                           <Calendar className="w-4 h-4 text-gray-400" />
                           <span>{item.nextSchedule}</span>
                        </div>
                        <div className="flex gap-3">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              // Map AMC item to booking structure for reschedule modal
                              setSelectedBooking({
                                ...item,
                                service: item.title,
                                date: item.nextSchedule,
                                time: "10:00 AM" // Default or from data
                              });
                              setShowRescheduleModal(true);
                            }}
                            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors"
                          >
                            Re-schedule
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowComplaintModal(true);
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-colors"
                          >
                            Raise Complaint
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full bg-white rounded-xl shadow-sm p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No AMC Packages Found</h3>
                  </div>
                )}
                </div>
              </>
            )}
          </div>
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
              <h2 className="text-xl font-bold text-gray-900 mb-6">Split AC (1.5 Ton *2)</h2>
              
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
                    {selectedAMC.equipment && selectedAMC.equipment.length > 0 ? (
                      selectedAMC.equipment.map((eq: any, idx: number) => (
                        <tr key={idx} className="bg-white border-b hover:bg-gray-50">
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
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No equipment details available</td>
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">Please Call the Below Number</h3>
              <p className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-2">
                <Phone className="w-6 h-6" />
                +1 555 6337275
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AMC Details Modal (Billing & Schedule) */}
      {showAMCDetailsModal && selectedAMC && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => setShowAMCDetailsModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">AMC Details</h2>
              
              {/* Billing Section (Left Card style) */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">AMC Billing Details</h3>
                
                <div className="space-y-2 mb-6">
                  {selectedAMC.billing?.items.map((item: string, idx: number) => (
                    <div key={idx} className="text-gray-600">{item}</div>
                  ))}
                </div>
                
                <div className="space-y-2 border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-bold">₹{selectedAMC.billing?.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paid</span>
                    <span className="font-bold text-green-600">₹{selectedAMC.billing?.paid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Balance Amount</span>
                    <span className="font-bold text-red-600">₹{selectedAMC.billing?.balance}</span>
                  </div>
                </div>
              </div>
              
              {/* Schedule Table */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">AMC Schedule</h3>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 font-medium">
                      <tr>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Upcoming Date</th>
                        <th className="px-4 py-3">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedAMC.schedule && selectedAMC.schedule.length > 0 ? (
                        selectedAMC.schedule.map((sch: any, idx: number) => (
                          <tr key={idx} className="bg-white">
                            <td className={`px-4 py-3 font-medium ${
                              sch.status === 'Completed' ? 'text-green-600' :
                              sch.status === 'Upcoming' ? 'text-red-600' :
                              'text-gray-500'
                            }`}>
                              {sch.status}
                            </td>
                            <td className="px-4 py-3 text-gray-900">{sch.date}</td>
                            <td className="px-4 py-3 text-gray-600">{sch.details}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-4 py-3 text-center text-gray-500">No schedule available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
              console.log('Rescheduling booking:', selectedBooking.id, 'to', date, time, 'with notes:', notes);
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
              console.log('Cancelling booking:', selectedBooking.id, 'reason:', reason);
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
    </div>
  );
};

export default MyBookingPage;