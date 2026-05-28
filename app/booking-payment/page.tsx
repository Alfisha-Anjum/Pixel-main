// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { useBooking } from "@/context/BookingContext";
// import { OTPVerificationModal } from "@/components/OTPVerificationModal";
// import { CreditCard, Smartphone, Banknote, Lock } from "lucide-react";

// export default function PaymentPage() {
//   const router = useRouter();
//   const { cartItems } = useBooking();
//   const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
//   const [step, setStep] = useState<"options" | "card" | "otp">("options");
//   const [showOTPModal, setShowOTPModal] = useState(false);
//   const [cardDetails, setCardDetails] = useState({
//     name: "",
//     number: "",
//     expiry: "",
//     cvv: "",
//   });

//   const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

//   const paymentMethods = [
//     {
//       id: "card",
//       icon: CreditCard,
//       label: "Debit / Credit Card",
//       sub: "Visa, Mastercard, Rupay",
//     },
//     {
//       id: "upi",
//       icon: Smartphone,
//       label: "UPI",
//       sub: "Google Pay, PhonePe, Paytm",
//     },
//     {
//       id: "cod",
//       icon: Banknote,
//       label: "Cash on Delivery",
//       sub: "Pay cash after service",
//     },
//   ];

//   const handlePayNow = () => {
//     if (selectedPayment === "card") {
//       if (
//         cardDetails.name &&
//         cardDetails.number &&
//         cardDetails.expiry &&
//         cardDetails.cvv
//       ) {
//         setShowOTPModal(true);
//       } else {
//         alert("Please fill all card details");
//       }
//     } else {
//       setShowOTPModal(true);
//     }
//   };

//   const handleOTPVerify = (otp: string) => {
//     alert("Payment successful! Booking confirmed.");
//     router.push("/booking-confirmation");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment Method</h1>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left: Payment Options */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Payment Method Selection */}
//             {step === "options" && (
//               <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                 <div className="space-y-0">
//                   {paymentMethods.map((method) => (
//                     <button
//                       key={method.id}
//                       onClick={() => {
//                         setSelectedPayment(method.id);
//                         if (method.id === "card") {
//                           setStep("card");
//                         } else {
//                           handlePayNow();
//                         }
//                       }}
//                       className="w-full flex items-center justify-between p-6 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors text-left"
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
//                           <method.icon className="w-6 h-6 text-orange-600" />
//                         </div>
//                         <div>
//                           <h3 className="font-bold text-gray-900">
//                             {method.label}
//                           </h3>
//                           <p className="text-sm text-gray-600">{method.sub}</p>
//                         </div>
//                       </div>
//                       <div
//                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                           selectedPayment === method.id
//                             ? "border-orange-600 bg-orange-100"
//                             : "border-gray-300"
//                         }`}
//                       >
//                         {selectedPayment === method.id && (
//                           <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Card Details Form */}
//             {step === "card" && (
//               <div className="bg-white rounded-xl shadow-md p-6">
//                 <h2 className="text-lg font-bold text-gray-900 mb-6">
//                   Enter Card Details
//                 </h2>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Card Holder Name
//                     </label>
//                     <input
//                       type="text"
//                       value={cardDetails.name}
//                       onChange={(e) =>
//                         setCardDetails({ ...cardDetails, name: e.target.value })
//                       }
//                       placeholder="Name on card"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Card Number
//                     </label>
//                     <input
//                       type="text"
//                       value={cardDetails.number}
//                       onChange={(e) =>
//                         setCardDetails({
//                           ...cardDetails,
//                           number: e.target.value.replace(/\s/g, ""),
//                         })
//                       }
//                       placeholder="0000 0000 0000 0000"
//                       maxLength={16}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Expiry Date
//                       </label>
//                       <input
//                         type="text"
//                         value={cardDetails.expiry}
//                         onChange={(e) =>
//                           setCardDetails({
//                             ...cardDetails,
//                             expiry: e.target.value,
//                           })
//                         }
//                         placeholder="MM/YY"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         CVV
//                       </label>
//                       <input
//                         type="password"
//                         value={cardDetails.cvv}
//                         onChange={(e) =>
//                           setCardDetails({
//                             ...cardDetails,
//                             cvv: e.target.value,
//                           })
//                         }
//                         placeholder="123"
//                         maxLength={3}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
//                       />
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => setStep("options")}
//                     className="text-orange-600 font-semibold hover:underline"
//                   >
//                     ← Back to Payment Methods
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right: Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
//               <h2 className="text-lg font-bold text-gray-900 mb-4">
//                 Order Summary
//               </h2>

//               <div className="space-y-3 mb-6 pb-4 border-b border-gray-200">
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="flex justify-between text-sm">
//                     <span className="text-gray-600">{item.subService}</span>
//                     <span className="font-semibold text-gray-900">
//                       ₹{item.price}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-2 mb-6 pb-4 border-b border-gray-200">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>Subtotal</span>
//                   <span>₹{totalAmount}</span>
//                 </div>
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>Taxes & Fees</span>
//                   <span>₹0</span>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <div className="flex justify-between font-bold text-lg text-gray-900">
//                   <span>Total Amount</span>
//                   <span style={{ color: "#FF6B00" }}>₹{totalAmount}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={handlePayNow}
//                 disabled={!selectedPayment}
//                 style={{
//                   backgroundColor:
//                     selectedPayment && step !== "card" ? "#FF6B00" : "#D1D5DB",
//                 }}
//                 className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 <Lock className="w-4 h-4" />
//                 {step === "card"
//                   ? `Pay ₹${totalAmount}`
//                   : "Proceed to Payment"}
//               </button>

