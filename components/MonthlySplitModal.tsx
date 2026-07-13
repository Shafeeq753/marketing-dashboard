import React from 'react';
import { X } from 'lucide-react';

interface MonthlySplitModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  title: string;
  period: string;
  data: { month: string; value: number }[];
  accentHex?: string;
}

export const MonthlySplitModal: React.FC<MonthlySplitModalProps> = ({ isOpen, onClose, title, period, data, accentHex = '#fbbf24' }) => {
  if (!isOpen) return null;
  const total = data.reduce((s, d) => s + d.value, 0);
  const max = data.reduce((m, d) => Math.max(m, d.value), 0) || 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl transform overflow-hidden rounded-[3rem] border border-white/10 bg-[#0f1115]/80 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all animate-in fade-in zoom-in duration-500">

        <div className="flex flex-col items-center pt-12 pb-8 relative border-b border-white/5">
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{title}</h3>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] mt-2" style={{ color: accentHex }}>{total.toLocaleString()} TOTAL · {period}</p>
          <button onClick={onClose} className="absolute top-10 right-10 p-3 rounded-2xl bg-white/5 text-slate-500 hover:text-white transition-colors border border-white/10 hover:bg-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-12 pb-12 space-y-8 pt-8">
          <div className="space-y-5">
            {data.map((d, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-white uppercase tracking-wider">{d.month}</span>
                  <span className="text-sm font-black text-white">{d.value.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(d.value / max) * 100}%`, backgroundColor: accentHex }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center px-8">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">TOTAL</span>
            <span className="text-2xl font-black text-white tracking-tighter">{total.toLocaleString()}</span>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={onClose}
              className="w-full sm:w-1/2 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] text-white shadow-2xl transition-all active:scale-95 hover:translate-y-[-2px]"
              style={{ backgroundColor: accentHex }}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
