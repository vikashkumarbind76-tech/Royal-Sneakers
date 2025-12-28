
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import LoginModal from './components/LoginModal';
import CheckoutModal from './components/CheckoutModal';
import AIStylist from './components/AIStylist';
import { Product, CartItem, User } from './types';

const ShopPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('royal_cart');
    const savedUser = localStorage.getItem('royal_user');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('royal_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (user) localStorage.setItem('royal_user', JSON.stringify(user));
    else localStorage.removeItem('royal_user');
  }, [user]);

  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddToCart = useCallback((product: Product) => {
    const isSimulatedFailure = Math.random() < 0.05;
    if (isSimulatedFailure) {
      triggerToast(`Unable to add ${product.name} to cart. Please try again.`, 'error');
      return;
    }
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    triggerToast(`${product.name} added to cart`, 'success');
  }, []);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleLogin = (name: string) => {
    setUser({ name, email: `${name.toLowerCase()}@royal.com` });
    triggerToast(`Welcome back, ${name}`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    triggerToast(`Logged out successfully`, 'success');
  };

  const handleCheckoutComplete = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCartItems([]);
    triggerToast(`Payment successful! Order confirmed.`, 'success');
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
        onLogout={handleLogout}
        currentView="shop"
        onNavigate={(view) => window.location.href = view === 'home' ? 'index.html' : `${view}.html`}
      />
      <main>
        <div className="py-12 bg-royalBlack text-cream text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter">Official Shop</h1>
            <p className="text-royalGold uppercase tracking-widest mt-4 text-sm font-bold">Premium Streetwear & Footwear</p>
        </div>
        <Shop 
          onAddToCart={handleAddToCart} 
          onOpenLogin={() => setIsLoginOpen(true)} 
          user={user} 
        />
      </main>
      <Footer />
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] transition-all duration-500 transform ${
        showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-royalBlack text-cream px-8 py-4 rounded-full shadow-2xl flex items-center space-x-4 border border-white/10">
          <i className={`fa-solid ${toastType === 'success' ? 'fa-circle-check text-royalGold' : 'fa-circle-exclamation text-red-500'}`}></i>
          <span className="text-xs font-bold uppercase tracking-widest">{toastMsg}</span>
        </div>
      </div>
      {/* Added recommendations and onAddRecommendation to satisfy CartDrawerProps requirements */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => setIsCheckoutOpen(true)}
        recommendations={[]}
        onAddRecommendation={handleAddToCart}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={cartItems} onComplete={handleCheckoutComplete} />
      <AIStylist />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><ShopPage /></React.StrictMode>);
