
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Shop from './components/Shop';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import LoginModal from './components/LoginModal';
import CheckoutModal from './components/CheckoutModal';
import AIStylist from './components/AIStylist';
import { Product, CartItem, User } from './types';
import { PRODUCTS } from './constants';

type View = 'home' | 'shop' | 'about' | 'contact';

const App: React.FC = () => {
  // Routing State
  const [currentView, setCurrentView] = useState<View>('home');
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // UI State
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const toastTimer = useRef<number | null>(null);

  // Load persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('royal_cart');
    const savedUser = localStorage.getItem('royal_user');
    const savedView = localStorage.getItem('royal_view') as View;
    
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedView) setCurrentView(savedView);

    // Handle initial hash routing if user arrives from an external link
    const hash = window.location.hash.replace('#', '');
    if (['home', 'shop', 'about', 'contact'].includes(hash)) {
      setCurrentView(hash as View);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('royal_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('royal_view', currentView);
    window.location.hash = currentView;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

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
    try {
      setCartItems(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      triggerToast(`${product.name} added to cart`, 'success');
    } catch (e) {
      triggerToast("An unexpected error occurred.", 'error');
    }
  }, []);

  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  }, []);

  const handleRemoveFromCart = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

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
    setCurrentView('home');
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured);

  // Recommendation logic: People Also Liked
  const recommendations = useMemo(() => {
    if (cartItems.length === 0) return PRODUCTS.slice(0, 4);
    const lastAdded = cartItems[cartItems.length - 1];
    return PRODUCTS.filter(p => p.category === lastAdded.category && p.id !== lastAdded.id).slice(0, 4);
  }, [cartItems]);

  return (
    <div className="relative min-h-screen bg-cream">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenLogin={() => setIsLoginOpen(true)}
        user={user}
        onLogout={handleLogout}
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view as View)}
      />
      
      <main className="transition-all duration-500">
        {currentView === 'home' && (
          <div className="animate-fadeInUp">
            <Hero />
            
            {/* Featured Section */}
            <section className="py-24 bg-cream overflow-hidden">
              <div className="container mx-auto px-6 mb-12 flex items-end justify-between">
                <div>
                  <span className="text-royalGold uppercase tracking-[0.3em] font-bold text-xs">Curated Selection</span>
                  <h2 className="text-3xl md:text-5xl font-heading font-bold mt-2">Featured Hits</h2>
                </div>
              </div>
              
              <div className="px-6 md:px-0">
                <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-10 snap-x snap-mandatory md:pl-[max(1.5rem,calc((100%-1280px)/2+1.5rem))]">
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-72 md:w-96 snap-start">
                      <div className="group relative aspect-square bg-beige mb-4 overflow-hidden shadow-sm">
                        <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={product.name} />
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="absolute bottom-6 right-6 w-12 h-12 bg-white text-royalBlack rounded-full shadow-xl flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-royalBlack hover:text-white"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                      <h3 className="font-bold text-lg uppercase tracking-tight">{product.name}</h3>
                      <p className="text-royalGold font-heading font-bold">${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {currentView === 'shop' && (
          <div className="animate-fadeInUp pt-10">
            <div className="py-12 bg-royalBlack text-cream text-center mb-10">
                <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter">Official Shop</h1>
                <p className="text-royalGold uppercase tracking-widest mt-4 text-sm font-bold">Premium Streetwear & Footwear</p>
            </div>
            <Shop 
              onAddToCart={handleAddToCart} 
              onOpenLogin={() => setIsLoginOpen(true)} 
              user={user} 
            />
          </div>
        )}
        
        {currentView === 'about' && (
          <div className="animate-fadeInUp pt-10">
            <div className="py-20 bg-royalBlack text-cream text-center">
                <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter">About Us</h1>
                <p className="text-royalGold uppercase tracking-widest mt-4 text-sm font-bold">The Royal Standard</p>
            </div>
            <About />
          </div>
        )}

        {currentView === 'contact' && (
          <div className="animate-fadeInUp pt-10">
            <div className="py-20 bg-royalBlack text-cream text-center">
                <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter">Contact Us</h1>
                <p className="text-royalGold uppercase tracking-widest mt-4 text-sm font-bold">Inquiry & Feedback</p>
            </div>
            <Contact />
          </div>
        )}

        {/* Marquee - Show on all views for consistent branding */}
        <div className="bg-royalBlack py-12 overflow-hidden whitespace-nowrap border-y border-white/10">
          <div className="inline-block animate-marquee">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-cream/30 text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mx-12">
                ROYAL SNEAKERS & APPARELS • BROOKLYN NYC • STREETWEAR ROYALTY • 
              </span>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals & Popups */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] transition-all duration-500 transform ${
        showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-royalBlack text-cream px-8 py-4 rounded-full shadow-2xl flex items-center space-x-4 border border-white/10">
          {toastType === 'success' ? (
            <i className="fa-solid fa-circle-check text-royalGold"></i>
          ) : (
            <i className="fa-solid fa-circle-exclamation text-red-500"></i>
          )}
          <span className="text-xs font-bold uppercase tracking-widest">{toastMsg}</span>
        </div>
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => setIsCheckoutOpen(true)}
        recommendations={recommendations}
        onAddRecommendation={handleAddToCart}
      />

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin} 
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onComplete={handleCheckoutComplete}
      />

      <AIStylist />
    </div>
  );
};

export default App;
