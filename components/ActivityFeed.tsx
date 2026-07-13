
import React from 'react';
import { MonthlyData } from '../types';
import { CheckCircle2, Target, ExternalLink, Wrench } from 'lucide-react';

interface ActivityFeedProps {
  data: MonthlyData[];
  isDark?: boolean;
  onActivityClick?: (activity: string) => void;
  hideActionGroups?: boolean; // Hide clickable action-box groups (e.g. Tech & On-site Issues) — used in the quarter view
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ data, isDark = true, onActivityClick, hideActionGroups = false }) => {
  const reversedData = [...data].reverse();

  const renderActivity = (activity: string, key: React.Key) => (
    <div
      key={key}
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
  );

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
          const groups = (month.activityGroups || []).filter(g => !(hideActionGroups && g.action));
          const flatActivities = month.activities || [];
          const hasGroups = groups.length > 0;
          const hasActivities = hasGroups || (flatActivities.length > 0 && flatActivities[0] !== '-');

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
                hasGroups ? (
                  <div className="space-y-8">
                    {groups.map((group, gIdx) => (
                      group.action ? (
                        <div
                          key={gIdx}
                          onClick={() => onActivityClick?.(group.action!)}
                          className="group flex items-center gap-5 p-5 rounded-[1.5rem] border border-sky-500/20 bg-sky-500/5 transition-all cursor-pointer hover:translate-x-2 hover:bg-sky-500/10 shadow-lg hover:shadow-black/40"
                        >
                          <div className="flex-shrink-0 p-2 rounded-xl bg-sky-500/10">
                            <Wrench className="w-5 h-5 text-sky-400" />
                          </div>
                          <div className="flex-1">
                            <span className="block text-sm font-black text-white">{group.title}</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">View all fixes</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-sky-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ) : (
                        <div key={gIdx} className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="h-4 w-1 bg-orange-500/70 rounded-full"></div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">{group.title}</span>
                            <span className="text-[10px] font-black text-slate-600">{(group.items || []).length}</span>
                          </div>
                          <div className="space-y-3">
                            {(group.items || []).map((activity, aIdx) => renderActivity(activity, `${gIdx}-${aIdx}`))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {flatActivities.map((activity, aIdx) => renderActivity(activity, aIdx))}
                  </div>
                )
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
