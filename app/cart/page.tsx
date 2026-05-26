"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { TermsConditionsModal } from "@/components/TermsConditionsModal";
import { Trash2, Plus, ChevronDown, ArrowLeft } from "lucide-react";
import { SelectDateTimeModal } from "@/components/booking-flow/SelectDateTimeModal";
import { SelectAddressModal } from "@/components/booking-flow/SelectAddressModal";
import AddNewAddressModal from "@/components/AddNewAddressModal";
import DeepCleaningServices from "@/components/DeepCleaningServices";
import axios from "axios";

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  postal: string;
}

export default function CartPage() {
  const router = useRouter();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    selectedAddress,
    setSelectedAddress,
  } = useBooking();
  // const [cartItems, setCartItems] = useState<CartItemService[]>([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showTCModal, setShowTCModal] = useState(false);
  const [frequentlyAddedOpen, setFrequentlyAddedOpen] = useState(true);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);
  const [showDateTimeModal, setShowDateTimeModal] = useState(false);
  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);
  const totalMRP = cartItems.reduce(
    (sum, item: any) =>
      sum +
      (item.originalPrice || item.price || item.discountedPrice || 0) *
        (item.quantity || 1),
    0,
  );

  const totalAmount = cartItems.reduce(
    (sum, item: any) =>
      sum + (item.price || item.discountedPrice || 0) * (item.quantity || 1),
    0,
  );

  const totalDiscount = totalMRP - totalAmount;

  const [addresses, setAddresses] = useState<any[]>([]);
  const displayAddress = selectedAddress || addresses[0];
  const [showCoupons, setShowCoupons] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  // const [token, setToken] = useState<string | null>(null);

