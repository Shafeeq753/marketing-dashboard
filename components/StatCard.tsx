import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number | React.ReactNode;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: React.ReactNode;
  colorClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subValue, 
  trend, 
  trendValue, 
  icon,
  colorClass = "text-orange-500"
}) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-slate-700/50 shadow-lg hover:border-orange-500/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg bg-slate-800 ${colorClass} bg-opacity-20`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
            trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 
            trend === 'down' ? 'text-rose-400 bg-rose-400/10' : 'text-slate-400 bg-slate-400/10'
          }`}>
            {trend === 'up' && <ArrowUpRight className="w-3 h-3 mr-1" />}
            {trend === 'down' && <ArrowDownRight className="w-3 h-3 mr-1" />}
            {trend === 'neutral' && <Minus className="w-3 h-3 mr-1" />}
            {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-bold text-white w-full">{value}</div>
        {subValue && <span className="text-xs text-slate-500 whitespace-nowrap">{subValue}</span>}
      </div>
    </div>
  );
};