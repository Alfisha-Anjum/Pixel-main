"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsPage = () => {
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
              Terms of Use
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Welcome to TAS PRO. These terms and conditions outline the rules and regulations for the use of TAS PRO's website and services.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using our services, you accept and agree to be bound by the terms and provisions of this agreement.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Service Description</h2>
              <p className="text-gray-700 mb-6">
                TAS PRO provides home service booking platform connecting customers with verified service professionals for various household needs.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">User Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Provide accurate information during registration</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use services for lawful purposes only</li>
                <li>Respect service professionals and their work</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Payment Terms</h2>
              <p className="text-gray-700 mb-6">
                All payments must be made through our secure payment gateway. Prices are subject to change without prior notice.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                TAS PRO shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.
              </p>
              
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mt-8">
                <p className="text-orange-800 text-sm">
                  Last Updated: February 2026<br/>
                  For questions regarding these terms, please contact us at info@taspro.in
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

export default TermsPage;