const createCustomerCart = async () => {
  if (!cartItems.length) return alert("Cart is empty");

  try {
    setCartLoading(true);

    const token = localStorage.getItem("token");

    const payload = {
      service_category_id: Number(
        cartItems[0]?.service_category_id ||
          cartItems[0]?.serviceCategoryId ||
          1,
      ),
      service_id: Number(
        cartItems[0]?.service_id || cartItems[0]?.serviceId || 1,
      ),
      carts: cartItems.map((item: any) => ({
        service_sub_category_id: Number(
          item.service_sub_category_id ||
            item.serviceSubCategoryId ||
            item.sub_category_id ||
            1,
        ),
        service_issue_id: Number(item.service_issue_id || item.id),
        quantity: Number(item.quantity || 1),
      })),
    };

    const res = await axios.post(
      "https://taskpro.itmingo.com/api/customers/customer-carts?state_id=1&city_id=1&state_name=Chhattisgarh&city_name=Raipur",
      payload,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.data?.status) {
      setShowDateTimeModal(true);
    }
  } catch (error: any) {
    console.log("CART API ERROR:", error?.response?.data || error);
    setShowDateTimeModal(true);
  } finally {
    setCartLoading(false);
  }
};

  // const token = localStorage.getItem("token");

  const updateQuantity = (item: any, type: "increase" | "decrease") => {
    if (type === "increase") {
      addToCart({
        ...item,
        quantity: 1,
      });
    } else {
      removeFromCart(item.id);
    }
  };

  const getCustomerAddresses = async (token: string) => {
    const res = await axios.get(
      "https://taskpro.itmingo.com/api/customers/customer-addresses",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    return res.data;
  };

  const addCustomerAddress = async (token: string, formData: any) => {
    const cleanPhone = (value: string) => {
      const digits = value
        .replace(/\D/g, "")
        .replace(/^91/, "")
        .replace(/^0/, "");
      return `+91 ${digits}`;
    };

    const altRaw = formData.alternateNumber || formData.altPhone || "";
    const altDigits = altRaw
      .replace(/\D/g, "")
      .replace(/^91/, "")
      .replace(/^0/, "");

  const payload = {
    service_category_id: Number(
      cartItems[0]?.service_category_id || cartItems[0]?.serviceCategoryId || 1,
    ),

    service_id: Number(
      cartItems[0]?.service_id || cartItems[0]?.serviceId || 1,
    ),

    carts: cartItems.map((item: any) => ({
      service_sub_category_id: Number(
        item.service_sub_category_id ||
          item.serviceSubCategoryId ||
          item.sub_category_id,
      ),

      service_issue_id: Number(item.service_issue_id || item.id),

      quantity: Number(item.quantity || 1),
    })),
  };

    payload.alt_contact_number =
      altDigits.length === 10 ? `+91 ${altDigits}` : payload.contact_number;

    console.log("POST PAYLOAD:", payload);

    const res = await axios.post(
      "https://taskpro.itmingo.com/api/customers/customer-addresses",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    return res.data;
  };

  const updateCustomerAddress = async (
    token: string,
    id: number,
    formData: any,
  ) => {
    const cleanPhone = (value: string) => {
      const digits = value
        .replace(/\D/g, "")
        .replace(/^91/, "")
        .replace(/^0/, "");
      return `+91 ${digits}`;
    };

    const altRaw = formData.alternateNumber || formData.altPhone || "";
    const altDigits = altRaw
      .replace(/\D/g, "")
      .replace(/^91/, "")
      .replace(/^0/, "");

    const payload: any = {
      full_name: formData.fullName || formData.name || "",
      contact_number: cleanPhone(
        formData.contactNumber || formData.phone || "",
      ),
      postal_code: formData.postalCode || formData.pincode || "",
      latitude: 21.2514,
      longitude: 81.6296,
      state_id: 1,
      city_id: 1,
      house_number: formData.houseNo || "",
      street:
        formData.street ||
        formData.landmark ||
        formData.roadLandmark ||
        formData.location ||
        formData.address ||
        formData.houseNo ||
        "",
      type: "Home",
      is_active: 1,
    };

    payload.alt_contact_number =
      altDigits.length === 10 ? `+91 ${altDigits}` : payload.contact_number;

    const res = await axios.put(
      `https://taskpro.itmingo.com/api/customers/customer-addresses/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    return res.data;
  };

  const fetchAddresses = async () => {
    if (!token) return;

    const res = await getCustomerAddresses(token);
    setAddresses(res.data || []);
  };


 useEffect(() => {
   const fetchAddressesData = async () => {
     const token = localStorage.getItem("token");

     if (!token) return;

     try {
       const res = await getCustomerAddresses(token);
       setAddresses(res.data || []);
     } catch (error) {
       console.log("ADDRESS ERROR:", error);
     }
   };

   fetchAddressesData();
 }, []);

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
    createCustomerCart();
  };

  const handleDateTimeContinue = (
    date: string,
    time: string,
    notes: string,
  ) => {
    console.log(date, time, notes);

    setShowDateTimeModal(false); // close date modal
    setShowAddressModal(true); // ✅ OPEN ADDRESS MODAL
  };
  return (
    <>
      <div className="min-h-screen dark:bg-gray-900">
        {/* <Header /> */}

        <main className="max-w-7xl mx-auto px:3 md:px-5 lg:px-8">
          <h1 className="hidden md:block text-2xl font-bold text-gray-900 dark:text-white mb-5">
            Cart Summary
          </h1>
          <div className="w-full flex justify-between items-center md:hidden">
            {/* Back */}
            <button
              onClick={() => router.back()}
              className="text-black dark:text-white font-medium flex items-center gap-2 hover:text-orange-500 transition"
            >
              <ArrowLeft size={20} />
              View Cart
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Details */}
              <div className="hidden md:block bg-white rounded-2xl border border-gray-200 p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Customer Details
                </h2>
                <div className="flex items-start justify-between flex-wrap gap-5">
                  <div>
                    {displayAddress ? (
                      <>
                        <p className="font-medium text-gray-800">
                          {displayAddress.full_name || "Customer Name"}
                          <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
                            {displayAddress.type || "Home"}
                          </span>
                        </p>

                        <p className="text-sm text-gray-500 mt-1 max-w-md">
                          {displayAddress.house_number}, {displayAddress.street}
                          , {displayAddress.city?.name || "Raipur"}{" "}
                          {displayAddress.postal_code}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {displayAddress.contact_number}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No address selected
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setShowAddressModal(true);
                    }}
                    className="border border-orange-500 text-orange-500 px-4 py-1.5 rounded-lg text-sm"
                  >
                    Change Address
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              {/* Order Summary */}
              <div className="bg-white rounded-[30px] border border-[#E5E5E5] p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">
                  Order Summary
                </h2>

                <div className="space-y-6">
                  {cartItems?.length > 0 ? (
                    cartItems.map((item: any) => {
                      const qty = item.quantity || 1;
                      const price = item.price || item.discountedPrice || 0;
                      const originalPrice = item.originalPrice || 0;

                      return (
                        <div
                          key={item.id}
                          className="grid grid-cols-4 items-center py-2"
                        >
                          {/* Service Name */}
                          <div className="min-w-0">
                            <p className="text-[13px] md:text-sm text-gray-700 leading-5 font-medium truncate">
                              {item.subService || item.name}
                            </p>

                            <p className="text-[12px] text-gray-400 leading-5 truncate">
                              ({item.serviceName || "Split AC"})
                            </p>
                          </div>

                          {/* Quantity */}
                          <div className="flex justify-center">
                            <div className="flex items-center justify-between w-[90px] h-[28px] border border-[#FF6A00] rounded-[8px] px-5 py-1 shadow-[0_2px_8px_rgba(255,106,0,0.15)]">
                              <button
                                onClick={() => updateQuantity(item, "decrease")}
                                className="text-[#FF6A00] text-[16px] leading-none"
                              >
                                −
                              </button>

                              <span className="text-[13px] text-black">
                                {qty}
                              </span>

                              <button
                                onClick={() => updateQuantity(item, "increase")}
                                className="text-[#FF6A00] text-[16px] leading-none"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-[13px] font-semibold text-black leading-4">
                              ₹{price * qty}
                            </p>

                            <p className="text-[11px] text-[#A0A0A0] line-through mt-1">
                              ₹{originalPrice * qty}
                            </p>
                          </div>

                          {/* Delete */}
                          <div className="flex justify-end">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#FF3B30]"
                            >
                              <Trash2 size={18} strokeWidth={1.7} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-sm">No items in cart</p>
                  )}
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

            <div className="lg:col-span-1 gap-5 flex flex-col sticky top-6">
              <div className="hidden md:block border border-orange-500 rounded-xl px-4 py-3">
                {/* Header */}
                <button
                  onClick={() => setShowCoupons(!showCoupons)}
                  className="w-full flex items-center justify-between "
                >
                  <div className="flex gap-4">
                    <div className=" ">
                      <img src="/coupon.png" />
                    </div>
                    <div className="flex flex-col gap-2 items-start ">
                      {" "}
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Coupons & Offer
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        Save upto 15% on every booking
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 dark:text-gray-300 transition-transform ${
                      showCoupons ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expand Section */}
                {showCoupons && (
                  <div className="mt-8 space-y-4">
                    {/* Item 1 */}
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-white text-xs">
                        %
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-gray-800">
                          Assured Cashback on Paytm
                        </p>
                        <p className="text-xs text-gray-500">
                          Flat ₹30 Cashback
                        </p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-white text-xs">
                        %
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Assured Cashback on CRED
                        </p>
                        <p className="text-xs text-gray-500">
                          Get cashback of ₹10
                        </p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-3 pb-6">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-white text-xs">
                        %
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          15% off on Kotak Debit Cards
                        </p>
                        <p className="text-xs text-gray-500">
                          15% off up to ₹250
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment Summary
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
                  className="w-full py-3 rounded-full text-white font-semibold bg-orange-600 hover:bg-orange-700 transition-colors disabled:opacity-60"
                  onClick={handleContinue}
                  disabled={cartLoading}
                >
                  {cartLoading ? "Creating Cart..." : "Continue"}
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
              <div className="flex justify-center items-center mx-auto gap-3 w-[100%]">
                <img
                  src="/tick.png"
                  alt="Payment Methods"
                  className="w-8 h-6"
                />
                <p className="text-sm font-bold text-[#666666] w-3/4">
                  Easy Cancellation/Returns, BackgroundVerified Service Provide.
                </p>
              </div>
            </div>
          </div>
        </main>
        <DeepCleaningServices title="Frequently Added Together" />

        {/* Modals */}
        <SelectAddressModal
          isOpen={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          addresses={addresses}
          onContinue={(address) => {
            setSelectedAddress(address);
            setShowAddressModal(false);
            setShowTCModal(true);
          }}
          onAddNew={() => {
            setEditingAddress(null);
            setShowAddressModal(false);
            setShowAddNewAddressModal(true);
          }}
        />

        <SelectDateTimeModal
          isOpen={showDateTimeModal}
          onClose={() => setShowDateTimeModal(false)}
          onContinue={handleDateTimeContinue}
          serviceId={
            cartItems?.[0]?.service_id || cartItems?.[0]?.serviceId || 1
          }
        />
        <AddNewAddressModal
          isOpen={showAddNewAddressModal}
          onClose={() => {
            setShowAddNewAddressModal(false);
            setEditingAddress(null);
          }}
          onSave={async (newAddress) => {
            if (!token) return;

            try {
              await addCustomerAddress(token, newAddress);

              await fetchAddresses();

              setShowAddNewAddressModal(false);
              setEditingAddress(null);
              setShowAddressModal(true);
            } catch (error: any) {
              console.log("VALIDATION ERROR:", error.response?.data);
            }
          }}
        />

        <TermsConditionsModal
          isOpen={showTCModal}
          onClose={() => setShowTCModal(false)}
          onConfirm={() => {
            router.push("/booking-payment");
          }}
        />

        {/* <Footer /> */}
      </div>
    </>
  );
}
