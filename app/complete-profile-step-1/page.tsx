"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Camera, User, Mail, Check, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const CompleteProfileStep1 = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteProfileStep1Content />
    </Suspense>
  );
};

function CompleteProfileStep1Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const phone = searchParams?.get("phone") || "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate image upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result as string);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const validateFields = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerify = () => {
    if (validateFields()) {
      setIsVerified(true);
    }
  };



const handleContinue = async () => {
  if (!validateFields()) return;

  try {
    const token = localStorage.getItem("token"); // store token after login
    const customerId = localStorage.getItem("customer_id");

    const formData = new FormData();

    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("mobile", phone);
    formData.append("customer_id", customerId || "9"); // fallback if needed
    formData.append("gender", "Male"); // static or dynamic
    formData.append("latitude", "21.2514");
    formData.append("longitude", "81.6296");
    formData.append("address", "Raipur, Chhattisgarh");

    
console.log("TOKEN:", token);
console.log("CUSTOMER ID:", customerId);

    // image file handling
    if (profileImage && profileImage.startsWith("data:")) {
      const res = await fetch(profileImage);
      const blob = await res.blob();
      formData.append("profile", blob, "profile.jpg");
    }

    if (!token) {
      alert("User not authenticated. Please login again.");
      router.push("/login");
      return;
    }

    const response = await axios.post(
      "https://taskpro.itmingo.com/api/customers/update-profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        
        },
      }
    );

    if (response.data?.status) {
      // Save user locally (same as your existing logic)
      const userData = {
        phone,
        firstName,
        lastName,
        email,
        profileImage,
        profileCompleted: true,
      };

      login(userData);

      // Navigate आगे (same flow)
      router.push(`/email-verification?phone=${phone}&email=${email}`);
    } else {
      alert(response.data?.message || "Profile update failed");
    }

  } catch (error: any) {
    console.error(error);
    alert("Something went wrong while updating profile");
  }
};
  // Focus first name field on load
  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="max-w-4xl w-full flex rounded-2xl overflow-hidden shadow-xl">
          {/* Left Side - White */}
          <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete your Profile!</h1>
              <p className="text-gray-600">Fill in your details to continue</p>
            </div>
            
            <div className="space-y-6">
              {/* Profile Photo Upload */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-dashed flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer">
                    <Camera className="w-4 h-4 text-white" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {isUploading ? "Uploading..." : "Click to upload profile photo"}
                </p>
              </div>
              
              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      ref={firstNameRef}
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      className={`w-full pl-10 pr-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      ref={lastNameRef}
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      ref={emailRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleVerify}
                  disabled={isVerified}
                  className={`flex-1 py-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    isVerified 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                  }`}
                >
                  {isVerified ? (
                    <>
                      <Check className="w-5 h-5" /> Verified!
                    </>
                  ) : (
                    "Verify"
                  )}
                </button>
                
                <button
                  onClick={handleContinue}
                  disabled={!isVerified}
                  className={`flex-1 py-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    isVerified
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
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
      </main>
    </div>
  );
};

export default CompleteProfileStep1;