"use client";

import { useEffect } from "react";

const CancellationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <main className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="max-w-4xl mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
              Cancellation & Refund
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-7">
              Our cancellation and refund policy outlines the terms under which
              you can cancel services and receive refunds.
            </p>
          </div>

          {/* Content */}
          <div className="max-w-4xl space-y-8">
            {/* Cancellation Policy */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Cancellation Policy
              </h2>

              <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
                <li>
                  Free cancellation up to 2 hours before scheduled service
                </li>

                <li>50% refund for cancellations within 2 hours of service</li>

                <li>
                  No refund for cancellations less than 1 hour before service
                </li>

                <li>Cancellations must be made through our app or website</li>
              </ul>
            </section>

            {/* Refund Process */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Refund Process
              </h2>

              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
                Refunds are processed within 5–7 business days to the original
                payment method. You will receive a confirmation email once the
                refund is initiated.
              </p>
            </section>

            {/* Service Quality */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Service Quality Issues
              </h2>

              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
                If you're not satisfied with the service quality, please contact
                our customer support within 24 hours for resolution or refund
                consideration.
              </p>
            </section>

            {/* Special Circumstances */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Special Circumstances
              </h2>

              <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
                <li>Emergency cancellations due to unforeseen circumstances</li>

                <li>Service provider no-show situations</li>

                <li>Weather-related service disruptions</li>

                <li>Technical issues preventing service delivery</li>
              </ul>
            </section>

            {/* Non Refundable */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Non-Refundable Items
              </h2>

              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
                Certain services and materials may have different cancellation
                terms. These will be clearly communicated at the time of
                booking.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CancellationPage;
