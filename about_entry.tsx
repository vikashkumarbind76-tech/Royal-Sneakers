
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import LoginModal from './components/LoginModal';
import CheckoutModal from './components/CheckoutModal';
import AIStylist from './components/AIStylist';
import { CartItem, User } from './types';

const AboutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('royal_cart');
    const savedUser = localStorage.getItem('royal_user');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setShowToast(false), 3000);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-screen pt-20">
      {/* Added currentView and onNavigate to satisfy NavbarProps requirements */}
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenLogin={() => setIsLoginOpen(true)}
        user={user}
        onLogout={() => { setUser(null); triggerToast('Logged out'); }}
        currentView="about"
        onNavigate={(view) => window.location.href = view === 'home' ? 'index.html' : `${view}.html`}
      />
      <main>
        <div className="py-20 bg-royalBlack text-cream text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter">About Us</h1>
            <p className="text-royalGold uppercase tracking-widest mt-4 text-sm font-bold">The Royal Standard</p>
        </div>
        <About />
      </main>
      <Footer />
      {/* Added missing props and corrected function signatures to satisfy CartDrawerProps requirements */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={(id, delta) => {}} 
        onRemove={(id) => {}} 
        onCheckout={() => setIsCheckoutOpen(true)}
        recommendations={[]}
        onAddRecommendation={(p) => {}}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={(name) => setUser({name, email: 'user@royal.com'})} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={cartItems} onComplete={() => {}} />
      <AIStylist />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><AboutPage /></React.StrictMode>);
