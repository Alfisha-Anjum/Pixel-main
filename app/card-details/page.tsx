// "use client";

// import { useState } from "react";
// import { CreditCard, Eye, EyeOff, Check } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// interface CardDetails {
//   id: string;
//   type: string;
//   provider: string;
//   lastFour: string;
//   expiry: string;
//   cardHolderName: string;
//   isDefault: boolean;
// }

// const CardDetailsPage = () => {
//   const [cards, setCards] = useState<CardDetails[]>([
//     {
//       id: "1",
//       type: "credit",
//       provider: "Visa",
//       lastFour: "1234",
//       expiry: "12/25",
//       cardHolderName: "John Doe",
//       isDefault: true
//     },
//     {
//       id: "2",
//       type: "debit",
//       provider: "Mastercard",
//       lastFour: "5678",
//       expiry: "08/26",
//       cardHolderName: "John Doe",
//       isDefault: false
//     }
//   ]);

//   const [newCard, setNewCard] = useState({
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     cardHolderName: '',
//     isDefault: false
//   });

//   const [showCvv, setShowCvv] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!newCard.cardNumber || newCard.cardNumber.replace(/\s/g, '').length !== 16) {
//       newErrors.cardNumber = 'Please enter a valid 16-digit card number';
//     }

//     if (!newCard.expiryDate || !/^\d{2}\/\d{2}$/.test(newCard.expiryDate)) {
//       newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
//     }

//     if (!newCard.cvv || ![3, 4].includes(newCard.cvv.length)) {
//       newErrors.cvv = 'Please enter a valid CVV (3-4 digits)';
//     }

//     if (!newCard.cardHolderName.trim()) {
//       newErrors.cardHolderName = 'Card holder name is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     if (name === 'cardNumber') {
//       // Format card number with spaces
//       const formattedValue = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
//       setNewCard({ ...newCard, [name]: formattedValue.substring(0, 19) });
//     } else if (name === 'expiryDate') {
//       // Format expiry date as MM/YY
//       const formattedValue = value
//         .replace(/\D/g, '')
//         .replace(/(\d{2})(\d)/, '$1/$2')
//         .substring(0, 5);
//       setNewCard({ ...newCard, [name]: formattedValue });
//     } else if (name === 'cvv') {
//       // Limit CVV to 4 digits
//       setNewCard({ ...newCard, [name]: value.replace(/\D/g, '').substring(0, 4) });
//     } else {
//       setNewCard({ ...newCard, [name]: value });
//     }
//   };

//   const handleAddCard = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const lastFour = newCard.cardNumber.replace(/\s/g, '').slice(-4);
//     const newCardObj: CardDetails = {
//       id: Date.now().toString(),
//       type: 'credit', // Could be determined by first digit of card number
//       provider: getCardProvider(newCard.cardNumber), // Simplified
//       lastFour,
//       expiry: newCard.expiryDate,
//       cardHolderName: newCard.cardHolderName,
//       isDefault: newCard.isDefault || cards.length === 0
//     };

//     setCards([...cards, newCardObj]);

//     // Reset form
//     setNewCard({
//       cardNumber: '',
//       expiryDate: '',
//       cvv: '',
//       cardHolderName: '',
//       isDefault: false
//     });

//     // Clear errors
//     setErrors({});
//   };

//   const getCardProvider = (cardNumber: string): string => {
//     const num = cardNumber.replace(/\s/g, '');
//     if (num.startsWith('4')) return 'Visa';
//     if (num.startsWith('5')) return 'Mastercard';
//     if (num.startsWith('3')) return 'American Express';
//     return 'Card';
//   };

//   const handleSetDefault = (id: string) => {
//     setCards(cards.map(card => ({
//       ...card,
//       isDefault: card.id === id
//     })));
//   };

//   const handleRemoveCard = (id: string) => {
//     if (cards.length <= 1) return; // Prevent removing the last card

//     const updatedCards = cards.filter(card => card.id !== id);
//     setCards(updatedCards);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="py-8">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900">My Cards</h1>
//             <p className="text-gray-600">Manage your saved credit and debit cards</p>
//           </div>

//           <div className="grid gap-8">
//             {/* Saved Cards */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Cards</h2>

//               <div className="grid gap-4">
//                 {cards.map((card) => (
//                   <div
//                     key={card.id}
//                     className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
//                   >
//                     <div className="flex justify-between items-start">
//                       <div className="flex items-center gap-4">
//                         <div className="bg-gray-100 p-3 rounded-xl">
//                           <CreditCard className="w-6 h-6 text-gray-700" />
//                         </div>

