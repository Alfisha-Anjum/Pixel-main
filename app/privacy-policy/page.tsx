"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                TAS PRO is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Information We Collect</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Personal identification information (name, email, phone number)</li>
                <li>Service usage data and preferences</li>
                <li>Device information and IP addresses</li>
                <li>Payment information for transaction processing</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">How We Use Your Information</h2>
              <p className="text-gray-700 mb-6">
                We use your information to provide and improve our services, process bookings, communicate with you, and personalize your experience.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Data Protection</h2>
              <p className="text-gray-700 mb-6">
                We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Third-Party Services</h2>
              <p className="text-gray-700 mb-6">
                We may share information with trusted third-party service providers who assist us in operating our platform and delivering services to you.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Your Rights</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
              
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mt-8">
                <p className="text-orange-800 text-sm">
                  This policy is effective as of February 2026<br/>
                  We reserve the right to update this policy at any time
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPage;