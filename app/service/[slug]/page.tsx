// "use client";

// import { useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import { ChevronRight } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { ServiceSummaryCard } from "@/components/ServiceSummaryCard";
// import { CartSummaryCard } from "@/components/CartSummaryCard";
// import { SubServiceCard } from "@/components/SubServiceCard";
// import { CapacitySelectionModal } from "@/components/CapacitySelectionModal";
// import { AMCDurationModal } from "@/components/AMCDurationModal";
// import { useBooking, CartItem } from "@/context/BookingContext";
// import { SERVICES_DATA } from "@/data/services";

// export default function ServiceDetailPage() {
//   const params = useParams();
//   const slug = params.slug as string;
//   const { addToCart } = useBooking();

//   const service = SERVICES_DATA.find((s) => s.slug === slug);
//   const [activeTab, setActiveTab] = useState(
//     service?.types[0].id || "split-ac"
//   );
//   const [showCapacityModal, setShowCapacityModal] = useState(false);
//   const [showAMCModal, setShowAMCModal] = useState(false);
//   const [selectedService, setSelectedService] = useState<any>(null);
//   const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

//   if (!service) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="max-w-7xl mx-auto px-4 py-16 text-center">
//           <h1 className="text-2xl font-bold text-gray-900">Service Not Found</h1>
//         </div>
//         <Footer />
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
//         serviceId: service.id,
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
//     <div className="min-h-screen bg-gray-50">
//       <Header />

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
//             <div className="relative w-full h-96 rounded-xl overflow-hidden bg-gray-200">
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
//           <div className="flex gap-3 overflow-x-auto pb-2">
//             {service.types.map((type) => (
//               <button
//                 key={type.id}
//                 onClick={() => setActiveTab(type.id)}
//                 style={{
//                   backgroundColor:
//                     activeTab === type.id
//                       ? "#FF6B00"
//                       : "#F3F4F6",
//                   color:
//                     activeTab === type.id
//                       ? "white"
//                       : "#374151",
//                 }}
//                 className="px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all"
//               >
//                 {type.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left: Sub Services List */}
//           <div className="lg:col-span-2 space-y-4">
//             {activeType && activeType.subServices.length > 0 ? (
//               activeType.subServices.map((subService) => (
//                 <SubServiceCard
//                   key={subService.id}
//                   id={subService.id}
//                   image={subService.image}
//                   name={subService.name}
//                   description={subService.description}
//                   rating={subService.rating}
//                   reviews={subService.reviews}
//                   duration={subService.duration}
//                   originalPrice={subService.originalPrice}
//                   discountedPrice={subService.discountedPrice}
//                   onAdd={() => handleAddService(subService)}
//                 />
//               ))
//             ) : (
//               <div className="text-center py-8 text-gray-500">
//                 No services available for this type
//               </div>
//             )}
//           </div>

//           {/* Right: Cart Summary */}
//           <CartSummaryCard />
//         </div>
//       </main>

//       {/* Modals */}
//       <CapacitySelectionModal
//         isOpen={showCapacityModal}
//         onClose={() => {
//           setShowCapacityModal(false);
//           setSelectedService(null);
//         }}
//         serviceName={selectedService?.name || "Service"}
//         onConfirm={handleCapacitySelected}
//         onSelectAMC={() => setShowAMCModal(true)}
//       />

//       <AMCDurationModal
//         isOpen={showAMCModal}
//         onClose={() => setShowAMCModal(false)}
//         onConfirm={handleAMCDurationSelected}
//       />

//       <Footer />
//     </div>
//   );
// }

