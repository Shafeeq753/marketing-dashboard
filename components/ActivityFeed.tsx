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
    <div className={`glass rounded-[2rem] p-8 shadow-2xl h-full border-white/5`}>
      <h3 className={`text-xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'} mb-10 flex items-center gap-3`}>
        <div className="p-2 bg-orange-600 rounded-xl shadow-lg shadow-orange-900/40">
          <Target className="w-5 h-5 text-white" />
        </div>
        Additional Activities
      </h3>
      
      <div className={`relative border-l-2 border-dashed ${isDark ? 'border-white/10' : 'border-slate-200'} ml-4 space-y-12`}>
        {reversedData.length > 0 ? reversedData.map((month, idx) => {
          const hasActivities = month.activities.length > 0 && month.activities[0] !== '-';
          
          return (
            <div key={idx} className="relative ml-8">
              {/* Timeline Bullet */}
              <div className={`absolute -left-[2.35rem] top-1.5 h-4 w-4 rounded-full border-4 ${
                isDark ? 'border-slate-900 bg-orange-500' : 'border-white bg-orange-500'
              } shadow-[0_0_15px_rgba(249,115,22,0.8)]`}></div>
              
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg ${
                  isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-600'
                }`}>
                  {month.month}
                </span>
                {hasActivities && <span className="w-1 h-1 rounded-full bg-orange-500"></span>}
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{month.quarter}</span>
              </div>
              
              {hasActivities ? (
                <div className="space-y-3">
                  {month.activities.map((activity, aIdx) => (
                    <div 
                      key={aIdx} 
                      onClick={() => onActivityClick?.(activity)}
                      className={`group flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer hover:translate-x-1 ${
                        isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-100 hover:bg-white'
                      }`}
                    >
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 group-hover:scale-125 transition-transform" />
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm font-semibold leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {activity}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-3 h-3 text-orange-500" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                 <div className={`p-5 rounded-2xl border border-dashed ${
                   isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50/50 border-slate-100'
                 }`}>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest italic">No events recorded</span>
                 </div>
              )}
            </div>
          );
        }) : (
          <div className="ml-8 text-slate-500 font-bold uppercase text-[10px] tracking-widest italic">Data Stream Offline</div>
        )}
      </div>
    </div>
  );
};
