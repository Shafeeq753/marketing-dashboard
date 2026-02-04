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
      className={`relative overflow-hidden glass rounded-2xl p-6 transition-all duration-500 group ${
        isClickable ? 'cursor-pointer hover:bg-white/10 dark:hover:bg-white/5 active:scale-95' : ''
      } ${isClickable ? 'hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]' : ''}`}
    >
      {/* Glossy Refraction Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-xl transition-all duration-300 ${
          isDark ? 'bg-slate-800/80' : 'bg-white/80'
        } ${colorClass} shadow-inner group-hover:scale-110`}>
          {icon}
        </div>
        <div className="flex gap-2 items-center">
          {isClickable && (
            <div className={`text-slate-400 group-hover:text-orange-500 transition-colors animate-pulse`}>
              <ExternalLink className="w-4 h-4" />
            </div>
          )}
          {trend && (
            <div className={`flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full backdrop-blur-md ${
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
      
      <h3 className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-xs font-bold uppercase tracking-widest mb-1`}>
        {title}
      </h3>
      
      <div className="flex items-baseline justify-between gap-2">
        <div className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</div>
      </div>
      
      {subValue && (
        <div className={`mt-2 ${isDark ? 'text-slate-500' : 'text-slate-400'} text-[10px] font-medium uppercase tracking-tight`}>
          {subValue}
        </div>
      )}
    </div>
  );
};