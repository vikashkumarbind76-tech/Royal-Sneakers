
import React, { useState, useEffect, useRef } from 'react';
import { STORE_INFO } from '../constants';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true); // Default to true
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 bg-beige/20"
    >
      <div className="container mx-auto px-6 transition-opacity duration-1000 opacity-100">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fadeInUp">
          <span className="text-royalGold uppercase tracking-widest font-bold text-sm">Get in touch</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2 text-royalBlack">Visit our flagship</h2>
          <p className="mt-4 text-gray-600">Our Brooklyn space is more than a store. It's a sanctuary for the streetwear culture.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details & Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 border border-royal-beige rounded-sm shadow-sm group hover:border-royalBlack transition-colors">
              <h4 className="font-bold uppercase tracking-widest text-xs text-royalGold mb-4">Location</h4>
              <p className="text-royalBlack font-medium mb-4">{STORE_INFO.address}</p>
              <a href="https://maps.google.com" target="_blank" className="text-xs font-bold uppercase tracking-widest border-b border-royalBlack pb-1 text-royalBlack hover:text-royalGold hover:border-royalGold transition-all">Get Directions</a>
            </div>

            <div className="bg-white p-8 border border-royal-beige rounded-sm shadow-sm group hover:border-royalBlack transition-colors">
              <h4 className="font-bold uppercase tracking-widest text-xs text-royalGold mb-4">Business Hours</h4>
              <ul className="text-sm space-y-2 text-gray-600 font-medium">
                <li className="flex justify-between"><span>Mon - Sat</span> <span>10:00 AM - 08:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span>11:00 AM - 06:00 PM</span></li>
              </ul>
            </div>

            <div className="bg-royalBlack p-8 text-cream rounded-sm shadow-xl">
              <h4 className="font-bold uppercase tracking-widest text-xs text-royalGold mb-4">Direct Support</h4>
              <p className="mb-6 opacity-70 text-sm">Our team is available for phone consultations during store hours.</p>
              <a href={`tel:${STORE_INFO.phone}`} className="flex items-center space-x-3 text-xl font-heading font-bold hover:text-royalGold transition-colors text-cream">
                <i className="fa-solid fa-phone-volume text-sm"></i>
                <span>{STORE_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Form & Map Interaction */}
          <div className="lg:col-span-8 bg-white border border-royal-beige shadow-lg p-8 md:p-12 relative overflow-hidden">
            {formStatus === 'sent' ? (
              <div className="py-20 text-center animate-fadeInUp">
                <div className="w-20 h-20 bg-royalBlack text-royalGold rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-xl">
                  <i className="fa-solid fa-paper-plane"></i>
                </div>
                <h3 className="text-3xl font-heading font-bold mb-4 text-royalBlack">Message Sent</h3>
                <p className="text-gray-500">Your inquiry is in the hands of our style curators. Expect a response within 24 hours.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-10 font-bold uppercase tracking-widest text-xs border-b border-royalBlack pb-1 text-royalBlack">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Full Name</label>
                    <input required className="w-full border-b border-royal-beige py-4 focus:outline-none focus:border-royalBlack transition-colors bg-transparent font-medium text-royalBlack" placeholder="Kingsley Royal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                    <input required type="email" className="w-full border-b border-royal-beige py-4 focus:outline-none focus:border-royalBlack transition-colors bg-transparent font-medium text-royalBlack" placeholder="kingsley@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Your Message</label>
                  <textarea required rows={4} className="w-full border-b border-royal-beige py-4 focus:outline-none focus:border-royalBlack transition-colors bg-transparent font-medium resize-none text-royalBlack" placeholder="I'm inquiring about the upcoming limited drop..."></textarea>
                </div>
                <button 
                  disabled={formStatus === 'sending'}
                  className="bg-royalBlack text-cream px-12 py-5 font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl disabled:opacity-50 flex items-center space-x-3"
                >
                  {formStatus === 'sending' ? (
                    <>
                      <i className="fa-solid fa-spinner animate-spin"></i>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Dispatch Inquiry</span>
                  )}
                </button>
              </form>
            )}
            
            {/* Visual background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-royalGold/5 rounded-full -translate-y-1/2 translate-x-1/2 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