//                         <div>
//                           <div className="flex items-center gap-2">
//                             <div className="font-medium text-gray-900">
//                               {card.provider} ending in {card.lastFour}
//                             </div>
//                             {card.isDefault && (
//                               <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
//                                 Default
//                               </span>
//                             )}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             Expires {card.expiry} • {card.cardHolderName}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex flex-col gap-2">
//                         {!card.isDefault && (
//                           <button
//                             onClick={() => handleSetDefault(card.id)}
//                             className="text-sm text-orange-600 hover:text-orange-700 font-medium"
//                           >
//                             Make Default
//                           </button>
//                         )}

//                         <button
//                           onClick={() => handleRemoveCard(card.id)}
//                           className="text-sm text-red-600 hover:text-red-700 font-medium"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Add New Card */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Card</h2>

//               <form onSubmit={handleAddCard}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
//                     <input
//                       type="text"
//                       name="cardNumber"
//                       value={newCard.cardNumber}
//                       onChange={handleInputChange}
//                       placeholder="1234 5678 9012 3456"
//                       className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
//                         errors.cardNumber ? 'border-red-500' : ''
//                       }`}
//                       maxLength={19}
//                       required
//                     />
//                     {errors.cardNumber && (
//                       <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
//                     <input
//                       type="text"
//                       name="expiryDate"
//                       value={newCard.expiryDate}
//                       onChange={handleInputChange}
//                       placeholder="MM/YY"
//                       className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
//                         errors.expiryDate ? 'border-red-500' : ''
//                       }`}
//                       maxLength={5}
//                       required
//                     />
//                     {errors.expiryDate && (
//                       <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
//                     <div className="relative">
//                       <input
//                         type={showCvv ? "text" : "password"}
//                         name="cvv"
//                         value={newCard.cvv}
//                         onChange={handleInputChange}
//                         placeholder="123"
//                         className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10 ${
//                           errors.cvv ? 'border-red-500' : ''
//                         }`}
//                         maxLength={4}
//                         required
//                       />
//                       <button
//                         type="button"
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                         onClick={() => setShowCvv(!showCvv)}
//                       >
//                         {showCvv ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                       </button>
//                     </div>
//                     {errors.cvv && (
//                       <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
//                     )}
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
//                     <input
//                       type="text"
//                       name="cardHolderName"
//                       value={newCard.cardHolderName}
//                       onChange={handleInputChange}
//                       placeholder="Enter cardholder name"
//                       className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
//                         errors.cardHolderName ? 'border-red-500' : ''
//                       }`}
//                       required
//                     />
//                     {errors.cardHolderName && (
//                       <p className="mt-1 text-sm text-red-600">{errors.cardHolderName}</p>
//                     )}
//                   </div>

//                   <div className="md:col-span-2 flex items-center">
//                     <input
//                       type="checkbox"
//                       name="isDefault"
//                       checked={newCard.isDefault}
//                       onChange={(e) => setNewCard({...newCard, isDefault: e.target.checked})}
//                       className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
//                     />
//                     <label className="ml-2 block text-sm text-gray-700">
//                       Set as default payment method
//                     </label>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="mt-6 w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
//                 >
//                   Add Card
//                 </button>
//               </form>
//             </div>

//             {/* Security Information */}
//             <div className="bg-green-50 rounded-2xl p-6">
//               <h3 className="font-semibold text-lg text-green-800 mb-3">Card Security Information</h3>
//               <ul className="space-y-2 text-green-700">
//                 <li className="flex items-start gap-2">
//                   <span className="mt-1">🔒</span>
//                   <span>Your card details are encrypted and securely stored</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="mt-1">🛡️</span>
//                   <span>We use PCI DSS compliant systems to protect your data</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="mt-1">✅</span>
//                   <span>All transactions are monitored for fraudulent activity</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default CardDetailsPage;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CardDetailsPage() {
  const router = useRouter();

  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const handleSubmit = () => {
    if (
      cardDetails.name &&
      cardDetails.number &&
      cardDetails.expiry &&
      cardDetails.cvv
    ) {
      alert("Proceeding to OTP...");
      router.push("/payment"); // or OTP page
    } else {
      alert("Fill all details");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Enter Card Details</h2>

        <input
          type="text"
          placeholder="Cardholder Name"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setCardDetails({ ...cardDetails, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Card Number"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setCardDetails({ ...cardDetails, number: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Expiry (MM/YY)"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setCardDetails({ ...cardDetails, expiry: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="CVV"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setCardDetails({ ...cardDetails, cvv: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white py-2 rounded"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}