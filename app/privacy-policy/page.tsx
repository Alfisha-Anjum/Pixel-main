"use client";

import { useEffect } from "react";

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight">
            Privacy Policy
          </h1>

          {/* Content */}
          <div className="max-w-4xl">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 mb-6 leading-7">
              TAS PRO is committed to protecting your privacy and personal
              information. This Privacy Policy explains how we collect, use, and
              safeguard your data.
            </p>

            {/* Section */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Information We Collect
              </h2>

              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
                <li>
                  Personal identification information (name, email, phone
                  number)
                </li>
                <li>Service usage data and preferences</li>
                <li>Device information and IP addresses</li>
                <li>Payment information for transaction processing</li>
              </ul>
            </section>

            {/* Section */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                How We Use Your Information
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7">
                We use your information to provide and improve our services,
                process bookings, communicate with you, and personalize your
                experience.
              </p>
            </section>

            {/* Section */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Data Protection
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7">
                We implement robust security measures to protect your personal
                information from unauthorized access, alteration, disclosure, or
                destruction.
              </p>
            </section>

            {/* Section */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Third-Party Services
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7">
                We may share information with trusted third-party service
                providers who assist us in operating our platform and delivering
                services to you.
              </p>
            </section>

            {/* Section */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your Rights
              </h2>

              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