//               {step === "card" && (
//                 <button
//                   onClick={handlePayNow}
//                   style={{ backgroundColor: "#FF6B00" }}
//                   className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity mt-3 flex items-center justify-center gap-2"
//                 >
//                   <Lock className="w-4 h-4" />
//                   Pay ₹{totalAmount}
//                 </button>
//               )}

//               <p className="text-xs text-gray-500 text-center mt-4">
//                 ✓ Secure & Encrypted Payment
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* OTP Modal */}
//       <OTPVerificationModal
//         isOpen={showOTPModal}
//         onClose={() => setShowOTPModal(false)}
//         onConfirm={handleOTPVerify}
//       />

//       <Footer />
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import { OTPVerificationModal } from "@/components/OTPVerificationModal";
import { CreditCard, Smartphone, Banknote, Lock } from "lucide-react";
import axios from "axios";

export default function PaymentPage() {
  const router = useRouter();
  const { cartItems } = useBooking();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [step, setStep] = useState<"options" | "card" | "otp">("options");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

 const paymentMethods = [
   {
     id: "card",
     img: "/credit.png",
     label: "Credit Card / Debit Card",
     sub: "Visa, Mastercard, Rupay",
   },
   {
     id: "gpay",
     img: "/google.png",
     label: "Google Pay",
     sub: "Pay using Google Pay",
   },
   {
     id: "paypal",
     img: "/paypal.png",
     label: "PayPal",
     sub: "Secure international payments",
   },
   {
     id: "applepay",
     img: "/apple.png",
     label: "Apple Pay",
     sub: "Fast checkout with Apple devices",
   },
   {
     id: "cod",
     img: "/cod.png",
     label: "Cash on Delivery",
     sub: "Pay cash after service",
   },
 ];

 const createBooking = async () => {
   try {
     const token = localStorage.getItem("token");
     const bookingDateTime = JSON.parse(
       localStorage.getItem("bookingDateTime") || "{}",
     );
     const selectedAddress = JSON.parse(
       localStorage.getItem("selectedAddress") || "{}",
     );

     const payload = {
       date: bookingDateTime.date,
       slot_id: bookingDateTime.slotId || 1,
       customer_notes: bookingDateTime.notes || "",
       address_id: String(selectedAddress?.id || 1),
       payment_type: selectedPayment === "cod" ? "COD" : "ONLINE",
       gst_no: "22AAAAA0000A1Z5",
       pan_no: "ABCDE1234F",
       service_category_id: Number(
         cartItems[0]?.service_category_id ||
           cartItems[0]?.serviceCategoryId ||
           1,
       ),
       service_id: Number(
         cartItems[0]?.service_id || cartItems[0]?.serviceId || 1,
       ),
       razorpay_payment_id: "",
       state_name: "Chhattisgarh",
       city_name: "Raipur",
     };

     const res = await axios.post(
       "https://taskpro.itmingo.com/api/customers/customer-bookings",
       payload,
       {
         headers: {
           Accept: "*/*",
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
       },
     );

     if (res.data?.status) {
       alert("Booking Created Successfully!");
       router.push("/booking-confirmation");
     }
   } catch (error: any) {
     console.log("BOOKING API ERROR:", error?.response?.data || error);
     alert("Booking failed");
   }
 };

 const handlePayNow = () => {
   if (!selectedPayment) {
     alert("Please select payment method");
     return;
   }

   createBooking();
 };

  const handleOTPVerify = (otp: string) => {
    alert("Payment successful! Booking confirmed.");
    router.push("/booking-confirmation");
  };

  return (
    <div className="min-h-screen ">
      {/* <Header /> */}

      <main className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
            <div className="bg-white border rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-700">Payment Option</h2>
                <button className="border border-orange-500 text-orange-500 px-4 w-32 py-1 rounded-md text-sm">
                  Pay ₹{totalAmount}
                </button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setSelectedPayment(method.id);

                      if (method.id === "card") {
                        router.push("/card-details"); // redirect here
                      } else {
                        handlePayNow();
                      }
                    }}
                    className="w-full flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={method.img}
                        alt={method.label}
                        className="w-6 h-6 object-contain"
                      />
                      <div className="text-left">
                        <span className="font-medium block">
                          {method.label}
                        </span>
                        <span className="text-sm text-gray-500">
                          {method.sub}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border ${
                        selectedPayment === method.id
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-400"
                      }`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE SUMMARY */}
          <div>
            <div className="bg-white border rounded-xl p-6">
              <h2 className="font-semibold mb-4">Amount Summary</h2>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Total Item ({cartItems.length})</span>
                  <span>₹{totalAmount + 300}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Total Discount</span>
                  <span>₹300</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>₹50</span>
                </div>
              </div>

              <div className="flex justify-between font-semibold mb-4">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>

              <button
                onClick={handlePayNow}
                className="w-full py-3  rounded-full text-white font-semibold"
                style={{
                  background: "linear-gradient(to right, #ff6a00, #ff9f1c)",
                }}
              >
                Pay ₹{totalAmount}
              </button>
              <div className="flex items-center gap-3">
                <p className="text-xs text-gray-500 text-center mt-3">
                  🔒 Safe & secure checkout
                </p>
                <img
                  src="/grp.png"
                  alt="Payment Methods"
                  className="w-40 mt-4"
                />
              </div>
            </div>
            <div className="flex justify-center items-center mx-auto gap-3 w-[100%] py-4">
              <img src="/tick.png" alt="Payment Methods" className="w-8 h-6" />
              <p className="text-sm font-bold text-[#666666] w-3/4">
                Easy Cancellation/Returns, Background Verified Service Provide.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* OTP Modal */}
      <OTPVerificationModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onConfirm={handleOTPVerify}
      />

      {/* <Footer /> */}
    </div>
  );
}
