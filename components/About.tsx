
import React, { useEffect, useState, useRef } from 'react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true); // Default to true
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-32 bg-cream overflow-hidden"
    >
      {/* Decorative Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-100 transition-opacity duration-1000">
        <span className="text-[20rem] font-black text-beige/40 leading-none uppercase tracking-tighter">
          Royal
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Image Mosaic Grid */}
          <div className="lg:w-1/2 w-full transition-all duration-1000 animate-fadeInUp opacity-100">
            <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[600px]">
              <div className="col-span-8 row-span-4 overflow-hidden rounded-sm shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200" 
                  alt="Store Interior" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="col-span-4 row-span-3 overflow-hidden rounded-sm shadow-xl mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800" 
                  alt="Sneaker Detail" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="col-start-7 col-span-6 row-span-3 overflow-hidden rounded-sm shadow-2xl -mt-4">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000" 
                  alt="Streetwear Apparel" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-1/2 w-full space-y-8 opacity-100 transition-opacity duration-1000">
            <div className="animate-fadeInUp">
              <span className="inline-block px-4 py-1 rounded-full bg-royalGold/10 text-royalGold uppercase tracking-[0.2em] font-bold text-xs mb-4">
                Our Heritage
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-royalBlack leading-[1.1]">
                Brooklyn Roots,<br />
                <span className="text-royalGold">Global Style.</span>
              </h2>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed text-lg animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <p>
                Royal Sneakers & Apparels isn't just a boutique—it's a landmark. Established in 2024 at 1347 Fulton St, our mission was to bridge the gap between exclusive high-fashion drops and the raw, authentic street culture of Brooklyn.
              </p>
              <p>
                Every stitch, every sole, and every silhouette in our store is hand-selected by a team of connoisseurs. We believe that streetwear is the new luxury, and we treat our community like the royalty they are.
              </p>
            </div>

            {/* Core Values / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-full border border-royal-beige flex items-center justify-center group-hover:bg-royalBlack group-hover:text-cream transition-colors">
                  <i className="fa-solid fa-gem text-sm"></i>
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-royalBlack">Premium Quality</h4>
                  <p className="text-xs text-gray-400">Hand-picked authentic goods.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-full border border-royal-beige flex items-center justify-center group-hover:bg-royalBlack group-hover:text-cream transition-colors">
                  <i className="fa-solid fa-users text-sm"></i>
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-royalBlack">Community Hub</h4>
                  <p className="text-xs text-gray-400">Supporting local Brooklyn artists.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-royal-beige flex items-center justify-between animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-cream overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Customer" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-cream bg-beige flex items-center justify-center text-[10px] font-bold text-royalBlack">
                  +10k
                </div>
              </div>
              <p className="text-sm font-medium text-gray-500 italic">
                "The heart of Brooklyn's fashion scene."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
