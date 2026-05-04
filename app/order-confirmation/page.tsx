// "use client";

// import { CheckCircle, Calendar, Clock, MapPin, Star, Phone, Home } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const OrderConfirmationPage = () => {
//   // Mock order data
//   const orderData = {
//     orderId: "ORD-2023-001234",
//     date: "15 Nov 2023",
//     time: "10:00 AM - 12:00 PM",
//     total: 4748,
//     address: "123 Main Street, Raipur, Chhattisgarh 492001",
//     customerName: "John Doe",
//     customerPhone: "+91 98765 43210",
//     services: [
//       {
//         id: "1",
//         title: "AC Installation Service",
//         price: 2499,
//         quantity: 1,
//         estimatedTime: "2-3 hours"
//       },
//       {
//         id: "2",
//         title: "Deep Cleaning Service",
//         price: 1999,
//         quantity: 1,
//         estimatedTime: "4-6 hours"
//       }
//     ]
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="py-8">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Success Message */}
//           <div className="text-center mb-12">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <CheckCircle className="w-12 h-12 text-green-500" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
//             <p className="text-xl text-gray-600">Thank you for your booking. Your order has been placed successfully.</p>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Order Details */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Order Summary Card */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <div className="flex justify-between items-start mb-6">
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
//                     <p className="text-gray-600">Order ID: {orderData.orderId}</p>
//                   </div>
//                   <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                     Confirmed
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   {orderData.services.map((service) => (
//                     <div key={service.id} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
//                       <div>
//                         <h3 className="font-medium text-gray-900">{service.title}</h3>
//                         <p className="text-sm text-gray-500">Qty: {service.quantity}</p>
//                       </div>
//                       <div className="text-right">
//                         <div className="font-medium">₹{service.price.toLocaleString()}</div>
//                         <div className="text-sm text-gray-500">{service.estimatedTime}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-6 pt-6 border-t border-gray-200">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span>₹{orderData.total.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between mt-2">
//                     <span className="text-gray-600">Tax</span>
//                     <span>₹{Math.round(orderData.total * 0.05).toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between mt-4 text-lg font-bold">
//                     <span>Total</span>
//                     <span>₹{Math.round(orderData.total * 1.05).toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Service Schedule */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Service Schedule</h2>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="flex items-start gap-4">
//                     <div className="bg-blue-100 p-3 rounded-full">
//                       <Calendar className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">Scheduled Date</h3>
//                       <p className="text-gray-600">{orderData.date}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4">
//                     <div className="bg-blue-100 p-3 rounded-full">
//                       <Clock className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">Time Slot</h3>
//                       <p className="text-gray-600">{orderData.time}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Service Address */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Service Address</h2>

//                 <div className="flex items-start gap-4">
//                   <div className="bg-orange-100 p-3 rounded-full">
//                     <MapPin className="w-5 h-5 text-orange-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">{orderData.customerName}</h3>
//                     <p className="text-gray-600">{orderData.address}</p>
//                     <p className="text-gray-600 mt-1">{orderData.customerPhone}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="space-y-6">
//               {/* Technician Info */}
//               <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6">
//                 <h3 className="font-semibold text-lg mb-4">Your Technician</h3>

//                 <div className="text-center mb-4">
//                   <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
//                     <span className="text-2xl">👨‍🔧</span>
//                   </div>
//                   <h4 className="font-medium text-gray-900">Rajesh Kumar</h4>
//                   <div className="flex items-center justify-center gap-1 mt-1">
//                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                     <span className="text-sm">4.9 (128 reviews)</span>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2">
//                     <Phone className="w-4 h-4" />
//                     Contact Technician
//                   </button>

//                   <button className="w-full py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-300">
//                     Reschedule
//                   </button>
//                 </div>
//               </div>

//               {/* Support Card */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h3 className="font-semibold text-lg mb-4">Need Help?</h3>

//                 <div className="space-y-4">
//                   <div className="flex items-start gap-3">
//                     <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
//                     <div>
//                       <h4 className="font-medium text-gray-900">Customer Support</h4>
//                       <p className="text-sm text-gray-600">+91 98765 43210</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <Home className="w-5 h-5 text-gray-500 mt-0.5" />
//                     <div>
//                       <h4 className="font-medium text-gray-900">Track Order</h4>
//                       <p className="text-sm text-gray-600">Track your service in real-time</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Continue Shopping Button */}
//           <div className="text-center mt-12">
//             <a
//               href="/services"
//               className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
//             >
//               Book Another Service
//             </a>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default OrderConfirmationPage;
"use client";
import Link from "next/link";

import SuccessCard from "@/components/SuccessCard";
import CustomerDetails from "@/components/CustomerDetails";
import CouponCard from "@/components/CouponCard";
import AmountSummary from "@/components/AmountSummary";
import DeepCleaningServices from "@/components/DeepCleaningServices";
import GradientButton2 from "@/components/ui/GradientButton2";

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="w-full">
        <div className="w-full xl:w-[90%] max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col md:flex-row gap-6 lg:gap-10">
          {/* LEFT */}
          <div className="basis-2/3 min-w-0 flex flex-col">
            {/* HEADER */}
            <div className="max-w-full my-6 md:my-8 lg:my-10">
              <h1 className="text-xl md:text-2xl font-semibold mb-3 text-[#1B1B1B] dark:text-gray-200">
                Thanks for giving us opportunity to serve you better
              </h1>
              <p className="text-base lg:text-lg text-[#848484] mb-3 dark:text-gray-400">
                Service Delivery by Fri, 26-jan-2024
              </p>
              <a className="text-base lg:text-lg text-blue-600 font-semibold cursor-pointer">
                Track & Manage Order
              </a>
            </div>

            <SuccessCard />
            <CustomerDetails />

            {/* INFO BOX */}
            <div className="w-full flex items-start gap-4 bg-white border border-[#E1E1E1] rounded-xl my-5 lg:my-8 p-4">
              {/* ICON */}
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img src="/fi.png" className="w-6 h-6 lg:w-8 lg:h-8" />
              </div>

              {/* TEXT */}
              <div className="flex flex-col gap-1">
                <p className="text-sm lg:text-lg font-semibold text-[#666666]">
                  Service providers require OTPs for avail Service
                </p>
                <p className="text-xs lg:text-base text-[#898989]">
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                  amet...
                </p>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="basis-1/3 min-w-0 flex flex-col gap-5 p-4">
            <CouponCard />
            <AmountSummary />

            {/* BUTTON */}
            <div className="flex justify-center mt-6">
              <Link href="/" className="w-full">
                <GradientButton2
                  text="Back to Home"
                  width="w-full"
                  className="text-base lg:text-lg font-medium"
                />
              </Link>
            </div>
          </div>
        </div>

        <DeepCleaningServices title="You might be also interested in" />
      </main>
    </div>
  );
}
