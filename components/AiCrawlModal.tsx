import React from 'react';
import { X, Bot, ShieldCheck, AlertTriangle, Activity } from 'lucide-react';
import { AiCrawler } from '../types';

interface AiCrawlModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  total: number;
  allowed: number;
  unsuccessful: number;
  crawlers: AiCrawler[];
  period: string;
}

export const AiCrawlModal: React.FC<AiCrawlModalProps> = ({ isOpen, onClose, total, allowed, unsuccessful, crawlers, period }) => {
  if (!isOpen) return null;
  const rate = total > 0 ? Math.round((allowed / total) * 100) : 0;
  const maxReq = crawlers.reduce((m, c) => Math.max(m, c.requests), 0) || 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      <div className="relative w-full max-w-3xl transform overflow-hidden rounded-[3rem] border border-white/10 bg-[#0f1115]/80 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all animate-in fade-in zoom-in duration-500">

        {/* Header */}
        <div className="flex flex-col items-center pt-12 pb-8 relative border-b border-white/5">
          <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-2xl shadow-cyan-500/20 mb-6">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">AI Crawlability</h3>
          <p className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.3em] mt-2">{rate}% ALLOWED · {period}</p>

          <button onClick={onClose} className="absolute top-10 right-10 p-3 rounded-2xl bg-white/5 text-slate-500 hover:text-white transition-colors border border-white/10 hover:bg-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-12 pb-12 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar pt-8">
          {/* Summary tiles */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-slate-500 mb-2"><Activity className="w-4 h-4" /><span className="text-[9px] font-black uppercase tracking-widest">Total</span></div>
              <div className="text-3xl font-black text-white tracking-tighter">{total.toLocaleString()}</div>
            </div>
            <div className="p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 mb-2"><ShieldCheck className="w-4 h-4" /><span className="text-[9px] font-black uppercase tracking-widest">Allowed</span></div>
              <div className="text-3xl font-black text-white tracking-tighter">{allowed.toLocaleString()}</div>
            </div>
            <div className="p-5 rounded-3xl bg-rose-500/5 border border-rose-500/20">
              <div className="flex items-center gap-2 text-rose-400 mb-2"><AlertTriangle className="w-4 h-4" /><span className="text-[9px] font-black uppercase tracking-widest">Unsuccessful</span></div>
              <div className="text-3xl font-black text-white tracking-tighter">{unsuccessful.toLocaleString()}</div>
            </div>
          </div>

          {/* Crawler breakdown */}
          {crawlers.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-5 w-1.5 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
                <h4 className="text-base font-black text-white uppercase tracking-[0.2em]">BY CRAWLER</h4>
              </div>
              <div className="space-y-3">
                {crawlers.map((c, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-white">{c.name}</span>
                        {c.bot && <span className="text-[9px] font-bold text-slate-500 px-2 py-0.5 rounded-md bg-white/5">{c.bot}</span>}
                      </div>
                      <span className="text-sm font-black text-white">{c.requests.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-cyan-400 transition-all duration-700" style={{ width: `${(c.requests / maxReq) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="flex justify-center pt-2">
            <button
              onClick={onClose}
              className="w-full sm:w-1/2 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] bg-cyan-600 hover:bg-cyan-500 text-white shadow-2xl shadow-cyan-600/30 transition-all active:scale-95 hover:translate-y-[-2px]"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
