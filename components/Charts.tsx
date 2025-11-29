import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, LineChart, Line
} from 'recharts';
import { MonthlyData } from '../types';

interface ChartProps {
  data: MonthlyData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-xl">
        <p className="text-slate-200 font-semibold mb-2">{label}</p>
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

export const TrafficChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="h-[250px] w-full">
      <h3 className="text-md font-semibold text-orange-400 mb-4">Traffic Trends</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="month" stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="traffic" 
            stroke="#f97316" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorTraffic)" 
            name="Visitors"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const VideosChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="h-[200px] w-full">
      <h3 className="text-md font-semibold text-amber-400 mb-4">Benchmark Videos</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="month" stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{fill: '#334155', opacity: 0.2}} />
          <Bar dataKey="benchmarkVideos" name="Videos" fill="#fbbf24" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const NewslettersChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="h-[200px] w-full">
      <h3 className="text-md font-semibold text-yellow-300 mb-4">Newsletters</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="month" stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} cursor={{fill: '#334155', opacity: 0.2}} />
          <Bar dataKey="newsletters" name="Newsletters" fill="#fde047" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BlogsChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="h-[200px] w-full">
      <h3 className="text-md font-semibold text-orange-300 mb-4">Blogs & Updates</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="month" stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} cursor={{fill: '#334155', opacity: 0.2}} />
          <Bar dataKey="blogs" name="Blogs" fill="#fdba74" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CampaignPerformanceChart: React.FC<ChartProps> = ({ data }) => {
  const formattedData = data.map(d => ({
    month: d.month,
    Email: d.campaigns.email,
    LinkedIn: d.campaigns.linkedin,
    Other: d.campaigns.other
  }));

  return (
    <div className="h-[250px] w-full">
      <h3 className="text-md font-semibold text-orange-200 mb-4">Campaign Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="month" stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{fill: '#334155', opacity: 0.2}} />
          <Legend wrapperStyle={{paddingTop: '10px'}} />
          <Bar dataKey="Email" stackId="a" fill="#c2410c" radius={[0, 0, 0, 0]} />
          <Bar dataKey="LinkedIn" stackId="a" fill="#ea580c" radius={[0, 0, 0, 0]} />
          <Bar dataKey="Other" stackId="a" fill="#fb923c" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};