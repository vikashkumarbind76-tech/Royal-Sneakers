
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const AIStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Welcome to Royal. I am your personal style curator. How can I help you elevate your look today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Safety check for API Key availability in this specific environment
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
        // Proceeding after prompt as instructed
      }
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Re-instantiating right before use to catch any key updates
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const productList = PRODUCTS.map(p => `${p.name} ($${p.price}) - ${p.category}`).join(', ');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `You are the "Royal AI Stylist" for "Royal Sneakers & Apparels" in Brooklyn. 
          Your tone is sophisticated, trendy, urban, and helpful. 
          You help customers find the perfect streetwear and footwear from our local shop.
          Our current collection includes: ${productList}.
          Always be concise but high-fashion. If a user asks for recommendations, refer to our specific products.
          Emphasize our Brooklyn roots (1347 Fulton St) and premium quality.`,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "I apologize, my connection to the style mainframe was briefly interrupted. How else can I assist?";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error: any) {
      console.error("AI Stylist Error:", error);
      
      // Handle the specific error to reset key selection state as per guidelines
      if (error?.message?.includes("Requested entity was not found") && (window as any).aistudio) {
        await (window as any).aistudio.openSelectKey();
      }

      setMessages(prev => [...prev, { role: 'model', text: "Forgive me, I'm experiencing a temporary connection issue. Please ensure your session is active and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-royalGold text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark text-xl"></i>
        ) : (
          <div className="relative">
            <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
        )}
        <span className="absolute right-16 bg-royalBlack text-cream text-[10px] font-bold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest pointer-events-none">
          Royal AI Stylist
        </span>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 z-[100] w-[350px] md:w-[400px] h-[500px] bg-cream shadow-2xl rounded-xl flex flex-col overflow-hidden border border-royal-beige transition-all duration-500 transform ${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="bg-royalBlack p-6 flex items-center space-x-4">
          <div className="w-10 h-10 bg-royalGold rounded-full flex items-center justify-center text-white">
            <i className="fa-solid fa-crown text-sm"></i>
          </div>
          <div>
            <h3 className="text-cream font-heading font-bold uppercase tracking-widest text-sm">Royal AI Stylist</h3>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-cream/50 uppercase tracking-widest font-bold">Online & Ready</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-beige/10">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-royalBlack text-cream rounded-tr-none' 
                  : 'bg-white text-royalBlack border border-royal-beige rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-royal-beige shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-royalGold rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-royalGold rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-royalGold rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-royal-beige">
          <div className="relative">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for style advice..."
              className="w-full bg-beige/30 border border-royal-beige rounded-full py-3 px-6 pr-12 focus:outline-none focus:border-royalGold text-sm transition-colors"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-royalBlack text-cream rounded-full flex items-center justify-center hover:bg-royalGold transition-colors disabled:opacity-30"
            >
              <i className="fa-solid fa-paper-plane text-[10px]"></i>
            </button>
          </div>
          <p className="text-[8px] text-center text-gray-400 mt-2 uppercase tracking-widest">Powered by Royal Intelligence</p>
        </form>
      </div>
    </>
  );
};

export default AIStylist;
