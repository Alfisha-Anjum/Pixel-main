"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Clock, Shield } from "lucide-react";
import OTPVerification from "@/components/OTPVerification";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
function OTPVerificationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const phone = searchParams?.get("phone") || "";
  const isSignUp = searchParams?.get("signup") === "true";

  const [isLoading, setIsLoading] = useState(false);

const handleVerify = async (otp: string) => {
  setIsLoading(true);

  try {
    const res = await axios.post(
      "https://taskpro.itmingo.com/api/customers/verify-otp",
      {
        country_id: 1, // or dynamic if needed
        mobile: phone,
        otp: Number(otp),
      },
    );

    if (res.data.status) {
      const token = res.data.token;
      const customer = res.data.data;

      // ✅ STORE TOKEN + CUSTOMER ID
      localStorage.setItem("token", token);
      localStorage.setItem("customer_id", customer.id);

      console.log("TOKEN SAVED:", token);
      console.log("CUSTOMER ID SAVED:", customer.id);

      // ✅ Create user object
      const userData = {
        phone,
        profileCompleted: false,
      };

      // ✅ Save in context
      login(userData);

      // ✅ Redirect to profile step
      router.push(`/complete-profile-step-1?phone=${phone}`);
    } else {
      alert(res.data.message || "OTP verification failed");
    }
  } catch (error) {
    console.error("OTP verification failed:", error);
    alert("Invalid OTP. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const handleResend = async () => {
    // Simulate resending OTP
    console.log(`Resending OTP to ${phone}`);
    // In a real app, you would call an API to resend OTP
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="max-w-4xl w-full flex rounded-2xl overflow-hidden shadow-xl">
          {/* Left Side - White */}
          <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
            <div className="mb-8">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-2">OTP Verification!</h1>
              <p className="text-gray-600">Enter the code sent to {phone}</p>
            </div>
            
            <div className="space-y-6">
              <OTPVerification 
                phoneNumber={phone} 
                onVerify={handleVerify} 
                onResend={handleResend}
                onBack={handleBack}
              />
            </div>
          </div>
          
          {/* Right Side - Orange BG with Image */}
          <div className="w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 flex flex-col items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Welcome to TASPRO Company</h2>
              <p className="text-orange-100 max-w-md">
                Join thousands of satisfied customers who trust us for their home service needs.
              </p>
            </div>
            <div className="relative z-10 mt-8">
              <img 
                src="/heroimage.jpg" 
                alt="Professional technician" 
                className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OTPVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPVerificationPageContent />
    </Suspense>
  );
}