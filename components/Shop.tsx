
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PRODUCTS } from '../constants';
import { Category, Product, User } from '../types';

interface ShopProps {
  onAddToCart: (product: Product) => void;
  onOpenLogin: () => void;
  user: User | null;
}

const Shop: React.FC<ShopProps> = ({ onAddToCart, onOpenLogin, user }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayProducts, setDisplayProducts] = useState<Product[]>(PRODUCTS);
  
  const categories: Category[] = ['All', 'Sneakers', 'Shoes', 'Apparel'];

  useEffect(() => {
    const savedProducts = localStorage.getItem('royal_products');
    if (savedProducts) {
      try {
        setDisplayProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error("Failed to parse local products", e);
      }
    }
  }, []);

  const filteredProducts = useMemo(() => {
    return displayProducts.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [displayProducts, activeCategory, searchQuery]);

  // People Also Liked: Find items from same category but not currently in main view or just top items
  const alsoLiked = useMemo(() => {
    const categoryToPick = activeCategory === 'All' ? 'Sneakers' : activeCategory;
    return PRODUCTS.filter(p => p.category === categoryToPick).slice(0, 4);
  }, [activeCategory]);

  return (
    <section id="shop" className="py-24 bg-beige/30">
      <div className="container mx-auto px-6">
        
        {!user && (
          <div className="mb-16 bg-royalBlack text-cream p-8 md:p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-royalGold uppercase tracking-[0.3em] font-bold text-xs mb-2 block">Royal Rewards</span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 uppercase">Unlock Exclusive Drops</h3>
              <p className="text-cream/60 max-w-md text-sm leading-relaxed">
                Join our community to save your sizing, track orders, and get early access to limited edition releases.
              </p>
            </div>
            <button 
              onClick={onOpenLogin}
              className="relative z-10 bg-cream text-royalBlack px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-royalGold hover:text-white transition-all shadow-xl whitespace-nowrap"
            >
              Sign Up / Login
            </button>
            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <span className="text-[15rem] font-black leading-none">R</span>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-royalGold uppercase tracking-widest font-bold text-sm">Our Collection</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2">Latest Drops</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            <div className="relative group flex-1 sm:min-w-[300px]">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-royalBlack transition-colors"></i>
              <input 
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-royal-beige p-3.5 pl-12 focus:outline-none focus:border-royalBlack transition-all text-sm rounded-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-royalBlack text-cream shadow-lg scale-105' 
                      : 'bg-white text-royalBlack border border-royal-beige hover:border-royalBlack'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 min-h-[400px]">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group flex flex-col transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-white mb-4 rounded-sm shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute inset-x-4 bottom-4 flex flex-col space-y-2 translate-y-4 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-royalBlack text-cream py-4 font-bold uppercase tracking-widest text-[10px] shadow-2xl hover:bg-royalGold hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <i className="fa-solid fa-plus text-[8px]"></i>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start px-1">
                <div className="flex-1 pr-4">
                  <h3 className="text-sm font-bold uppercase tracking-tight line-clamp-1 group-hover:text-royalGold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-1">{product.category}</p>
                </div>
                <span className="font-heading font-bold text-base whitespace-nowrap text-royalBlack">${product.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* PEOPLE ALSO LIKED SECTION */}
        <div className="mt-32 pt-16 border-t border-royal-beige">
            <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-heading font-bold uppercase tracking-tight">People Also Liked</h3>
                <div className="h-px bg-royal-beige flex-grow mx-8 opacity-50 hidden md:block"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {alsoLiked.map(p => (
                    <div key={p.id} className="group cursor-pointer" onClick={() => onAddToCart(p)}>
                        <div className="aspect-square bg-white overflow-hidden mb-3">
                            <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 truncate">{p.name}</h4>
                        <p className="text-xs font-bold text-royalBlack">${p.price}</p>
                    </div>
                ))}
            </div>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <i className="fa-solid fa-box-open text-6xl text-beige mb-4 block"></i>
            <p className="text-gray-400 font-medium">No results found for "{searchQuery}". Try a different term or category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
