"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import GradientButton2 from "@/components/ui/GradientButton2";

export default function EditProfile({
  setActiveView,
}: {
  setActiveView: (view: string) => void;
}) {
  const [gender, setGender] = useState("male");
  const [preview, setPreview] = useState("/img/profileimg.png");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    setActiveView("default");
  };

  return (
    <div className="w-full max-w-[390px] md:ml-12 mx-auto md:mx-0 flex flex-col items-center md:items-start">
      {/* ===== Form Section ===== */}
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="w-full flex justify-between items-center mb-6 md:hidden">
          {/* Back */}
          <button
            onClick={() => setActiveView("default")}
            className="text-black font-medium flex items-center gap-2 hover:text-orange-500 transition"
          >
            <ArrowLeft size={20} />
            Edit Profile
          </button>

          {/* Save (text only) */}
          <button
            onClick={() => setActiveView("default")}
            className="font-semibold bg-gradient-to-r from-[#FEC12D] to-[#FF552C] bg-clip-text text-transparent"
          >
            Save
          </button>
        </div>

        {/* ===== Profile Image Section ===== */}
        <div className="flex justify-center md:justify-start mb-10">
          <div className="relative">
            <Image
              src={preview}
              alt="profile"
              width={150}
              height={150}
              className="rounded-full object-cover"
            />

            <label htmlFor="profileUpload">
              <div className="absolute bottom-1 right-1 bg-white w-7 h-7 flex items-center justify-center rounded-full cursor-pointer shadow">
                <Image
                  src="/icons/edit.png"
                  alt="edit"
                  width={16}
                  height={16}
                />
              </div>
            </label>

            <input
              type="file"
              name="profileImage"
              id="profileUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </div>
        </div>
        <div>
          <label className="text-[16px] font-semibold text-black">
            First Name
          </label>
          <input
            name="firstName"
            defaultValue="Andrew"
            className="w-full border-b border-orange-400 bg-white outline-none py-2 text-black"
          />
        </div>

        <div>
          <label className="text-[16px] font-semibold text-black">
            Last Name
          </label>
          <input
            name="lastName"
            defaultValue="Ainsley"
            className="w-full border-b border-orange-400 bg-white outline-none py-2 text-black"
          />
        </div>

        {/* Gender */}
        <div>
          <p className="text-[16px] font-semibold mb-2 bg-white text-black">
            Select gender
          </p>
          <div className="flex flex-col gap-4">
            {["male", "female", "other"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-3 cursor-pointer group"
              >
                {/* Hidden radio */}
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={() => setGender(g)}
                  className="hidden"
                />

                {/* Outer gradient circle */}
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200
        ${
          gender === g
            ? "bg-gradient-to-r from-[#FEC12D] to-[#FF552C]"
            : "border-2 border-gray-400 group-hover:border-orange-400"
        }`}
                >
                  {/* White ring */}
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-200
          ${gender === g ? "opacity-100" : "opacity-0"}`}
                  />
                </div>

                {/* Label */}
                <span className="text-black">
                  {g === "male"
                    ? "I am male"
                    : g === "female"
                      ? "I am female"
                      : "Rather not to say"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-[16px] font-semibold text-black">
            Phone Number
          </label>
          <input
            name="phone"
            defaultValue="+1-300-555-0399"
            className="w-full text-[16px] border-b border-orange-400 bg-white outline-none py-2 text-black mb-4"
          />
        </div>

        {/* Save Button */}
        <div className="hidden md:block">
          <GradientButton2 text="Save" width="w-full" type="submit" />
        </div>
      </form>
    </div>
  );
}
