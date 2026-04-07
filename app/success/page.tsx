"use client";

import { CheckCircle, Home, ShoppingCart, Star, Share2, Gift } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Payment Processing Animation */}
          <div className="text-center mb-12 hidden" id="payment-processing">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Processing Payment...</h1>
            <p className="text-xl text-gray-600 mb-6">Please do not close this window</p>
          </div>
          
          {/* Success Message */}
          <div className="text-center mb-12" id="success-message">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
            <p className="text-xl text-gray-600 mb-6">Thank you for your payment. Your transaction has been processed successfully.</p>
            
            <div className="inline-flex items-center gap-4 bg-orange-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-orange-600">₹4,748</div>
              <div className="text-gray-600">paid successfully</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Transaction Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Transaction Details</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Order ID</h3>
                    <p className="text-gray-600">ORD-2023-001234</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Transaction ID</h3>
                    <p className="text-gray-600">TXN-2023-987654321</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
                    <p className="text-gray-600">Credit Card (**** **** **** 1234)</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Date & Time</h3>
                    <p className="text-gray-600">15 Nov 2023, 10:30 AM</p>
                  </div>
                </div>
              </div>

              {/* Services Purchased */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Services Purchased</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900">AC Installation Service</h3>
                      <p className="text-sm text-gray-500">Qty: 1</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹2,499</div>
                      <div className="text-sm text-gray-500">2-3 hours</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900">Deep Cleaning Service</h3>
                      <p className="text-sm text-gray-500">Qty: 1</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹1,999</div>
                      <div className="text-sm text-gray-500">4-6 hours</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <div className="font-semibold">Total Paid</div>
                    <div className="font-bold text-lg text-orange-600">₹4,748</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Continue Shopping */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Continue Shopping</h3>
                
                <div className="space-y-3">
                  <a 
                    href="/services" 
                    className="flex items-center gap-3 w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-300"
                  >
                    <ShoppingCart className="w-5 h-5 ml-1" />
                    Browse Services
                  </a>
                  
                  <a 
                    href="/" 
                    className="flex items-center gap-3 w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                  >
                    <Home className="w-5 h-5 ml-1" />
                    Back to Home
                  </a>
                </div>
              </div>

              {/* Rate Your Experience */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Rate Your Experience</h3>
                
                <div className="text-center mb-4">
                  <div className="flex justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600">How was your service experience?</p>
                </div>
                
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-orange-50 hover:border-orange-300"
                    >
                      {rating} Star
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Offers */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-orange-600" />
                  Special Offers
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="font-medium text-gray-900">Refer & Earn</div>
                    <p className="text-sm text-gray-600">Get ₹200 off for every referral</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <div className="font-medium text-gray-900">First Service Discount</div>
                    <p className="text-sm text-gray-600">Get 10% off on next service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Share Feedback */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Share Your Feedback</h3>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Write your feedback here..." 
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessPage;