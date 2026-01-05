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
      <div className={`${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'} border p-3 rounded-lg shadow-xl`}>
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const TrafficChart: React.FC<ChartProps> = ({ data, isDark = true }) => {
  const axisColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#334155' : '#e2e8f0';

  return (
    <div className="h-[250px] w-full">
      <h3 className="text-md font-semibold text-orange-500 mb-4">Traffic Trends</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip isDark={isDark} />} />
          <Area 
            type="monotone" 
            dataKey="traffic" 
            stroke="#f97316" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorTraffic)" 
            name="Visitors"
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const VideosChart: React.FC<ChartProps> = ({ data, isDark = true }) => {
  const axisColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#334155' : '#e2e8f0';

  return (
    <div className="h-[200px] w-full">
      <h3 className="text-md font-semibold text-amber-500 mb-4">Benchmark Videos</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{fill: isDark ? '#334155' : '#f1f5f9', opacity: 0.5}} />
          <Bar dataKey="benchmarkVideos" name="Videos" fill="#fbbf24" radius={[4, 4, 0, 0]} barSize={data.length === 1 ? 60 : undefined} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const NewslettersChart: React.FC<ChartProps> = ({ data, isDark = true }) => {
  const axisColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#334155' : '#e2e8f0';

  return (
    <div className="h-[200px] w-full">
      <h3 className="text-md font-semibold text-orange-400 mb-4">Newsletters</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{fill: isDark ? '#334155' : '#f1f5f9', opacity: 0.5}} />
          <Bar dataKey="newsletters" name="Newsletters" fill="#fde047" radius={[4, 4, 0, 0]} barSize={data.length === 1 ? 60 : undefined} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BlogsChart: React.FC<ChartProps> = ({ data, isDark = true }) => {
  const axisColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#334155' : '#e2e8f0';

  return (
    <div className="h-[200px] w-full">
      <h3 className="text-md font-semibold text-orange-400 mb-4">Blogs & Updates</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{fill: isDark ? '#334155' : '#f1f5f9', opacity: 0.5}} />
          <Bar dataKey="blogs" name="Blogs" fill="#fdba74" radius={[4, 4, 0, 0]} barSize={data.length === 1 ? 60 : undefined} />
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

  const axisColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#334155' : '#e2e8f0';

  return (
    <div className="h-[250px] w-full">
      <h3 className="text-md font-semibold text-orange-500 mb-4">Campaign Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{fill: isDark ? '#334155' : '#f1f5f9', opacity: 0.5}} />
          <Legend wrapperStyle={{paddingTop: '10px'}} />
          <Bar dataKey="Email" stackId="a" fill="#c2410c" radius={[0, 0, 0, 0]} barSize={data.length === 1 ? 60 : undefined} />
          <Bar dataKey="LinkedIn" stackId="a" fill="#ea580c" radius={[0, 0, 0, 0]} barSize={data.length === 1 ? 60 : undefined} />
          <Bar dataKey="Other" stackId="a" fill="#fb923c" radius={[4, 4, 0, 0]} barSize={data.length === 1 ? 60 : undefined} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};