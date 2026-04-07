"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import { OTPVerificationModal } from "@/components/OTPVerificationModal";
import { CreditCard, Smartphone, Banknote, Lock } from "lucide-react";

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
      icon: CreditCard,
      label: "Debit / Credit Card",
      sub: "Visa, Mastercard, Rupay",
    },
    {
      id: "upi",
      icon: Smartphone,
      label: "UPI",
      sub: "Google Pay, PhonePe, Paytm",
    },
    {
      id: "cod",
      icon: Banknote,
      label: "Cash on Delivery",
      sub: "Pay cash after service",
    },
  ];

  const handlePayNow = () => {
    if (selectedPayment === "card") {
      if (
        cardDetails.name &&
        cardDetails.number &&
        cardDetails.expiry &&
        cardDetails.cvv
      ) {
        setShowOTPModal(true);
      } else {
        alert("Please fill all card details");
      }
    } else {
      setShowOTPModal(true);
    }
  };

  const handleOTPVerify = (otp: string) => {
    alert("Payment successful! Booking confirmed.");
    router.push("/booking-confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment Method</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Payment Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            {step === "options" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="space-y-0">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => {
                        setSelectedPayment(method.id);
                        if (method.id === "card") {
                          setStep("card");
                        } else {
                          handlePayNow();
                        }
                      }}
                      className="w-full flex items-center justify-between p-6 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <method.icon className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {method.label}
                          </h3>
                          <p className="text-sm text-gray-600">{method.sub}</p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === method.id
                            ? "border-orange-600 bg-orange-100"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedPayment === method.id && (
                          <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Card Details Form */}
            {step === "card" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Enter Card Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, name: e.target.value })
                      }
                      placeholder="Name on card"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          number: e.target.value.replace(/\s/g, ""),
                        })
                      }
                      placeholder="0000 0000 0000 0000"
                      maxLength={16}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            expiry: e.target.value,
                          })
                        }
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value,
                          })
                        }
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setStep("options")}
                    className="text-orange-600 font-semibold hover:underline"
                  >
                    ← Back to Payment Methods
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 pb-4 border-b border-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.subService}</span>
                    <span className="font-semibold text-gray-900">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Taxes & Fees</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Total Amount</span>
                  <span style={{ color: "#FF6B00" }}>₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handlePayNow}
                disabled={!selectedPayment}
                style={{
                  backgroundColor:
                    selectedPayment && step !== "card" ? "#FF6B00" : "#D1D5DB",
                }}
                className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                {step === "card"
                  ? `Pay ₹${totalAmount}`
                  : "Proceed to Payment"}
              </button>

              {step === "card" && (
                <button
                  onClick={handlePayNow}
                  style={{ backgroundColor: "#FF6B00" }}
                  className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity mt-3 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Pay ₹{totalAmount}
                </button>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                ✓ Secure & Encrypted Payment
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

      <Footer />
    </div>
  );
}
