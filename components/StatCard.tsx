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
  isDark?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subValue, 
  trend, 
  trendValue, 
  icon,
  colorClass = "text-orange-500",
  isDark = true
}) => {
  return (
    <div className={`${
      isDark 
        ? 'bg-card border-slate-700/50 hover:border-orange-500/50' 
        : 'bg-white border-slate-200 hover:border-orange-500/30'
      } rounded-xl p-6 border shadow-sm transition-all duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-50'} ${colorClass} bg-opacity-20`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
            trend === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 
            trend === 'down' ? 'text-rose-500 bg-rose-500/10' : 'text-slate-500 bg-slate-500/10'
          }`}>
            {trend === 'up' && <ArrowUpRight className="w-3 h-3 mr-1" />}
            {trend === 'down' && <ArrowDownRight className="w-3 h-3 mr-1" />}
            {trend === 'neutral' && <Minus className="w-3 h-3 mr-1" />}
            {trendValue}
          </div>
        )}
      </div>
      <h3 className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-sm font-medium mb-1`}>{title}</h3>
      <div className="flex items-baseline gap-2">
        <div className={`text-2xl font-bold w-full ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</div>
        {subValue && <span className={`${isDark ? 'text-slate-500' : 'text-slate-400'} text-xs whitespace-nowrap`}>{subValue}</span>}
      </div>
    </div>
  );
};