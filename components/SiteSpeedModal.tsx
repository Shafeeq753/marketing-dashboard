import React from 'react';
import { X, Gauge, ArrowRight } from 'lucide-react';

interface SiteSpeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  period: string;
}

// PageSpeed Insights performance scores, read from the before/after screenshots.
const DEVICES = [
  { label: 'Desktop', before: 79, after: 100, beforeImg: '/images/speed-before-desktop.png', afterImg: '/images/speed-after-desktop.png' },
  { label: 'Mobile', before: 53, after: 92, beforeImg: '/images/speed-before-mobile.png', afterImg: '/images/speed-after-mobile.png' },
];

const scoreColor = (n: number) => (n >= 90 ? 'text-emerald-400' : n >= 50 ? 'text-amber-400' : 'text-rose-400');

export const SiteSpeedModal: React.FC<SiteSpeedModalProps> = ({ isOpen, onClose, period }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl transform overflow-hidden rounded-[3rem] border border-white/10 bg-[#0f1115]/80 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all animate-in fade-in zoom-in duration-500">

        <div className="flex flex-col items-center pt-12 pb-8 relative border-b border-white/5">
          <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl shadow-emerald-500/20 mb-6">
            <Gauge className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Site Speed</h3>
          <p className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.3em] mt-2">PAGESPEED BEFORE vs AFTER · {period}</p>
          <button onClick={onClose} className="absolute top-10 right-10 p-3 rounded-2xl bg-white/5 text-slate-500 hover:text-white transition-colors border border-white/10 hover:bg-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-12 pb-12 space-y-10 max-h-[75vh] overflow-y-auto custom-scrollbar pt-8">
          {DEVICES.map(d => (
            <section key={d.label} className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-5 w-1.5 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                  <h4 className="text-base font-black text-white uppercase tracking-[0.2em]">{d.label}</h4>
                </div>
                <div className="flex items-center gap-3 text-2xl font-black tracking-tighter">
                  <span className={scoreColor(d.before)}>{d.before}</span>
                  <ArrowRight className="w-5 h-5 text-slate-500" />
                  <span className={scoreColor(d.after)}>{d.after}</span>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest ml-2">+{d.after - d.before} pts</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <figure className="space-y-2">
                  <figcaption className="text-[10px] font-black text-rose-400 uppercase tracking-[0.25em]">Before</figcaption>
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-white">
                    <img src={d.beforeImg} alt={`${d.label} PageSpeed before`} className="w-full h-auto" />
                  </div>
                </figure>
                <figure className="space-y-2">
                  <figcaption className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.25em]">After</figcaption>
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-white">
                    <img src={d.afterImg} alt={`${d.label} PageSpeed after`} className="w-full h-auto" />
                  </div>
                </figure>
              </div>
            </section>
          ))}

          <div className="flex justify-center pt-2">
            <button
              onClick={onClose}
              className="w-full sm:w-1/2 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-600/30 transition-all active:scale-95 hover:translate-y-[-2px]"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
