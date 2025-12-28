
import React from 'react';
import { STORE_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-royalBlack text-cream pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-cream text-royalBlack flex items-center justify-center rounded-lg font-bold text-xl">R</div>
              <span className="font-heading font-bold text-2xl tracking-tighter uppercase">Royal</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-xs">
              Curating the finest sneakers and apparel for the modern urban royalty. Brooklyn's premier destination for high-end streetwear.
            </p>
            <div className="flex space-x-6">
              <a href={`https://instagram.com/${STORE_INFO.instagram.replace('@','')}`} className="text-2xl hover:text-royalGold transition-colors" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="text-2xl hover:text-royalGold transition-colors">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="text-2xl hover:text-royalGold transition-colors">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-8 uppercase tracking-widest">Shop</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="shop.html" className="hover:text-cream transition-colors">Sneakers</a></li>
              <li><a href="shop.html" className="hover:text-cream transition-colors">Apparel</a></li>
              <li><a href="shop.html" className="hover:text-cream transition-colors">Shoes</a></li>
              <li><a href="shop.html" className="hover:text-cream transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-8 uppercase tracking-widest">Support</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="index.html#about" className="hover:text-cream transition-colors">About Us</a></li>
              <li><a href="index.html#contact" className="hover:text-cream transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Return Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-8 uppercase tracking-widest">Newsletter</h4>
            <p className="text-gray-400 mb-6">Join our royal list to get early access to drops and exclusive offers.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-gray-900 border border-gray-800 rounded-sm py-4 px-6 focus:outline-none focus:border-royalGold text-cream"
              />
              <button type="submit" className="absolute right-2 top-2 bg-cream text-royalBlack px-4 py-2 font-bold uppercase text-xs hover:bg-royalGold hover:text-cream transition-all">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Royal Sneakers & Apparels. All Rights Reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
