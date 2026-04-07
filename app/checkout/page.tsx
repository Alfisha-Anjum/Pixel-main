"use client";

import { useState } from "react";
import { MapPin, CreditCard, Calendar, Clock, Shield, User, Phone, Mail, Home, Building2, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [addressType, setAddressType] = useState<'home' | 'office'>('home');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');

  // Mock cart data
  const cartItems = [
    {
      id: "1",
      title: "AC Installation Service",
      price: 2499,
      quantity: 1,
      estimatedTime: "2-3 hours"
    },
    {
      id: "2",
      title: "Deep Cleaning Service",
      price: 1999,
      quantity: 1,
      estimatedTime: "4-6 hours"
    }
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  const handleNext = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600">Complete your service booking</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activeStep >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <span className={`mt-2 text-sm ${activeStep >= 1 ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>
                Address
              </span>
            </div>
            
            <div className="flex-1 h-0.5 bg-gray-200 relative -top-5"></div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activeStep >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className={`mt-2 text-sm ${activeStep >= 2 ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>
                Payment
              </span>
            </div>
            
            <div className="flex-1 h-0.5 bg-gray-200 relative -top-5"></div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activeStep >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
              <span className={`mt-2 text-sm ${activeStep >= 3 ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>
                Review
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {activeStep === 1 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Delivery Address
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                        <input
                          type="tel"
                          placeholder="Enter your mobile number"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setAddressType('home')}
                            className={`flex-1 p-4 border rounded-lg flex items-center gap-3 ${
                              addressType === 'home' 
                                ? 'border-orange-500 bg-orange-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Home className="w-5 h-5 text-orange-500" />
                            <div className="text-left">
                              <div className="font-medium">Home</div>
                              <div className="text-sm text-gray-500">Delivery to home address</div>
                            </div>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setAddressType('office')}
                            className={`flex-1 p-4 border rounded-lg flex items-center gap-3 ${
                              addressType === 'office' 
                                ? 'border-orange-500 bg-orange-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Building2 className="w-5 h-5 text-orange-500" />
                            <div className="text-left">
                              <div className="font-medium">Office</div>
                              <div className="text-sm text-gray-500">Delivery to office address</div>
                            </div>
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                        <input
                          type="text"
                          placeholder="Enter street address"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          <input
                            type="text"
                            placeholder="City"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                          <input
                            type="text"
                            placeholder="State"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                          <input
                            type="text"
                            placeholder="PIN Code"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeStep === 2 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Method
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Payment Method</label>
                        <div className="space-y-3">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`w-full p-4 border rounded-lg text-left flex items-center gap-3 ${
                              paymentMethod === 'card' 
                                ? 'border-orange-500 bg-orange-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <CreditCard className="w-5 h-5 text-orange-500" />
                            <div>
                              <div className="font-medium">Credit/Debit Card</div>
                              <div className="text-sm text-gray-500">Pay securely with your card</div>
                            </div>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('upi')}
                            className={`w-full p-4 border rounded-lg text-left flex items-center gap-3 ${
                              paymentMethod === 'upi' 
                                ? 'border-orange-500 bg-orange-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="w-5 h-5 text-orange-500">📱</div>
                            <div>
                              <div className="font-medium">UPI</div>
                              <div className="text-sm text-gray-500">Pay with your UPI ID</div>
                            </div>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('cod')}
                            className={`w-full p-4 border rounded-lg text-left flex items-center gap-3 ${
                              paymentMethod === 'cod' 
                                ? 'border-orange-500 bg-orange-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="w-5 h-5 text-orange-500">💵</div>
                            <div>
                              <div className="font-medium">Cash on Delivery</div>
                              <div className="text-sm text-gray-500">Pay when service is delivered</div>
                            </div>
                          </button>
                        </div>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                              <input
                                type="password"
                                placeholder="123"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                            <input
                              type="text"
                              placeholder="Enter cardholder name"
                              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === 'upi' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Enter UPI ID</label>
                          <input
                            type="text"
                            placeholder="yourname@upi"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {activeStep === 3 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Review Order
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Delivery Address</h3>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="font-medium">John Doe</p>
                          <p className="text-gray-600">123 Main Street, Raipur, Chhattisgarh 492001</p>
                          <p className="text-gray-600">+91 98765 43210</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Payment Method</h3>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-gray-600">**** **** **** 1234</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
                        <div className="space-y-3">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between">
                              <div>
                                <div className="font-medium">{item.title}</div>
                                <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                              </div>
                              <div>₹{(item.price * item.quantity).toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrevious}
                    disabled={activeStep === 1}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      activeStep === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {activeStep < 3 ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        // Show OTP verification popup
                        document.getElementById('otp-verification-popup')?.classList.remove('hidden');
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                    >
                      Place Order
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                      </div>
                      <div>₹{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <span className="text-gray-600">Tax</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between mt-4 text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-orange-500 mt-0.5">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-orange-800">Safe and Secure</div>
                      <p className="text-sm text-orange-600">Your payment details are encrypted and secure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* OTP Verification Popup */}
      <div 
        id="otp-verification-popup"
        className="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      >
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">OTP Verification</h2>
              <p className="text-gray-600">Enter the 4-digit code sent to +91 6263716688</p>
            </div>
            <button 
              onClick={() => document.getElementById('otp-verification-popup')?.classList.add('hidden')}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-14 h-14 text-2xl text-center border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                // Hide OTP popup and redirect to success page
                document.getElementById('otp-verification-popup')?.classList.add('hidden');
                window.location.href = '/success';
              }}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
            >
              Verify
            </button>
            
            <button
              onClick={() => document.getElementById('otp-verification-popup')?.classList.add('hidden')}
              className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <button
              className="w-full py-3 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;