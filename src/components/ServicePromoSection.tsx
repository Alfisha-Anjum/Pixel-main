"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import LayoutContainer from "./LayoutContainer";

export default function ServicePromoSection() {
  const router = useRouter();

  return (
    <section className="pt-5 ">
      <LayoutContainer>
        <div 
          className="relative overflow-hidden shadow-xl"
          style={{
            width: '100%',
            height: '340px',
            borderRadius: '24px',
            background: 'linear-gradient(to right, #ff6b35, #ffa500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 60px',
            gap: '10px'
          }}
        >
          {/* Left Content */}
          <div 
            className="flex flex-col justify-center z-20"
            style={{
              maxWidth: '520px'
            }}
          >
            <h2 
              className="font-semibold text-white mb-2 leading-tight"
              style={{
                fontSize: '24px',
                lineHeight: '1.2'
              }}
            >
              Appliances <br/>
              Suraksha Packages
            </h2>
            <h3 
              className="font-medium text-white mb-2"
              style={{
                fontSize: '18px'
              }}
            >
              All Major Appliances Covered
            </h3>
            <p 
              className="text-white/80 mb-4 leading-relaxed"
              style={{
                fontSize: '14px',
                lineHeight: '1.4'
              }}
            >
              Protect your home appliances with our comprehensive coverage plans. 
              Experience peace of mind with 24/7 support and certified technicians 
              at your doorstep.
            </p>
            <button 
              onClick={() => router.push('/services')}
              className="group font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer flex items-center gap-2 bg-white text-orange-600"
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                marginTop: '16px',
                alignSelf: 'flex-start'
              }}
            >
              Book Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Image */}
          <div 
            className="relative flex items-center justify-end overflow-hidden"
            style={{
              height: '100%',
              flex: 1
            }}
          >
            <img
              src="/image.png"
              alt="Home Appliances Collection"
              style={{
                height: '100%',
                objectFit: 'contain',
                maxWidth: '100%'
              }}
            />
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
