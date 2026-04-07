"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FaqPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I book a service?",
      answer: "You can book a service through our website or mobile app. Simply select the service you need, choose your preferred date and time, and complete the booking process with secure payment."
    },
    {
      question: "What areas do you serve?",
      answer: "We currently serve Raipur and surrounding areas in Chhattisgarh. We're expanding to more cities regularly. Check our service area map on the website for the most up-to-date coverage information."
    },
    {
      question: "How are your service professionals verified?",
      answer: "All our service professionals undergo rigorous background checks, skill assessments, and training programs. We verify their identity, experience, and certifications before allowing them to join our platform."
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel your booking free of charge up to 2 hours before the scheduled service. Cancellations within 2 hours incur a 50% fee, and cancellations less than 1 hour before service are non-refundable."
    },
    {
      question: "How do I make payments?",
      answer: "We accept multiple payment methods including credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our encrypted payment gateway."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "Your satisfaction is our priority. If you're not happy with the service quality, please contact our customer support within 24 hours. We offer re-service or refund based on the situation."
    },
    {
      question: "Do you provide warranty on services?",
      answer: "Yes, we provide service warranties ranging from 7 days to 6 months depending on the type of service. Check the specific warranty period for each service category on our website."
    },
    {
      question: "How do I become a service professional?",
      answer: "You can apply to become a service professional through our partner portal. We require relevant experience, proper tools, and completion of our training program. Contact our recruitment team for more details."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services, booking process, and policies.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 pl-2 border-l-2 border-orange-200">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-orange-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
                Contact Support
              </button>
              <button className="px-6 py-3 border border-orange-500 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FaqPage;