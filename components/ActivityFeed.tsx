import React from 'react';
import { MonthlyData } from '../types';
import { CheckCircle2, Calendar } from 'lucide-react';

interface ActivityFeedProps {
  data: MonthlyData[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ data }) => {
  // Create a reversed copy of the data to show latest first (Nov -> July)
  const reversedData = [...data].reverse();

  return (
    <div className="bg-card rounded-xl p-6 border border-slate-700/50 h-full">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-orange-500" />
        Additional Activities
      </h3>
      
      <div className="relative border-l border-slate-700 ml-3 space-y-8">
        {reversedData.map((month, idx) => {
          const hasActivities = month.activities.length > 0 && month.activities[0] !== '-';
          
          return (
            <div key={idx} className="mb-8 ml-6">
              <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-slate-900 bg-orange-500"></span>
              <h4 className="text-md font-bold text-slate-200 mb-3">{month.month}</h4>
              
              {hasActivities ? (
                <ul className="space-y-3">
                  {month.activities.map((activity, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{activity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                 <div className="bg-slate-800/20 p-3 rounded-lg border border-slate-700/30">
                    <span className="text-sm text-slate-500 italic pl-1">Nil</span>
                 </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};