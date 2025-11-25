import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-red-600 font-medium tracking-[0.25em] text-xs uppercase">Our story</p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Built for expressive minimalism</h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We design everyday pieces for people who move fast and care deeply about craft. 
              From fabrics to fit, every detail is considered so you can focus on living — not adjusting.n
            </p>

            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-gray-900">50k+</p>
                <p className="text-xs tracking-widest text-gray-500 uppercase">customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">120</p>
                <p className="text-xs tracking-widest text-gray-500 uppercase">styles launched</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">24h</p>
                <p className="text-xs tracking-widest text-gray-500 uppercase">support</p>
              </div>
            </div>

            <div className="mt-10 flex gap-3">
              <button className="px-5 py-2 bg-gray-900 text-white text-sm font-semibold tracking-wider hover:bg-gray-800">Shop new arrivals</button>
              <button className="px-5 py-2 border border-gray-300 text-sm text-gray-800 font-medium hover:bg-gray-50">Contact us</button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl overflow-hidden border border-gray-200">
            <div className="relative h-full w-full">
              <img src="https://i.pinimg.com/736x/44/5b/bd/445bbdc463bd1bb26e37a95e5131e1dc.jpg"></img>
                <div className="absolute inset-0 flex items-center justify-center">
               
                </div>
                 <img
                  src="/brobie.png"
                  alt="Brobie brand icon and lowercase wordmark centered on a soft gray to warm gray gradient background; a simplified mascot head sits above the word brobie; logo is static and centered within a rounded rounded square frame; visible text reads brobie; overall tone is calm, refined, and minimalist"
                  className="h-24 w-auto opacity-80"
               
                />
                </div>
            </div>
            <div className="-mt-10 ml-10 w-40 h-40 bg-white rounded-xl shadow-xl border border-gray-200 flex items-center justify-center">
              <div>
                <p className=" text-md tracking-widest text-gray-500 uppercase">founded</p>
                <p className="text-2xl font-bold text-gray-900">2025</p>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
      
    </div>
  );
};

export default About;

