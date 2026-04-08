"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import AddressSelectionModal from "@/components/AddressSelectionModal";
import { TermsConditionsModal } from "@/components/TermsConditionsModal";
import { Trash2, Plus, ChevronDown } from "lucide-react";
import { SelectDateTimeModal } from "@/components/booking-flow/SelectDateTimeModal";
import { SelectAddressModal } from "@/components/booking-flow/SelectAddressModal";
import AddNewAddressModal from "@/components/AddNewAddressModal";

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
const [showDateTimeModal, setShowDateTimeModal] = useState(false);
const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);
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

const handleContinue = () => {

    setShowDateTimeModal(true); // 👈 open date modal instead
  
};
const handleDateTimeContinue = (date, time, notes) => {
  console.log(date, time, notes);

  setShowDateTimeModal(false); // close date modal
  setShowAddressModal(true); // ✅ OPEN ADDRESS MODAL
};
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cart Summary</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Customer Details
              </h2>

              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-800">
                    Mr Tikesh Dewangan
                    <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
                      Home
                    </span>
                  </p>

                  <p className="text-sm text-gray-500 mt-1 max-w-md">
                    Office No 201, atlantis Corporate Park, Ring Road No.1,
                    Telibandha, Raipur 492001
                  </p>

                  <p className="text-sm text-gray-500 mt-1">+91 7247999000</p>
                </div>

                <button className="border border-orange-500 text-orange-500 px-4 py-1.5 rounded-lg text-sm">
                  Change Address
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-3 items-center">
                    {/* Title */}
                    <div>
                      <p className="text-sm text-gray-600">{item.subService}</p>
                      <p className="text-xs text-gray-400">
                        {item.serviceName}
                      </p>
                    </div>

                    {/* Qty */}
                    <div className="flex justify-center">
                      <div className="flex items-center border border-orange-400 rounded-md px-2 gap-2 h-7">
                        <button>-</button>
                        <span>{item.quantity || 1}</span>
                        <button>+</button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹{item.price}
                      </p>
                      <p className="text-xs text-gray-400 line-through">
                        ₹{Math.round(item.price * 1.2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Added Together */}
            {/* <div className="bg-white rounded-xl shadow-md p-6">
              <button
                onClick={() => setFrequentlyAddedOpen(!frequentlyAddedOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-lg font-bold text-gray-900">
                  Frequently Added Together
                </h2>
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
                        <p className="font-semibold text-gray-900 text-sm mb-1">
                          {item.name}
                        </p>
                        <p className="text-green-600 font-bold mb-2">
                          ₹{item.price}
                        </p>
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
            </div> */}
          </div>

          {/* Right: Amount Summary */}

          <div className="lg:col-span-1 gap-5 flex flex-col">
            <div className="border border-orange-400 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">Coupons $ Offer</p>
                  <p className="text-xs text-gray-500">
                    Save upto 15% on every booking
                  </p>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Amount Summary
              </h2>

              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Total Item (3)</span>
                  <span>₹{totalMRP.toFixed(0)}</span>
                </div>

                <div className="flex justify-between text-gray-400 ">
                  <span>Total Discount</span>
                  <span>₹{totalDiscount.toFixed(0)}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>₹50</span>
                </div>
              </div>

              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>

              <button
                className="w-full py-3 rounded-full text-white font-semibold bg-orange-600 hover:bg-orange-700 transition-colors"
                onClick={handleContinue}
              >
                Continue
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
            <div>
              <img
                src="/easy.png"
                alt="Payment Methods"
                className="w-full px-4"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <SelectAddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onContinue={(address) => {
          setSelectedAddress(address);
          setShowAddressModal(false);
          setShowTCModal(true);
        }}
        onAddNew={() => {
          setShowAddressModal(false); // close current
          setShowAddNewAddressModal(true); // open new one
        }}
      />
      <SelectDateTimeModal
        isOpen={showDateTimeModal}
        onClose={() => setShowDateTimeModal(false)}
        onContinue={handleDateTimeContinue}
      />

      <AddNewAddressModal
        isOpen={showAddNewAddressModal}
        onClose={() => setShowAddNewAddressModal(false)}
        onSave={(newAddress) => {
          console.log(newAddress);

          // optional: save selected address
          setSelectedAddress(newAddress);

          // close add address modal
          setShowAddNewAddressModal(false);

          // ✅ directly open Terms & Conditions
          setShowTCModal(true);
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
