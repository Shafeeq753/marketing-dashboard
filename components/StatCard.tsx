
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, ExternalLink } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number | React.ReactNode;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: React.ReactNode;
  colorClass?: string;
  isDark?: boolean;
  onClick?: () => void;
  isClickable?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subValue, 
  trend, 
  trendValue, 
  icon,
  colorClass = "text-orange-500",
  isDark = true,
  onClick,
  isClickable = false
}) => {
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden glass-card rounded-3xl p-6 transition-all duration-500 group shimmer ${
        isClickable ? 'cursor-pointer hover:bg-white/10 active:scale-95' : ''
      } ${isClickable ? 'hover:-translate-y-1 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]' : ''}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl transition-all duration-300 bg-white/5 ${colorClass} shadow-xl group-hover:scale-110 group-hover:bg-white/10`}>
          {icon}
        </div>
        <div className="flex gap-2 items-center">
          {isClickable && (
            <div className={`text-slate-500 group-hover:text-orange-500 transition-colors`}>
              <ExternalLink className="w-4 h-4" />
            </div>
          )}
          {trend && (
            <div className={`flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md ${
              trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 
              trend === 'down' ? 'text-rose-400 bg-rose-400/10' : 'text-slate-400 bg-slate-400/10'
            }`}>
              {trend === 'up' && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
              {trend === 'down' && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {trend === 'neutral' && <Minus className="w-3 h-3 mr-0.5" />}
              {trendValue}
            </div>
          )}
        </div>
      </div>
      
      <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
        {title}
      </h3>
      
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-3xl font-black tracking-tighter text-white">{value}</div>
      </div>
      
      {subValue && (
        <div className="mt-3 text-slate-500 text-[10px] font-bold uppercase tracking-tight flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-slate-700"></span>
          {subValue}
        </div>
      )}
    </div>
  );
};
