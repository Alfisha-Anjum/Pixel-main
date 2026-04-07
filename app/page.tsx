"use client";



import Header from "@/components/Header";

import ServiceSection from "@/components/ServiceSection";

import FeatureSection from "@/components/FeatureSection";

import AppliancesGrid from "@/components/AppliancesGrid";

import ServicePromoSection from "@/components/ServicePromoSection";

import DeepCleaningServices from "@/components/DeepCleaningServices";

import CleaningPackage from "@/components/CleaningPackage";

import HandymanServices from "@/components/HandymanServices";

import MajorServices from "@/components/MajorServices";

import Footer from "@/components/Footer";

import AMCServicePlan from "@/components/AMCServicePlan";

import WhyChooseUs from "@/components/WhyChooseUs";

import DownloadApp from "@/components/DownloadApp";

import OnDemandServices from "@/components/OnDemandServices";

import HomeStartupModal from "@/components/HomeStartupModal";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import { useEffect, useState } from "react";



export default function Home() {

  const router = useRouter();

  const { user } = useAuth();

  const [isMounted, setIsMounted] = useState(false);



  useEffect(() => {

    setIsMounted(true);

  }, []);

  

  useEffect(() => {

    // Check if user profile is complete, if not redirect to profile completion

    if (user && !user.profileCompleted) {

      // If email is not verified, go to email verification

      if (!user.emailVerified) {

        router.push(`/email-verification?phone=${user.phone}&firstName=${user.firstName}&lastName=${user.lastName}&email=${user.email}`);

      } else {

        // Otherwise, go to complete profile step 2

        router.push(`/complete-profile-step-2?phone=${user.phone}&firstName=${user.firstName}&lastName=${user.lastName}&email=${user.email}`);

      }

    }

  }, [user, router]);

  

  const handleBookService = () => {

    router.push('/services');

  };

  

  // Don't render anything if redirecting

  if (isMounted && user && !user.profileCompleted) {

    return null;

  }

  

  return (

    <div className="min-h-screen bg-background">

      <Header />

      <HomeStartupModal />

      <main>

        <ServiceSection />

        <FeatureSection />

        <AMCServicePlan />

        <AppliancesGrid />

        <DeepCleaningServices />

        <CleaningPackage />

        <HandymanServices />

        <MajorServices />

        <ServicePromoSection />

        <WhyChooseUs />

        <DownloadApp />

        <OnDemandServices />

      </main>

      <Footer />

    </div>

  );

}