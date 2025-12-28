
import React, { useState, useEffect } from 'react';
import { STORE_INFO } from '../constants';
import { User } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenLogin: () => void;
  user: User | null;
  onLogout: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onOpenCart, 
  onOpenLogin, 
  user, 
  onLogout,
  currentView,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-cream/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-royalBlack text-cream flex items-center justify-center rounded-lg font-bold text-xl shadow-md">R</div>
          <span className="font-heading font-bold text-xl tracking-tight hidden lg:block uppercase text-royalBlack">Royal Sneakers</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleLinkClick(link.id)}
              className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-colors ${
                currentView === link.id ? 'text-royalGold' : 'text-royalBlack/60 hover:text-royalBlack'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-royalGold">Hello, {user.name}</span>
              <button 
                onClick={onLogout}
                className="p-2 hover:bg-beige rounded-full transition-colors group"
                title="Logout"
              >
                <i className="fa-solid fa-arrow-right-from-bracket text-lg group-hover:text-red-500"></i>
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenLogin}
              className="p-2 hover:bg-beige rounded-full transition-colors"
              title="Login"
            >
              <i className="fa-regular fa-user text-xl"></i>
            </button>
          )}
          
          <button 
            onClick={onOpenCart}
            className="relative p-2 hover:bg-beige rounded-full transition-colors"
          >
            <i className="fa-solid fa-cart-shopping text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-royalBlack text-cream text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-cream">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            className="md:hidden p-2 text-xl text-royalBlack"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 top-[72px] bg-cream z-40 transition-transform duration-500 transform ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-10">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleLinkClick(link.id)}
              className={`text-2xl font-heading font-bold uppercase tracking-widest ${
                currentView === link.id ? 'text-royalGold' : 'text-royalBlack'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
