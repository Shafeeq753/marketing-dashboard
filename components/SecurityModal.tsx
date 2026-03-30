
import React from 'react';
import { X, Shield } from 'lucide-react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      <div className="relative w-full max-w-3xl transform overflow-hidden rounded-[3rem] border border-white/10 bg-[#0f1115]/80 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all animate-in fade-in zoom-in duration-500">

        {/* Header */}
        <div className="flex flex-col items-center pt-12 pb-8 relative border-b border-white/5">
          <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl shadow-2xl shadow-emerald-500/20 mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Security Headers</h3>
          <p className="text-[11px] font-black text-orange-500 uppercase tracking-[0.3em] mt-2">SCAN REPORT: mypromovideos.com</p>
          <button onClick={onClose} className="absolute top-10 right-10 p-3 rounded-2xl bg-white/5 text-slate-500 hover:text-white transition-colors border border-white/10 hover:bg-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-8 pb-12 max-h-[70vh] overflow-y-auto custom-scrollbar pt-8 space-y-8">
          {/* Screenshot */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img src="/images/security-headers.png.jpeg" alt="Security Headers Report - A+ Grade" className="w-full h-auto" />
          </div>

          {/* Footer */}
          <div className="flex justify-center pt-4">
            <button
              onClick={onClose}
              className="w-full sm:w-1/2 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] bg-[#f26522] hover:bg-[#ff7a3d] text-white shadow-2xl shadow-orange-600/30 transition-all active:scale-95 hover:translate-y-[-2px]"
            >
              EXIT REPORT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
