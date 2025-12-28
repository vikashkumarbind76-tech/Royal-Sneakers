
import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData.name || formData.email.split('@')[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-cream w-full max-w-md p-8 md:p-12 shadow-2xl rounded-sm animate-fadeInUp">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-royalBlack">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-heading font-bold uppercase tracking-tight">
            {isLoginView ? 'Welcome Back' : 'Join the Club'}
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            {isLoginView ? 'Access your royal rewards and history.' : 'Get exclusive access to the latest drops.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLoginView && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
              <input 
                required
                type="text" 
                className="w-full bg-white border border-royal-beige p-4 focus:outline-none focus:border-royalBlack transition-colors"
                placeholder="John Doe"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full bg-white border border-royal-beige p-4 focus:outline-none focus:border-royalBlack transition-colors"
              placeholder="royal@example.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Password</label>
            <input 
              required
              type="password" 
              className="w-full bg-white border border-royal-beige p-4 focus:outline-none focus:border-royalBlack transition-colors"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="w-full bg-royalBlack text-cream py-4 font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg mt-4">
            {isLoginView ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          {isLoginView ? (
            <p>New to Royal? <button onClick={() => setIsLoginView(false)} className="text-royalBlack font-bold hover:underline">Create an account</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setIsLoginView(true)} className="text-royalBlack font-bold hover:underline">Sign in</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
