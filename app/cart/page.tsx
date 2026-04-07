"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import AddressSelectionModal from "@/components/AddressSelectionModal";
import { TermsConditionsModal } from "@/components/TermsConditionsModal";
import { Trash2, Plus, ChevronDown } from "lucide-react";

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  postal: string;
}

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, selectedAddress, setSelectedAddress } = useBooking();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showTCModal, setShowTCModal] = useState(false);
  const [frequentlyAddedOpen, setFrequentlyAddedOpen] = useState(true);

  const totalMRP = cartItems.reduce((sum, item) => sum + item.price * 1.2, 0);
  const totalDiscount = totalMRP - cartItems.reduce((sum, item) => sum + item.price, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const frequentlyAdded = [
    {
      id: 1,
      name: "Extended Warranty",
      price: 1999,
      image: "/hero1.png",
    },
    {
      id: 2,
      name: "Same-day Service",
      price: 499,
      image: "/hero2.png",
    },
    {
      id: 3,
      name: "Service Package",
      price: 2999,
      image: "/hero3.png",
    },
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Start by selecting a service</p>
          <button
            onClick={() => router.push("/services")}
            style={{ backgroundColor: "#FF6B00" }}
            className="text-white font-bold px-8 py-3 rounded-lg hover:opacity-90"
          >
            Browse Services
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleContinue = () => {
    if (!selectedAddress) {
      setShowAddressModal(true);
    } else if (!showTCModal) {
      setShowTCModal(true);
    } else {
      router.push("/booking-payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Customer Details</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="10 digit number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-900">{item.subService}</h3>
                      <p className="text-sm text-gray-600">
                        {item.serviceName} • {item.capacity || "Standard"}
                        {item.amc && ` • ${item.amc} AMC`}
                      </p>
                      <p className="text-sm text-gray-500">Duration: {item.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{item.price}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 text-sm hover:underline mt-1"
                      >
                        <Trash2 className="w-4 h-4 inline mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Added Together */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <button
                onClick={() => setFrequentlyAddedOpen(!frequentlyAddedOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-lg font-bold text-gray-900">Frequently Added Together</h2>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    frequentlyAddedOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {frequentlyAddedOpen && (
                <div className="overflow-x-auto">
                  <div className="flex gap-4 pb-2">
                    {frequentlyAdded.map((item) => (
                      <div
                        key={item.id}
                        className="flex-shrink-0 w-40 p-3 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow"
                      >
                        <div className="w-full h-24 bg-gray-100 rounded-lg mb-2"></div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">{item.name}</p>
                        <p className="text-green-600 font-bold mb-2">₹{item.price}</p>
                        <button
                          className="w-full bg-orange-100 text-orange-600 font-bold py-1 rounded hover:bg-orange-200 transition-colors flex items-center justify-center gap-1"
                          style={{ color: "#FF6B00" }}
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Amount Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Amount Summary</h2>

              <div className="space-y-3 mb-6 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total MRP</span>
                  <span>₹{totalMRP.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹{totalDiscount.toFixed(0)}</span>
                </div>
              </div>

              <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <span className="font-bold">WELCOME20</span> - Get 20% off on first booking
                </p>
              </div>

              <div className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Total Amount</span>
                  <span style={{ color: "#FF6B00" }}>₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handleContinue}
                style={{ backgroundColor: "#FF6B00" }}
                className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Continue
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                ✓ Secure Checkout • Next day delivery available
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddressSelectionModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onContinue={(address: Address) => {
          setSelectedAddress(address);
          setShowAddressModal(false);
          setShowTCModal(true);
        }}
        onAddNewAddress={() => {
          // Handle add new address
        }}
      />

      <TermsConditionsModal
        isOpen={showTCModal}
        onClose={() => setShowTCModal(false)}
        onConfirm={() => {
          router.push("/booking-payment");
        }}
      />

      <Footer />
    </div>
  );
}
