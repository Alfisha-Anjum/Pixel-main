"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Toggle from "./Toggle";
import { SelectAddressModal } from "../booking-flow/SelectAddressModal";
import AddNewAddressModal from "../AddNewAddressModal";
import axios from "axios";

type ItemProps = {
  icon: string;
  text: string;
  onClick: () => void;
};

type Props = {
  setActiveView: (view: string) => void;
};

export default function SettingsList({ setActiveView }: Props) {
  const [dark, setDark] = useState(false);
  const [notify, setNotify] = useState(true);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [addresses, setAddresses] = useState<any[]>([]);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoadingAddress(true);

      const res = await axios.get(
        "https://taskpro.itmingo.com/api/customers/customer-addresses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      setAddresses(res.data?.data || []);
    } catch (error: any) {
      console.log("Address API Error:", error.response?.data || error);
    } finally {
      setLoadingAddress(false);
    }
  };

  const addCustomerAddress = async (formData: any) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const cleanPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").replace(/^91/, "").replace(/^0/, "");
    return `+91 ${digits}`;
  };

  const payload = {
    full_name: formData.fullName || formData.name || "",
    contact_number: cleanPhone(formData.contactNumber || formData.phone || ""),
    alt_contact_number: cleanPhone(
      formData.alternateNumber || formData.altPhone || formData.phone || ""
    ),
    postal_code: formData.postalCode || formData.pincode || "",
    latitude: formData.latitude || 21.2514,
    longitude: formData.longitude || 81.6296,
    country_id: 1,
    state_id: 1,
    city_id: 1,
    state_name: formData.state_name || formData.state || "Chhattisgarh",
    city_name: formData.city_name || formData.city || "Raipur",
    house_number: formData.houseNo || "",
    street: formData.street || formData.location || formData.address || "",
    type: "Home",
    is_active: 1,
  };

  await axios.post(
    "https://taskpro.itmingo.com/api/customers/customer-addresses",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

  const handleSavedAddressClick = async () => {
    setIsAddressModalOpen(true);
    await fetchAddresses();
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDark(true);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="w-full max-w-[390px] mx-auto lg:ml-12 px-4 lg:px-0">
      <h2 className="text-[20px] font-semibold text-[#1B1B1B] mb-4">
        Account Settings
      </h2>

      <div>
        <Item
          icon="/icons/user.png"
          text="Edit Profile"
          onClick={() => setActiveView("editProfile")}
        />

        <div className="border-t border-[#E1E4E8]" />

        <Item
          icon="/icons/save.png"
          text="Saved Address"
          onClick={handleSavedAddressClick}
        />

        <div className="border-t border-[#E1E4E8]" />

        <Item
          icon="/icons/wallet.png"
          text="My Wallet"
          onClick={() => setActiveView("wallet")}
        />

        <div className="border-t border-[#E1E4E8]" />

        <Item
          icon="/icons/wallet.png"
          text="Saved Payment Methods"
          onClick={() => setActiveView("payment")}
        />

        <div className="border-t border-[#E1E4E8]" />

        <Item
          icon="/icons/language.png"
          text="Change Language"
          onClick={() => setActiveView("language")}
        />

        <div className="border-t border-[#E1E4E8]" />

        <Toggle
          icon="/icons/setting.png"
          text="Notification Setting"
          state={notify}
          setState={setNotify}
        />

        <div className="border-t border-[#E1E4E8]" />

        <Toggle
          icon="/icons/toggle.png"
          text="Dark Mode"
          state={dark}
          setState={setDark}
        />
      </div>

      <h3 className="text-[20px] font-semibold text-[#1B1B1B] mt-8 mb-4">
        My Activity
      </h3>

      <div>
        <Item
          icon="/icons/rating.png"
          text="My Rating & Reviews"
          onClick={() => setActiveView("reviews")}
        />

        <div className="border-t border-[#E1E4E8]" />

        <Item
          icon="/icons/coupon.png"
          text="My Coupon"
          onClick={() => setActiveView("coupon")}
        />

        <div className="border-t border-[#E1E4E8]" />

        <Item
          icon="/icons/refer.png"
          text="Refer & Earn"
          onClick={() => setActiveView("refer")}
        />
      </div>

      <SelectAddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        addresses={addresses}
        onAddNew={() => {
          setIsAddressModalOpen(false);
          setIsAddModalOpen(true);
        }}
        onContinue={() => {
          setIsAddressModalOpen(false);
        }}
      />

      <AddNewAddressModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={async (newAddress) => {
          try {
            await addCustomerAddress(newAddress);
            await fetchAddresses();

            setIsAddModalOpen(false);
            setIsAddressModalOpen(true);
          } catch (error: any) {
            console.log("ADD ADDRESS ERROR:", error.response?.data || error);
          }
        }}
      />
    </div>
  );
}

function Item({ icon, text, onClick }: ItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between py-3 cursor-pointer group"
    >
      <div className="flex items-center gap-3">
        <Image src={icon} alt={text} width={20} height={20} />
        <span className="text-[16px] text-[#1B1B1B] font-medium group-hover:text-orange-500 transition">
          {text}
        </span>
      </div>
    </div>
  );
}
