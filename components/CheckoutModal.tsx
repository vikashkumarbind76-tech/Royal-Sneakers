
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, onComplete }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsProcessing(true);
      // Simulate a real-world payment gateway delay
      setTimeout(() => {
        onComplete();
        setIsProcessing(false);
        setStep(1); // Reset step for next time
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={!isProcessing ? onClose : undefined}></div>
      <div className="relative bg-cream w-full max-w-2xl p-8 md:p-12 shadow-2xl rounded-sm overflow-hidden animate-fadeInUp max-h-[90vh] overflow-y-auto">
        
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-12 relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-px bg-royal-beige -z-10"></div>
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                step >= s ? 'bg-royalBlack text-cream scale-110' : 'bg-white text-gray-300 border border-royal-beige'
              }`}
            >
              {step > s ? <i className="fa-solid fa-check text-[10px]"></i> : s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fadeInUp">
            <h3 className="text-2xl font-heading font-bold mb-8 uppercase tracking-widest text-center">Shipping Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="First Name" className="col-span-1 p-4 bg-white border border-royal-beige focus:outline-none focus:border-royalBlack" />
              <input placeholder="Last Name" className="col-span-1 p-4 bg-white border border-royal-beige focus:outline-none focus:border-royalBlack" />
              <input placeholder="Address Line 1" className="col-span-2 p-4 bg-white border border-royal-beige focus:outline-none focus:border-royalBlack" />
              <input placeholder="City" className="col-span-1 p-4 bg-white border border-royal-beige focus:outline-none focus:border-royalBlack" />
              <input placeholder="Zip Code" className="col-span-1 p-4 bg-white border border-royal-beige focus:outline-none focus:border-royalBlack" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fadeInUp">
            <h3 className="text-2xl font-heading font-bold mb-8 uppercase tracking-widest text-center">Payment Info</h3>
            <div className="space-y-4">
              <div className="p-4 border border-royalBlack bg-white flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <i className="fa-brands fa-cc-visa text-2xl"></i>
                  <span className="font-medium">Visa ending in 4242</span>
                </div>
                <div className="w-4 h-4 rounded-full bg-royalBlack"></div>
              </div>
              <div className="p-4 border border-royal-beige bg-white flex justify-between items-center opacity-50 cursor-not-allowed">
                <div className="flex items-center space-x-4">
                  <i className="fa-brands fa-cc-mastercard text-2xl"></i>
                  <span className="font-medium">MasterCard ending in 8890</span>
                </div>
                <div className="w-4 h-4 rounded-full border border-royal-beige"></div>
              </div>
              <div className="mt-8">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">CVV</label>
                <input placeholder="123" maxLength={3} className="w-24 p-4 bg-white border border-royal-beige focus:outline-none focus:border-royalBlack" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fadeInUp text-center">
            <div className="w-20 h-20 bg-royalGold text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg">
              <i className="fa-solid fa-cart-check"></i>
            </div>
            <h3 className="text-2xl font-heading font-bold mb-4 uppercase tracking-widest">Order Review</h3>
            <p className="text-gray-500 mb-8">You're about to complete your purchase of {items.length} items.</p>
            <div className="bg-beige/50 p-6 rounded-sm mb-8 border border-royal-beige">
              <div className="flex justify-between font-bold text-xl items-center">
                <span className="text-sm uppercase tracking-widest text-gray-400">Total Amount:</span>
                <span className="text-royalBlack">${total}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 flex space-x-4">
          {step > 1 && !isProcessing && (
            <button 
              onClick={() => setStep(step - 1)}
              className="flex-1 border border-royalBlack py-4 font-bold uppercase tracking-widest hover:bg-beige transition-all"
            >
              Back
            </button>
          )}
          <button 
            onClick={handleNext}
            disabled={isProcessing}
            className={`flex-[2] bg-royalBlack text-cream py-4 font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center space-x-3 ${
              isProcessing ? 'opacity-80 cursor-wait' : 'hover:bg-black'
            }`}
          >
            {isProcessing ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i>
                <span>Authorizing...</span>
              </>
            ) : (
              <span>{step === 3 ? 'Confirm & Pay' : 'Continue'}</span>
            )}
          </button>
        </div>
        
        {isProcessing && (
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-royalGold mt-6 animate-pulse">
            Securely processing your payment via Royal Pay
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
