"use client";

import { useRouter } from "next/navigation";
import LayoutContainer from "./LayoutContainer";

const handymanServices = [
  {
    label: "Electrician",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop",
  },
  {
    label: "Carpenter",
    image: "https://images.unsplash.com/photo-1611243003866-5c77463f6435?w=600&h=400&fit=crop",
  },
  {
    label: "Plumber",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop",
  },
  {
    label: "Furniture Assembly & Dismantle",
    image: "https://images.unsplash.com/photo-1581578731117-104f2a41272c?w=600&h=400&fit=crop",
  },
  {
    label: "House Repairer",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop",
  },
];

const HandymanServices = () => {
  const router = useRouter();

  return (
    <section className="py-6 bg-white" style={{ marginTop: '60px', marginBottom: '60px' }}>
      <LayoutContainer>
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">
          Handyman Services
        </h2>

        <div className="relative group">
          <div 
            className="flex overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none] snap-x items-center"
            style={{ gap: '20px' }}
          >
            {handymanServices.map((service, index) => (
              <div key={index} className="flex-shrink-0 snap-center" style={{ width: '232px', height: '196px' }}>
                <div
                  onClick={() => router.push("/services")}
                  className="cursor-pointer transition-all duration-300 ease w-full h-full"
                  style={{
                    borderRadius: '12px',
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '12px',
                    gap: '12px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Image on top */}
                  <div style={{ 
                    width: '100%', 
                    height: '140px', 
                    overflow: 'hidden',
                    backgroundColor: '#F5F5F5'
                  }}>
                    <img
                      src={service.image}
                      alt={service.label}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Text below image */}
                  <div 
                    style={{
                      backgroundColor: 'white',
                      padding: '8px 12px',
                      width: '100%',
                      textAlign: 'center',
                      border: 'none',
                      outline: 'none'
                    }}
                  >
                    <h3 
                      style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#222',
                        textAlign: 'center',
                        margin: 0
                      }}
                    >
                      {service.label}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
};

export default HandymanServices;
