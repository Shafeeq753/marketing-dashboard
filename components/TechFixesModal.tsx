import React from 'react';
import { X, Wrench, CheckCircle2 } from 'lucide-react';

interface TechFixesModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  fixes: string[];
  period: string;
}

export const TechFixesModal: React.FC<TechFixesModalProps> = ({ isOpen, onClose, fixes, period }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl transform overflow-hidden rounded-[3rem] border border-white/10 bg-[#0f1115]/80 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all animate-in fade-in zoom-in duration-500">

        {/* Header */}
        <div className="flex flex-col items-center pt-12 pb-8 relative border-b border-white/5">
          <div className="p-4 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl shadow-2xl shadow-sky-500/20 mb-6">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Tech / On-site Fixes</h3>
          <p className="text-[11px] font-black text-sky-400 uppercase tracking-[0.3em] mt-2">{fixes.length} RESOLVED · {period}</p>

          <button onClick={onClose} className="absolute top-10 right-10 p-3 rounded-2xl bg-white/5 text-slate-500 hover:text-white transition-colors border border-white/10 hover:bg-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-12 pb-12 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fixes.map((fix, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm font-bold text-slate-200">{fix}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={onClose}
              className="w-full sm:w-1/2 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] bg-sky-600 hover:bg-sky-500 text-white shadow-2xl shadow-sky-600/30 transition-all active:scale-95 hover:translate-y-[-2px]"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
