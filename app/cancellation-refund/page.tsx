"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CancellationPage = () => {
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
              Cancellation & Refund Policy
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Our cancellation and refund policy outlines the terms under which you can cancel services and receive refunds.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Cancellation Policy</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Free cancellation up to 2 hours before scheduled service</li>
                <li>50% refund for cancellations within 2 hours of service</li>
                <li>No refund for cancellations less than 1 hour before service</li>
                <li>Cancellations must be made through our app or website</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Refund Process</h2>
              <p className="text-gray-700 mb-6">
                Refunds are processed within 5-7 business days to the original payment method. You will receive a confirmation email once the refund is initiated.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Service Quality Issues</h2>
              <p className="text-gray-700 mb-6">
                If you're not satisfied with the service quality, please contact our customer support within 24 hours for resolution or refund consideration.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Special Circumstances</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Emergency cancellations due to unforeseen circumstances</li>
                <li>Service provider no-show situations</li>
                <li>Weather-related service disruptions</li>
                <li>Technical issues preventing service delivery</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Non-Refundable Items</h2>
              <p className="text-gray-700 mb-6">
                Certain services and materials may have different cancellation terms. These will be clearly communicated at the time of booking.
              </p>
              
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mt-8">
                <p className="text-orange-800 text-sm">
                  For immediate assistance with cancellations or refunds,<br/>
                  contact our support team at 7447-0000-45
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

export default CancellationPage;