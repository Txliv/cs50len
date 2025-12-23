
import React, { useState, useRef, useEffect } from 'react';
import { chatWithDuck } from '../services/gemini';
import { Message } from '../types';

export const DuckChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Quack! I'm the CS50 Rubber Duck. I'm here to help you talk through your logic. What's on your mind regarding binary, algorithms, or Scratch?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatWithDuck(userMsg, messages);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "Oh no! I lost my voice. (API Key error or connection lost)" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6 pb-4 border-b">
        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-inner border-2 border-yellow-500">
          🦆
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Rubber Duck AI</h3>
          <p className="text-xs text-gray-500 italic">"Rubber duck debugging involves explaining your code to a duck..."</p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pr-4 custom-scrollbar mb-4"
      >
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-[#A51C30] text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-5 py-3 rounded-2xl rounded-bl-none border border-gray-200 flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk to the duck..."
          disabled={isLoading}
          className="w-full bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 pr-16 focus:outline-none focus:border-[#A51C30] transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-3 top-3 bottom-3 bg-gray-900 text-white px-4 rounded-xl hover:bg-black transition-all disabled:opacity-50 font-bold text-sm"
        >
          QUACK
        </button>
      </form>
    </div>
  );
};
