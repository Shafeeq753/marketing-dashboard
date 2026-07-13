import React from 'react';
import { X, Link2, Users, Handshake } from 'lucide-react';

interface BacklinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  directories: number;
  guestOutreach: number;
  collaborations: number;
  period: string;
}

export const BacklinksModal: React.FC<BacklinksModalProps> = ({ isOpen, onClose, directories, guestOutreach, collaborations, period }) => {
  if (!isOpen) return null;
  const total = directories + guestOutreach + collaborations;

  const tiles = [
    { label: 'Directories', value: directories, icon: <Link2 className="w-4 h-4 text-violet-400" /> },
    { label: 'Guest Outreach', value: guestOutreach, icon: <Users className="w-4 h-4 text-violet-400" /> },
    { label: 'Collaborations', value: collaborations, icon: <Handshake className="w-4 h-4 text-violet-400" /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      <div className="relative w-full max-w-3xl transform overflow-hidden rounded-[3rem] border border-white/10 bg-[#0f1115]/80 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all animate-in fade-in zoom-in duration-500">

        {/* Header */}
        <div className="flex flex-col items-center pt-12 pb-8 relative border-b border-white/5">
          <div className="p-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl shadow-2xl shadow-violet-500/20 mb-6">
            <Link2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Backlinks</h3>
          <p className="text-[11px] font-black text-violet-400 uppercase tracking-[0.3em] mt-2">{total} LINK ACTIONS · {period}</p>

          <button onClick={onClose} className="absolute top-10 right-10 p-3 rounded-2xl bg-white/5 text-slate-500 hover:text-white transition-colors border border-white/10 hover:bg-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-12 pb-12 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar pt-8">
          {/* Breakdown tiles */}
          <div className="grid grid-cols-3 gap-4">
            {tiles.map((t, i) => (
              <div key={i} className="p-5 rounded-3xl bg-white/5 border border-white/10">
                <div className="mb-3">{t.icon}</div>
                <div className="text-3xl font-black text-white tracking-tighter">{t.value}</div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{t.label}</span>
              </div>
            ))}
          </div>

          {/* Trend chart image */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-5 w-1.5 bg-violet-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.8)]"></div>
              <h4 className="text-base font-black text-white uppercase tracking-[0.2em]">BACKLINK TREND</h4>
            </div>
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white">
              <img src="/backlinks-trend.png" alt="Backlinks trend over time" className="w-full h-auto" />
            </div>
          </section>

          <div className="flex justify-center pt-2">
            <button
              onClick={onClose}
              className="w-full sm:w-1/2 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] bg-violet-600 hover:bg-violet-500 text-white shadow-2xl shadow-violet-600/30 transition-all active:scale-95 hover:translate-y-[-2px]"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
