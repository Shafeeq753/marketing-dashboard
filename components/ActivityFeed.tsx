import React from 'react';
import { MonthlyData } from '../types';
import { CheckCircle2, Calendar } from 'lucide-react';

interface ActivityFeedProps {
  data: MonthlyData[];
  isDark?: boolean;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ data, isDark = true }) => {
  // Create a reversed copy of the data to show latest first within the selected period
  const reversedData = [...data].reverse();

  return (
    <div className={`${isDark ? 'bg-card border-slate-700/50' : 'bg-white border-slate-200'} rounded-xl p-6 border shadow-sm h-full`}>
      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'} mb-6 flex items-center gap-2`}>
        <Calendar className="w-5 h-5 text-orange-500" />
        Additional Activities
      </h3>
      
      <div className={`relative border-l ${isDark ? 'border-slate-700' : 'border-slate-200'} ml-3 space-y-8`}>
        {reversedData.length > 0 ? reversedData.map((month, idx) => {
          const hasActivities = month.activities.length > 0 && month.activities[0] !== '-';
          
          return (
            <div key={idx} className="mb-8 ml-6">
              <span className={`absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border ${isDark ? 'border-slate-900' : 'border-white'} bg-orange-500`}></span>
              <h4 className={`text-md font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'} mb-3`}>{month.month}</h4>
              
              {hasActivities ? (
                <ul className="space-y-3">
                  {month.activities.map((activity, aIdx) => (
                    <li key={aIdx} className={`flex items-start gap-3 ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-100'} p-3 rounded-lg border`}>
                      <CheckCircle2 className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{activity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                 <div className={`${isDark ? 'bg-slate-800/20 border-slate-700/30' : 'bg-slate-50/50 border-slate-100/50'} p-3 rounded-lg border`}>
                    <span className="text-sm text-slate-500 italic pl-1">Nil</span>
                 </div>
              )}
            </div>
          );
        }) : (
          <div className="ml-6 text-slate-500 italic">No activities found for this period.</div>
        )}
      </div>
    </div>
  );
};