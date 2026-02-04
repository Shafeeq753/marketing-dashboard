
import React from 'react';
import { MonthlyData } from '../types';
import { CheckCircle2, Target, ExternalLink } from 'lucide-react';

interface ActivityFeedProps {
  data: MonthlyData[];
  isDark?: boolean;
  onActivityClick?: (activity: string) => void;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ data, isDark = true, onActivityClick }) => {
  const reversedData = [...data].reverse();

  return (
    <div className="glass-card rounded-[3rem] p-10 shadow-2xl h-full border-white/10">
      <h3 className="text-2xl font-black tracking-tighter text-white mb-12 flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl shadow-xl shadow-orange-900/40">
          <Target className="w-6 h-6 text-white" />
        </div>
        Activities
      </h3>
      
      <div className="relative border-l-2 border-dashed border-white/10 ml-5 space-y-14">
        {reversedData.length > 0 ? reversedData.map((month, idx) => {
          const hasActivities = month.activities.length > 0 && month.activities[0] !== '-';
          
          return (
            <div key={idx} className="relative ml-10 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
              {/* Timeline Bullet */}
              <div className="absolute -left-[3.15rem] top-2 h-5 w-5 rounded-full border-4 border-[#020617] bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,1)]"></div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-xl bg-white/5 text-slate-400 border border-white/5">
                  {month.month}
                </span>
                {hasActivities && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>}
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{month.quarter}</span>
              </div>
              
              {hasActivities ? (
                <div className="space-y-4">
                  {month.activities.map((activity, aIdx) => (
                    <div 
                      key={aIdx} 
                      onClick={() => onActivityClick?.(activity)}
                      className="group flex items-start gap-5 p-5 rounded-[1.5rem] border border-white/5 bg-white/5 transition-all cursor-pointer hover:translate-x-2 hover:bg-white/10 hover:border-white/10 shadow-lg hover:shadow-black/40"
                    >
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-orange-500 group-hover:scale-125 transition-transform" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-bold leading-relaxed text-slate-300 group-hover:text-white transition-colors">
                          {activity}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <ExternalLink className="w-4 h-4 text-orange-500" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                 <div className="p-6 rounded-[1.5rem] border border-dashed border-white/5 bg-white/[0.02]">
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em] italic">Stream Quiet</span>
                 </div>
              )}
            </div>
          );
        }) : (
          <div className="ml-10 text-slate-700 font-black uppercase text-[10px] tracking-[0.3em] italic">Data Offline</div>
        )}
      </div>
    </div>
  );
};
