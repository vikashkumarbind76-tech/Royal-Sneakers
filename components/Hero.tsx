
import React from 'react';
import { STORE_INFO } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium Sneaker Display" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl animate-fadeInUp">
          <p className="text-cream uppercase tracking-[0.3em] font-medium mb-4 text-sm md:text-base">
            EST. 2024 • BROOKLYN, NY
          </p>
          <h1 className="text-5xl md:text-8xl font-heading font-bold text-cream leading-none mb-8">
            ROYAL<br />SNEAKERS<br />& APPARELS
          </h1>
          <p className="text-lg md:text-xl text-cream/90 font-light mb-10 max-w-xl">
            Defining modern streetwear with premium kicks and curated styles. From the heart of Brooklyn to your wardrobe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="shop.html" 
              className="bg-cream text-royalBlack px-10 py-4 font-bold uppercase tracking-widest hover:bg-beige transition-all text-center rounded-sm"
            >
              Shop Now
            </a>
            <a 
              href="index.html#contact" 
              className="border border-cream text-cream px-10 py-4 font-bold uppercase tracking-widest hover:bg-cream hover:text-royalBlack transition-all text-center rounded-sm"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Social Indicator */}
      <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center space-y-6 z-20">
        <div className="w-px h-24 bg-cream/30"></div>
        <a href={`https://instagram.com/${STORE_INFO.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-cream transition-colors vertical-text uppercase tracking-widest text-xs py-4" style={{ writingMode: 'vertical-rl' }}>
          Follow @royals_sneakers
        </a>
      </div>
    </section>
  );
};

export default Hero;
