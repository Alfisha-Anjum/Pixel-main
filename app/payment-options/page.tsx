"use client";

import { useState } from "react";
import { CreditCard, Smartphone, Wallet, Eye, EyeOff, Check, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PaymentOption {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet';
  provider?: string;
  lastFour?: string;
  expiry?: string;
  upiId?: string;
  bankName?: string;
  isSelected: boolean;
}

const PaymentOptionsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentOption[]>([
    {
      id: "1",
      type: "card",
      provider: "Visa",
      lastFour: "1234",
      expiry: "12/25",
      isSelected: true
    },
    {
      id: "2",
      type: "upi",
      upiId: "john.doe@oksbi",
      isSelected: false
    },
    {
      id: "3",
      type: "wallet",
      provider: "PhonePe",
      isSelected: false
    }
  ]);

  const [newCardDetails, setNewCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });

  const [newUpiId, setNewUpiId] = useState('');
  const [showCvv, setShowCvv] = useState(false);

  const handleSelectPayment = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isSelected: method.id === id
    })));
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCard: PaymentOption = {
      id: Date.now().toString(),
      type: 'card',
      provider: "Visa", // Simplified for demo
      lastFour: newCardDetails.cardNumber.slice(-4),
      expiry: newCardDetails.expiryDate,
      isSelected: false
    };
    
    setPaymentMethods([...paymentMethods, newCard]);
    setNewCardDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolderName: ''
    });
  };

  const handleAddUpi = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUpi: PaymentOption = {
      id: Date.now().toString(),
      type: 'upi',
      upiId: newUpiId,
      isSelected: false
    };
    
    setPaymentMethods([...paymentMethods, newUpi]);
    setNewUpiId('');
  };

  const handleRemovePayment = (id: string) => {
    if (paymentMethods.length <= 1) return; // Prevent removing the last payment method
    
    const updatedMethods = paymentMethods.filter(method => method.id !== id);
    setPaymentMethods(updatedMethods);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
            <p className="text-gray-600">Manage your saved payment methods</p>
          </div>

          <div className="grid gap-8">
            {/* Saved Payment Methods */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Payment Methods</h2>
              
              <div className="grid gap-4">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id} 
                    className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${
                      method.isSelected ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleSelectPayment(method.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            method.isSelected 
                              ? 'border-orange-500 bg-orange-500' 
                              : 'border-gray-300'
                          }`}
                        >
                          {method.isSelected && <Check className="w-4 h-4 text-white" />}
                        </button>
                        
                        <div className="flex items-center gap-3">
                          {method.type === 'card' && <CreditCard className="w-8 h-8 text-gray-700" />}
                          {method.type === 'upi' && <Smartphone className="w-8 h-8 text-gray-700" />}
                          {method.type === 'wallet' && <Wallet className="w-8 h-8 text-gray-700" />}
                          
                          <div>
                            {method.type === 'card' && (
                              <>
                                <div className="font-medium text-gray-900">
                                  {method.provider} ending in {method.lastFour}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Expires {method.expiry}
                                </div>
                              </>
                            )}
                            
                            {method.type === 'upi' && (
                              <>
                                <div className="font-medium text-gray-900">UPI ID</div>
                                <div className="text-sm text-gray-500">{method.upiId}</div>
                              </>
                            )}
                            
                            {method.type === 'wallet' && (
                              <>
                                <div className="font-medium text-gray-900">{method.provider} Wallet</div>
                                <div className="text-sm text-gray-500">Digital wallet payment</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {paymentMethods.length > 1 && (
                        <button
                          onClick={() => handleRemovePayment(method.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Card</h2>
              
              <form onSubmit={handleAddCard}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      value={newCardDetails.cardNumber}
                      onChange={(e) => setNewCardDetails({...newCardDetails, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      maxLength={19}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={newCardDetails.expiryDate}
                      onChange={(e) => setNewCardDetails({...newCardDetails, expiryDate: e.target.value})}
                      placeholder="MM/YY"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      maxLength={5}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <div className="relative">
                      <input
                        type={showCvv ? "text" : "password"}
                        value={newCardDetails.cvv}
                        onChange={(e) => setNewCardDetails({...newCardDetails, cvv: e.target.value})}
                        placeholder="123"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
                        maxLength={4}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowCvv(!showCvv)}
                      >
                        {showCvv ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      value={newCardDetails.cardHolderName}
                      onChange={(e) => setNewCardDetails({...newCardDetails, cardHolderName: e.target.value})}
                      placeholder="Enter cardholder name"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    // Show OTP popup
                    document.getElementById('otp-popup')?.classList.remove('hidden');
                  }}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                >
                  Pay Now
                </button>
                
                {/* OTP Verification Popup */}
                <div 
                  id="otp-popup"
                  className="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                >
                  <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-orange-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">OTP Verification</h2>
                      <p className="text-gray-600">Enter the 4-digit code sent to your mobile</p>
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
                        onClick={() => document.getElementById('otp-popup')?.classList.add('hidden')}
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                      >
                        Verify
                      </button>
                      
                      <button
                        onClick={() => document.getElementById('otp-popup')?.classList.add('hidden')}
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
              </form>
            </div>

            {/* Add New UPI */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New UPI ID</h2>
              
              <form onSubmit={handleAddUpi}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                  <input
                    type="text"
                    value={newUpiId}
                    onChange={(e) => setNewUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                >
                  Save UPI ID
                </button>
              </form>
            </div>

            {/* Security Tips */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-semibold text-lg text-blue-800 mb-3">Payment Security Tips</h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1">🔒</span>
                  <span>Never share your CVV or OTP with anyone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">✅</span>
                  <span>We use 256-bit encryption for all transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">🛡️</span>
                  <span>Your payment details are securely stored</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentOptionsPage;