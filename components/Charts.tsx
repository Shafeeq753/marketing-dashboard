import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { MonthlyData } from '../types';

interface ChartProps {
  data: MonthlyData[];
  isDark?: boolean;
}

const CustomTooltip = ({ active, payload, label, isDark }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={`glass p-4 rounded-2xl shadow-2xl border-white/10 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        <p className="font-black text-[10px] uppercase tracking-widest mb-3 opacity-60">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-xs font-bold opacity-80">{entry.name}</span>
              </div>
              <span className="text-sm font-black tracking-tight">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const TrafficChart: React.FC<ChartProps> = ({ data, isDark = true }) => {
  const axisColor = isDark ? 'rgba(255,255,255,0.3)' : '#64748b';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0';

  return (
    <div className="h-[300px] w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xs font-black text-orange-500 uppercase tracking-[0.2em]">Traffic Volume</h3>
          <p className={`text-lg font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Audience Engagement Trend</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" stroke={axisColor} fontSize={10} fontWeight={700} tickLine={false} axisLine={false} />
          <YAxis stroke={axisColor} fontSize={10} fontWeight={700} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip isDark={isDark} />} />
          <Area 
            type="monotone" 
            dataKey="traffic" 
            stroke="#f97316" 
            strokeWidth={4}
            fillOpacity={1} 
            fill="url(#colorTraffic)" 
            name="Active Visitors"
            activeDot={{ r: 8, strokeWidth: 0, fill: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const VideosChart: React.FC<ChartProps> = ({ data, isDark = true }) => {
  const axisColor = isDark ? 'rgba(255,255,255,0.3)' : '#64748b';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0';

  return (
    <div className="h-[220px] w-full">
      <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-4">Benchmark Videos</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" stroke={axisColor} fontSize={10} fontWeight={700} tickLine={false} axisLine={false} />
          <YAxis stroke={axisColor} fontSize={10} fontWeight={700} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{fill: 'rgba(255,255,255,0.05)', radius: 10}} />
          <Bar dataKey="benchmarkVideos" name="Videos" fill="#fbbf24" radius={[10, 10, 0, 0]} barSize={data.length === 1 ? 40 : 25} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const NewslettersChart: React.FC<ChartProps> = ({ data, isDark = true }) => {
  const axisColor = isDark ? 'rgba(255,255,255,0.3)' : '#64748b';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0';

  return (
    <div className="h-[220px] w-full">
      <h3 className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-4">Newsletters</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" stroke={axisColor} fontSize={10} fontWeight={700} tickLine={false} axisLine={false} />
          <YAxis stroke={axisColor} fontSize={10} fontWeight={700} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{fill: 'rgba(255,255,255,0.05)', radius: 10}} />
          <Bar dataKey="newsletters" name="Newsletters" fill="#fde047" radius={[10, 10, 0, 0]} barSize={data.length === 1 ? 40 : 25} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BlogsChart: React.FC<ChartProps> = ({ data, isDark = true }) => {
  const chartData = data.map(d => ({
    ...d,
    totalPublishedPages: d.blogs + (d.caseStudies || 0) + (d.servicePages || 0) + (d.locationPages || 0) + (d.faqPages || 0) + (d.glossary || 0) + (d.pricingPages || 0) + (d.vsPages || 0) + (d.decliningPages || 0) + (d.commercialKeywordPages || 0)
  }));

  const axisColor = isDark ? 'rgba(255,255,255,0.3)' : '#64748b';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0';

  return (
    <div className="h-[220px] w-full">
      <h3 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em] mb-4">Site Expansion</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" stroke={axisColor} fontSize={10} fontWeight={700} tickLine={false} axisLine={false} />
          <YAxis stroke={axisColor} fontSize={10} fontWeight={700} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{fill: 'rgba(255,255,255,0.05)', radius: 10}} />
          <Bar dataKey="totalPublishedPages" name="New Pages" fill="#fdba74" radius={[10, 10, 0, 0]} barSize={data.length === 1 ? 40 : 25} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CampaignPerformanceChart: React.FC<ChartProps> = ({ data, isDark = true }) => {
  const formattedData = data.map(d => ({
    month: d.month,
    Email: d.campaigns.email,
    LinkedIn: d.campaigns.linkedin,
    Other: d.campaigns.other
  }));

  const axisColor = isDark ? 'rgba(255,255,255,0.3)' : '#64748b';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0';

  return (
    <div className="h-[250px] w-full">
      <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-4">Campaign Funnel</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" stroke={axisColor} fontSize={10} fontWeight={700} tickLine={false} axisLine={false} />
          <YAxis stroke={axisColor} fontSize={10} fontWeight={700} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{fill: 'rgba(255,255,255,0.05)', radius: 10}} />
          <Legend wrapperStyle={{paddingTop: '20px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase'}} />
          <Bar dataKey="Email" stackId="a" fill="#c2410c" barSize={data.length === 1 ? 40 : 25} />
          <Bar dataKey="LinkedIn" stackId="a" fill="#ea580c" barSize={data.length === 1 ? 40 : 25} />
          <Bar dataKey="Other" stackId="a" fill="#fb923c" radius={[10, 10, 0, 0]} barSize={data.length === 1 ? 40 : 25} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};