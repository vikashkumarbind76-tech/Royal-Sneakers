
import React from 'react';
import { CartItem, Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  recommendations: Product[];
  onAddRecommendation: (product: Product) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove, 
  onCheckout,
  recommendations,
  onAddRecommendation
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Panel */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-cream z-[70] shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-royal-beige flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-10">
            <h2 className="text-2xl font-heading font-bold uppercase tracking-widest">Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-beige rounded-full transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                <div className="w-24 h-24 bg-beige/50 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-bag-shopping text-4xl text-gray-300"></i>
                </div>
                <div>
                  <p className="text-xl font-bold uppercase tracking-tighter">Your bag is empty.</p>
                  <p className="text-gray-400 text-sm mt-2">Start adding some heat to your collection.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="bg-royalBlack text-cream px-8 py-4 font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-all"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex space-x-4 pb-6 border-b border-royal-beige last:border-0 group">
                    <div className="w-24 h-24 flex-shrink-0 bg-white border border-royal-beige rounded-sm overflow-hidden group-hover:border-royalBlack transition-colors">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm leading-tight pr-4 uppercase tracking-tight">{item.name}</h3>
                        <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                          <i className="fa-solid fa-trash-can text-sm"></i>
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-[0.2em]">{item.category}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-royal-beige rounded-sm bg-white overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-1 hover:bg-beige transition-colors border-r border-royal-beige"
                          >
                            <i className="fa-solid fa-minus text-[8px]"></i>
                          </button>
                          <span className="px-3 py-1 font-bold text-[10px] min-w-[25px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-1 hover:bg-beige transition-colors border-l border-royal-beige"
                          >
                            <i className="fa-solid fa-plus text-[8px]"></i>
                          </button>
                        </div>
                        <span className="font-heading font-bold text-base">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Suggestions inside Cart */}
            {recommendations.length > 0 && (
              <div className="pt-10 mt-10 border-t border-royal-beige">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-royalGold mb-6">You Might Also Like</h4>
                <div className="grid grid-cols-2 gap-4">
                  {recommendations.map(p => (
                    <div 
                      key={p.id} 
                      className="bg-white p-3 border border-royal-beige rounded-sm group hover:border-royalGold transition-all cursor-pointer"
                      onClick={() => onAddRecommendation(p)}
                    >
                      <div className="aspect-square bg-beige mb-2 overflow-hidden">
                        <img src={p.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      </div>
                      <p className="text-[9px] font-bold uppercase truncate">{p.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] font-bold text-royalGold">${p.price}</span>
                        <i className="fa-solid fa-plus text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-royal-beige shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Estimated Total</span>
                <span className="text-3xl font-heading font-bold tracking-tight">${total}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-royalBlack text-cream py-5 font-bold uppercase tracking-[0.2em] hover:bg-black transition-all rounded-sm shadow-xl flex items-center justify-center space-x-3 group"
              >
                <span>Proceed to Checkout</span>
                <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
