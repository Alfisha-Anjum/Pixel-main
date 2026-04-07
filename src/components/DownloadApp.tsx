"use client";

import LayoutContainer from "./LayoutContainer";

const DownloadApp = () => {
  return (
    <section className="bg-background">
      <div className="max-w-[1240px] mx-auto px-5">
        <div 
          className="w-full"
          style={{
            height: '400px',
            borderRadius: '20px',
            background: 'linear-gradient(to right, #000000, #1a1a1a)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            padding: '0'
          }}
        >
          {/* Left Content */}
          <div style={{
            padding: '40px',
            zIndex: 10
          }}>
            <h2 
              style={{
                fontSize: '30px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '18px',
                lineHeight: '1.2'
              }}
            >
              Download This App
            </h2>
            <p 
              style={{
                fontSize: '14px',
                color: '#9CA3AF',
                lineHeight: '1.5',
                marginBottom: '24px',
                maxWidth: '350px'
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas id erat a ornare. 
              Donec bibendum venenatis mollis. Aliquam id libero at mi bibendum venenatis at ac purus. 
              Mauris eu volutpat diam, id vulputate risus.
            </p>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <a href="#" style={{
                  transition: 'transform 0.2s',
                  display: 'block'
                }}>
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    style={{
                      height: '28px',
                      width: 'auto'
                    }}
                  />
                </a>
                <a href="#" style={{
                  transition: 'transform 0.2s',
                  display: 'block'
                }}>
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="Download on the App Store" 
                    style={{
                      height: '28px',
                      width: 'auto'
                    }}
                  />
                </a>
              </div>
              
              <div style={{
                width: '1px',
                height: '72px',
                backgroundColor: '#374151'
              }}></div>
              
              <div style={{
                backgroundColor: 'white',
                padding: '6px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://taspro.in" 
                  alt="Scan QR Code" 
                  style={{
                    width: '54px',
                    height: '54px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '100%',
            paddingLeft: '35px'
          }}>
            <div style={{
              width: '200px',
              transform: 'rotate(-6deg)',
              transition: 'transform 0.5s'
            }}>
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop"
                alt="App Mockup"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '24px',
                  boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
                  border: '3px solid #1F2937'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;