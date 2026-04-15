"use client";

import { useEffect } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white text-gray-700">
        <h1 className="text-3xl font-semibold mb-4">Term of use</h1>

        <p className="text-[15px] mb-6">
          Welcome to TASPRO Company! These Terms of Use govern your access to
          and use of our mobile application and related services (collectively,
          the "App"). By accessing or using the App, you agree to be bound by
          these Terms of Use.
        </p>

        <div className="space-y-5 text-sm leading-relaxed">
          <div>
            <p className="font-medium text-[#414141]">• Acceptance of Terms</p>
            <p className="text-[15px]">
              By accessing or using the App, you represent and warrant that you
              have read, understood, and agree to be bound by these Terms of
              Use. If you do not agree to these terms, you must not use the App.
            </p>
          </div>

          <div>
            <p className="font-medium text-[#414141]">
              • User Accounts and Security
            </p>
            <p className="text-[15px]">
              To access certain features of the App, you may be required to
              create an account. You are responsible for maintaining the
              confidentiality of your account information, including your
              username and password. You are solely responsible for all
              activities that occur under your account.
            </p>
          </div>

          <div>
            <p className="font-medium text-[#414141]">• User Conduct</p>
            <p className="text-[15px]">
              You agree to use the App in compliance with applicable laws and
              regulations. You must not engage in any activities that may:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-[15px]">
              <li>Violate the rights of others;</li>
              <li>Be unlawful, fraudulent, or deceptive;</li>
              <li>
                Interfere with or disrupt the App's functionality or
                infrastructure;
              </li>
              <li>Introduce viruses or other malicious code;</li>
              <li>
                Collect or store personal data of other users without their
                consent;
              </li>
              <li>
                Engage in any other activity that is deemed inappropriate or
                objectionable.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-[#414141]">
              • Third-Party Services and Links
            </p>
            <p className="text-[15px]">
              The App may contain links or references to third-party websites or
              services. These links are provided for your convenience, and we do
              not endorse or assume any responsibility for the content or
              practices of these third parties. Your use of such third-party
              services is subject to their terms and conditions.
            </p>
          </div>

          <div>
            <p className="font-medium text-[#414141]">
              • Disclaimer of Warranties
            </p>
            <p className="text-[15px]">
              The App is provided on an "as is" and "as available" basis,
              without warranties of any kind, whether express, implied, or
              statutory. We do not warrant that the App will be uninterrupted,
              error-free, or free from viruses or other harmful components.
            </p>
          </div>

          <div>
            <p className="font-medium text-[#414141]">
              • Limitation of Liability
            </p>
            <p className="text-[15px]">
              To the maximum extent permitted by law, TASPRO Company and its
              affiliates, officers, employees, and agents shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages, including lost profits, arising out of or in connection
              with your use of the App.
            </p>
          </div>

          <div>
            <p className="font-medium text-[#414141]">• Privacy Policy</p>
            <p className="text-[15px]">
              Your privacy is important to us. Please refer to our Privacy
              Policy, which explains how we collect, use, and disclose your
              personal information when you use the App.
            </p>
          </div>

          <div>
            <p className="font-medium text-[#414141]">
              • Modifications and Termination
            </p>
            <p className="text-[15px]">
              We reserve the right to modify, suspend, or terminate the App or
              these Terms of Use at any time without prior notice. We may also
              update these Terms of Use from time to time, and it is your
              responsibility to review them periodically.
            </p>
          </div>

          <div>
            <p className="font-medium text-[#414141]">
              • Governing Law and Jurisdiction
            </p>
            <p className="text-[15px]">
              These Terms of Use shall be governed by and construed in
              accordance with the laws of the United States of America. Any
              disputes arising out of or relating to these Terms of Use shall be
              subject to the exclusive jurisdiction of the courts in New York.
            </p>
          </div>

          <div>
            <p className="font-medium text-[#414141]">• Entire Agreement</p>
            <p className="text-[15px]">
              TASPRO Company regarding your use of the App, superseding any
              prior agreements or understandings.
            </p>
          </div>
        </div>

        <p className="text-[15px] mt-6">
          If you have any questions or concerns about these Terms of Use, please
          contact us at [Contact Information].
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
