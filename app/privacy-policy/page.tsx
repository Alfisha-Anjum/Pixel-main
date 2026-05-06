"use client";

import { useEffect } from "react";

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <main className="flex-grow">
        <div className="p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-400 mb-6">
              TAS PRO is committed to protecting your privacy and personal
              information. This Privacy Policy explains how we collect, use, and
              safeguard your data.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
              Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-400 mb-6">
              <li>
                Personal identification information (name, email, phone number)
              </li>
              <li>Service usage data and preferences</li>
              <li>Device information and IP addresses</li>
              <li>Payment information for transaction processing</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 dark:text-gray-400 mb-6">
              We use your information to provide and improve our services,
              process bookings, communicate with you, and personalize your
              experience.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
              Data Protection
            </h2>
            <p className="text-gray-700 dark:text-gray-400 mb-6">
              We implement robust security measures to protect your personal
              information from unauthorized access, alteration, disclosure, or
              destruction.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
              Third-Party Services
            </h2>
            <p className="text-gray-700 dark:text-gray-400 mb-6">
              We may share information with trusted third-party service
              providers who assist us in operating our platform and delivering
              services to you.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
              Your Rights
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-400 mb-6">
              <li>Access and update your personal information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
