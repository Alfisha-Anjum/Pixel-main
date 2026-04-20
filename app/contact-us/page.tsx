// "use client";

// import { useEffect } from "react";
// import { Phone, Mail, MapPin, Clock } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const ContactPage = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <main className="flex-grow">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//             <div className="grid grid-cols-1 lg:grid-cols-2">
//               {/* Contact Information */}
//               <div className="p-8 md:p-12">
//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
//                   Contact Us
//                 </h1>

//                 <div className="space-y-8">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
//                       <Phone className="w-6 h-6 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         Phone
//                       </h3>
//                       <p className="text-gray-600">7447-0000-45</p>
//                       <p className="text-sm text-gray-500 mt-1">
//                         Mon-Sat: 8:00 AM - 8:00 PM
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
//                       <Mail className="w-6 h-6 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         Email
//                       </h3>
//                       <p className="text-gray-600">info@taspro.in</p>
//                       <p className="text-sm text-gray-500 mt-1">
//                         We'll respond within 24 hours
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
//                       <MapPin className="w-6 h-6 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         Office Address
//                       </h3>
//                       <p className="text-gray-600">
//                         Office No. 201, Atlantis Corporate Park
//                         <br />
//                         Ring Road No.1, Telibandha
//                         <br />
//                         Raipur, Chhattisgarh 492001
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
//                       <Clock className="w-6 h-6 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         Business Hours
//                       </h3>
//                       <p className="text-gray-600">
//                         Monday - Saturday: 8:00 AM - 8:00 PM
//                         <br />
//                         Sunday: 9:00 AM - 6:00 PM
//                         <br />
//                         Holidays: As per government calendar
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Form */}
//               <div className="bg-gray-50 p-8 md:p-12">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                   Send us a Message
//                 </h2>

//                 <form className="space-y-6">
//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                       placeholder="Enter your full name"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                       placeholder="Enter your email"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                       placeholder="Enter your phone number"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="subject"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Subject
//                     </label>
//                     <select
//                       id="subject"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                     >
//                       <option>Select a subject</option>
//                       <option>General Inquiry</option>
//                       <option>Service Complaint</option>
//                       <option>Billing Issue</option>
//                       <option>Feedback</option>
//                       <option>Partnership Opportunity</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="message"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Message
//                     </label>
//                     <textarea
//                       id="message"
//                       rows={5}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                       placeholder="Enter your message"
//                     ></textarea>
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
//                   >
//                     Send Message
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ContactPage;
export default function ContactPage() {
  return (
    <div className="bg-white py-10 px-6 md:px-16">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-12">
        <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
        <p className="text-gray-600 text-[14px]">
          We're here to assist you! If you have any questions, concerns, or need
          further assistance, please don't hesitate to reach out to us. Our
          dedicated support team is ready to help and provide the guidance you
          need. Whether you have inquiries about our services, suggestions for
          improvement, or require technical support, we're just a message away.
          Your satisfaction is our priority, and we are committed to ensuring a
          seamless experience for you on TASPRO Company. We appreciate your
          feedback and value the opportunity to assist you. Contact us today,
          and let us help make your TASPRO Company journey a success!"
        </p>
      </div>

      {/* CONTACT CARDS */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mb-16">
        {/* CHAT */}
        <div className="flex-1 bg-white p-6 flex gap-4 items-start">
          <div className="w-10 h-10 shadow-md items-center justify-center flex bg-[#FEECE7]">
            <img src="/message.png" alt="chat" className="w-6 h-6 shadow-md" />
          </div>

          <div>
            <p className="font-semibold text-[#0A0F0D] text-lg">Chat to us</p>
            <p className="text-gray-500 text-sm">
              Our friendly team is here to help.
            </p>
            <p className="text-[#0A0F0D] mt-1">help@tasprocompany.app</p>
          </div>
        </div>

        {/* PHONE */}
        <div className="flex-1 bg-white p-6 flex gap-4 items-start">
          <div className="w-10 h-10 shadow-md items-center justify-center flex bg-[#FEECE7]">
            <img src="/phone.png" alt="phone" className="w-6 h-6" />
          </div>
          <div>
            <p className="font-semibold text-[#0A0F0D] text-lg">Phone</p>
            <p className="text-gray-500 text-sm">Mon–Fri from 8am to 5pm</p>
            <p className="text-[#0A0F0D] mt-1">+1 (555) 000-0000</p>
          </div>
        </div>
      </div>

      {/* SOCIAL SECTION */}
      <div className="max-w-5xl mx-auto mb-10">
        <p className="text-xl font-semibold mb-2">Social Links</p>
        <p className="text-gray-500 mb-6">Follow us on social media</p>

        <div className="flex gap-6">
          <img
            src="/facebook.png"
            alt="facebook"
            className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition"
          />
          <img
            src="/twitter2.png"
            alt="twitter"
            className="w-8 h-8 cursor-pointer hover:scale-110 transition"
          />
          <img
            src="/linkedin.png"
            alt="linkedin"
            className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition"
          />
          <img
            src="/instagram.png"
            alt="instagram"
            className="w-8 h-8 rounded-full  cursor-pointer hover:scale-110 transition"
          />
          <img
            src="/threat.png"
            alt="threat"
            className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition"
          />
        </div>
      </div>
    </div>
  );
}
