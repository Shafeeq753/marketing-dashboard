import React from 'react';
import { X } from 'lucide-react';
import chatbotImage from '../WhatsApp Image 2026-03-09 at 2.03.01 PM.jpeg';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose, isDark = true }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl transform overflow-hidden rounded-[3rem] border border-white/10 bg-[#0f1115]/80 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center pt-8 pb-4 relative border-b border-white/5">
           <h3 className="text-2xl font-black text-white uppercase tracking-tighter">AI Chatbot Preview</h3>
           <button onClick={onClose} className="absolute top-6 right-8 p-3 rounded-2xl bg-white/5 text-slate-500 hover:text-white transition-colors border border-white/10 hover:bg-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <img 
            src={chatbotImage} 
            alt="AI Chatbot Preview" 
            className="w-full h-auto rounded-3xl border border-white/10 shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};
