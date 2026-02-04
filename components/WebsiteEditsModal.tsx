
import React from 'react';
import { X, CheckCircle, Code, Search, Image as ImageIcon, Zap, FileText, MousePointer2 } from 'lucide-react';

interface WebsiteEditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

const fixes = [
  {
    title: 'Half fade issue',
    description: 'Resolved visibility glitch on the Collection page transition.',
    category: 'UX / UI',
    icon: <MousePointer2 className="w-5 h-5" />,
    status: 'Fixed'
  },
  {
    title: 'Search form issues',
    description: 'Fixed input validation and real-time result filtering logic.',
    category: 'Technical',
    icon: <Search className="w-5 h-5" />,
    status: 'Fixed'
  },
  {
    title: 'ALT- image issues',
    description: 'Automated missing alt-tag generation for better accessibility.',
    category: 'SEO',
    icon: <ImageIcon className="w-5 h-5" />,
    status: 'Optimized'
  },
  {
    title: 'Speed issues',
    description: 'Optimized LCP and reduced unused JavaScript by 24%.',
    category: 'Performance',
    icon: <Zap className="w-5 h-5" />,
    status: 'Optimized'
  },
  {
    title: 'LLM-info page edits',
    description: 'Refined dynamic content injection for LLM data rendering.',
    category: 'Development',
    icon: <FileText className="w-5 h-5" />,
    status: 'Complete'
  },
  {
    title: 'Pagination & Scroll',
    description: 'Fixed infinite scroll jitter and pagination offset errors.',
    category: 'UX / UI',
    icon: <Code className="w-5 h-5" />,
    status: 'Fixed'
  }
];

export const WebsiteEditsModal: React.FC<WebsiteEditsModalProps> = ({ isOpen, onClose, isDark }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      ></div>
      
      <div className={`relative w-full max-w-2xl transform overflow-hidden rounded-[2.5rem] border animate-in fade-in zoom-in duration-300 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] ${
        isDark ? 'bg-[#0f1115] border-white/5' : 'bg-white border-slate-200'
      }`}>
        
        {/* Header */}
        <div className={`px-10 py-10 flex flex-col items-center relative border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
          <div className="p-4 bg-orange-600 rounded-2xl shadow-xl shadow-orange-900/40 mb-4">
            <Code className="w-7 h-7 text-white" />
          </div>
          <h2 className={`text-3xl font-black tracking-tighter uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Website Performance Edits
          </h2>
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.3em] mt-1">
            Technical Maintenance Report
          </p>
          
          <button 
            onClick={onClose} 
            className={`absolute top-8 right-8 p-2 rounded-xl border transition-all ${
              isDark ? 'bg-white/5 border-white/5 text-slate-500 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 max-h-[60vh] overflow-y-auto custom-scrollbar space-y-8">
          
          {/* Summary Stat */}
          <div className={`p-6 rounded-[1.5rem] border-2 border-dashed flex items-center justify-between ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="space-y-1">
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Cumulative Optimization</span>
              <div className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Technical improvements deployed</div>
            </div>
            <div className="text-6xl font-black text-orange-600 tracking-tighter">06</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fixes.map((fix, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border flex items-start gap-4 transition-all hover:translate-y-[-2px] ${
                isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-100 hover:bg-white'
              }`}>
                <div className={`p-2 rounded-xl flex-shrink-0 ${
                  isDark ? 'bg-white/5 text-orange-500' : 'bg-white text-orange-600 shadow-sm'
                }`}>
                  {fix.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{fix.title}</span>
                    <span className="w-1 h-1 rounded-full bg-orange-500/30"></span>
                    <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">{fix.status}</span>
                  </div>
                  <p className={`text-[10px] font-medium leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    {fix.description}
                  </p>
                  <div className={`text-[8px] font-black uppercase tracking-widest pt-1 ${isDark ? 'text-orange-500/60' : 'text-orange-400'}`}>
                    {fix.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`px-10 py-8 flex justify-end ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <button 
            onClick={onClose}
            className="px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] bg-orange-600 hover:bg-orange-500 text-white shadow-xl transition-all active:scale-95"
          >
            Review Complete
          </button>
        </div>
      </div>
    </div>
  );
};
