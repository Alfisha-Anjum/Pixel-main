"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";

const FaqPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I book a service?",
      answer:
        "You can book a service through our website or mobile app. Simply select the service you need, choose your preferred date and time, and complete the booking process with secure payment.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We currently serve Raipur and surrounding areas in Chhattisgarh. We're expanding to more cities regularly. Check our service area map on the website for the most up-to-date coverage information.",
    },
    {
      question: "How are your service professionals verified?",
      answer:
        "All our service professionals undergo rigorous background checks, skill assessments, and training programs. We verify their identity, experience, and certifications before allowing them to join our platform.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "You can cancel your booking free of charge up to 2 hours before the scheduled service. Cancellations within 2 hours incur a 50% fee, and cancellations less than 1 hour before service are non-refundable.",
    },
    {
      question: "How do I make payments?",
      answer:
        "We accept multiple payment methods including credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our encrypted payment gateway.",
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer:
        "Your satisfaction is our priority. If you're not happy with the service quality, please contact our customer support within 24 hours. We offer re-service or refund based on the situation.",
    },
    {
      question: "Do you provide warranty on services?",
      answer:
        "Yes, we provide service warranties ranging from 7 days to 6 months depending on the type of service. Check the specific warranty period for each service category on our website.",
    },
    {
      question: "How do I become a service professional?",
      answer:
        "You can apply to become a service professional through our partner portal. We require relevant experience, proper tools, and completion of our training program.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Header */}
          <div className="mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight">
              Frequently Asked Questions
            </h1>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-7">
              Find answers to common questions about our services, booking
              process, payments, and policies.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-2xl px-4 sm:px-6 py-4 shadow-sm transition-all"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between gap-4 text-left"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white leading-6">
                    {faq.question}
                  </h3>

                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-700 dark:text-white flex-shrink-0 mt-1" />
                  )}
                </button>

                {/* Answer */}
                {openIndex === index && (
                  <div className="mt-4 pl-4 border-l-2 border-orange-300">
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-7">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FaqPage;
